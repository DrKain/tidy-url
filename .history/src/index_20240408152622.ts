import { decodeURL, getLinkDiff, isJSON, urlHasParams, validateURL } from './utils';
import { IRule, IData, EEncoding } from './interfaces';
import { handlers } from './handlers';
import { TidyConfig } from './config/TidyConfig';
import { RedirectHandler }  from './handlers/index';
import { AmpHandler } from './handlers/AmpHandler';

const $github = 'https://github.com/DrKain/tidy-url';

export class TidyCleaner {
    public rules: IRule[] = [];

    /** @deprecated Please use `config.silent` */
    public silent!: boolean;
    /** @deprecated Please use `config.allowAMP` */
    public allow_amp!: boolean;
    /** @deprecated Please use `config.allowRedirects` */
    public allow_redirects!: boolean;
    /** @deprecated Please use `config.allowCustomHandlers` */
    public allow_custom_handlers!: boolean;
    private redirectHandler: RedirectHandler = new RedirectHandler(new TidyConfig());
    private ampHandler: AmpHandler = new AmpHandler([], this.reapplyClean.bind(this));



    /**
     * Stores config options for this cleaner. If you would like to
     * use multiple configs simply create a new instance
     */
    public config: TidyConfig = new TidyConfig();

    /**
     * Contains all logged information from the last clean, even if `config.silent` was `true`.
     * This will be reset when a new URL is cleaned. This is for debugging and not to be relied upon
     */
    public loglines: { type: string; message: string }[] = [];

    /**
     * The full list of all rules with default value
     * that are not used in the main rules file to save space.
     */
    get expandedRules() {
        return this.rules.map((rule) => {
            return Object.assign(
                {
                    rules: [],
                    replace: [],
                    exclude: [],
                    redirect: '',
                    amp: null,
                    decode: null
                },
                rule
            ) as IRule;
        });
    }
    constructor() {
        try {
            this.syncDeprecatedToConfig();
            // Load the rules
            this.rules = require('../data/rules.js');
            this.redirectHandler = new RedirectHandler(this.config);
        } catch (error) {
            // If this fails nothing can be cleaned
            this.log(`${error}`, 'error');
            this.rules = [];
        }
    }

    /**
     * Only log to the console if debug is enabled
     * @param str Message
     */
    private log(str: string, type: 'all' | 'error' | 'info' | 'warn') {
        this.loglines.push({ type, message: str });
        if (!this.config.silent) console.log(`[${type}] ${str}`);
    }

    /**
     * Rebuild to ensure trailing slashes or encoded characters match.
     * @param url Any URL
     */
    public rebuild(url: string): string {
        const original = new URL(url);
        return original.protocol + '//' + original.host + original.pathname + original.search + original.hash;
    }

    /**
     * This lets users know when they are using the deprecated variables that will
     * be removed in a few updates.
     */
    private syncDeprecatedToConfig() {
        const c = this.config;

        if (this.allow_amp !== undefined) {
            this.config.allowAMP = this.allow_amp;
            this.log('DEPRECATED: Please use `config.allowAMP` instead of `allow_amp`', 'warn');
        }
        if (this.allow_redirects !== undefined) {
            this.config.allowRedirects = this.allow_redirects;
            this.log('DEPRECATED: Please use `config.allowRedirects` instead of `allow_redirects`', 'warn');
        }
        if (this.allow_custom_handlers !== undefined) {
            this.config.allowCustomHandlers = this.allow_custom_handlers;
            this.log('DEPRECATED: Please use `config.allowCustomHandlers` instead of `allow_custom_handlers`', 'warn');
        }
        if (this.silent !== undefined) {
            this.config.silent = this.silent;
            this.log('DEPRECATED: Please use `config.silent` instead of `silent`', 'warn');
        }
    }

    /** @deprecated Import `validateURL` instead */
    public validate(url: string): boolean {
        return validateURL(url);
    }

    private createInitialDataObject(url: string): IData {
        return {
            url: url,
            info: {
                original: url,
                reduction: 0,
                difference: 0,
                replace: [],
                removed: [],
                handler: null,
                match: [],
                decoded: null,
                is_new_host: false,
                isNewHost: false,
                full_clean: false,
                fullClean: false
            }
        };
    }
    
    /**
     * Clean a URL
     * @param _url Any URL
     * @returns IData
     */
    public clean(_url: string, allowReclean = true): IData {
        if (!allowReclean) this.loglines = [];

        this.syncDeprecatedToConfig();

        // Default values
        let data: IData = this.createInitialDataObject(_url);

        // Make sure the URL is valid before we try to clean it
        if (!validateURL(_url)) {
            if (_url !== 'undefined' && _url.length > 0) {
                this.log('Invalid URL: ' + _url, 'error');
            }
            return data;
        }

        // If there's no params, we can skip the rest of the process
        if (this.config.allowAMP && urlHasParams(_url) === false) {
            data.url = data.info.original;
            return data;
        }

        // Rebuild to ensure trailing slashes or encoded characters match
        let url = this.rebuild(_url);
        data.url = url;

        // List of parmeters that will be deleted if found
        let to_remove: string[] = [];

        const original = new URL(url);
        const cleaner = original.searchParams;
        const cleaner_ci = new URLSearchParams();

        let pathname = original.pathname;

        // Case insensitive cleaner for the redirect rule
        cleaner.forEach((v, k) => cleaner_ci.append(k.toLowerCase(), v));

        // Loop through the rules and match them to the host name
        for (const rule of this.expandedRules) {
            // Match the host or the full URL
            let match_s = original.host;
            if (rule.match_href === true) match_s = original.href;
            // Reset lastIndex
            rule.match.lastIndex = 0;
            if (rule.match.exec(match_s) !== null) {
                // Loop through the rules and add to to_remove
                to_remove = [...to_remove, ...(rule.rules || [])];
                data.info.replace = [...data.info.replace, ...(rule.replace || [])];
                data.info.match.push(rule);
            }
        }

        // Stop cleaning if any exclude rule matches
        let ex_pass = true;
        for (const rule of data.info.match) {
            for (const reg of rule.exclude) {
                reg.lastIndex = 0;
                if (reg.exec(url) !== null) ex_pass = false;
            }
        }

        if (!ex_pass) {
            data.url = data.info.original;
            return data;
        }

        // Check if the match has any amp rules, if not we can redirect
        const hasAmpRule = data.info.match.find((item) => item.amp);
        if (this.config.allowAMP === true && hasAmpRule === undefined) {
            // Make sure there are no parameters before resetting
            if (!urlHasParams(url)) {
                data.url = data.info.original;
                return data;
            }
        }

        // Delete any matching parameters
        for (const key of to_remove) {
            if (cleaner.has(key)) {
                data.info.removed.push({ key, value: cleaner.get(key) as string });
                cleaner.delete(key);
            }
        }

        // Update the pathname if needed
        for (const key of data.info.replace) {
            const changed = pathname.replace(key, '');
            if (changed !== pathname) pathname = changed;
        }

        // Rebuild URL
        data.url = original.protocol + '//' + original.host + pathname + original.search + original.hash;

        // Redirect if the redirect parameter exists
        data = this.redirectHandler.handle(data);

        if (this.config.allowAMP === false) {
            this.ampHandler = new AmpHandler(this.rules, this.reapplyClean.bind(this));
            data = this.ampHandler.handle(data);
        }


        // Decode handler
        for (const rule of data.info.match) {
            try {
                if (!rule.decode) continue;
                // Make sure the target parameter exists
                if (!cleaner.has(rule.decode.param) && rule.decode.targetPath !== true) continue;
                // These will almost always be clickjacking links, so use the allowRedirects rule if enabled
                if (!this.config.allowRedirects) continue;
                // Decode the string using selected encoding
                const encoding = rule.decode.encoding || 'base64';
                // Sometimes the website path is what we need to decode
                let lastPath = pathname.split('/').pop();
                // This will be null if the param doesn't exist
                const param = cleaner.get(rule.decode.param);
                // Use a default string
                let encodedString: string = '';

                if (lastPath === undefined) lastPath = '';

                // Decide what we are decoding
                if (param === null) encodedString = lastPath;
                else if (param) encodedString = param;
                else continue;

                if (typeof encodedString !== 'string') {
                    this.log(`Expected ${encodedString} to be a string`, 'error');
                    continue;
                }

                let decoded = decodeURL(encodedString, encoding);
                let target = '';
                let recleanData = null;

                // If the response is JSON, decode and look for a key
                if (isJSON(decoded)) {
                    const json = JSON.parse(decoded);
                    target = json[rule.decode.lookFor];
                    // Add to the info response
                    data.info.decoded = json;
                } else if (this.config.allowCustomHandlers === true && rule.decode.handler) {
                    // Run custom URL handlers for websites
                    const handler = handlers[rule.decode.handler];

                    if (typeof handler === 'undefined') {
                        this.log('Handler was not found for ' + rule.decode.handler, 'error');
                    }

                    if (rule.decode.handler && handler) {
                        data.info.handler = rule.decode.handler;

                        // Pass the handler a bunch of information it can use
                        const result = handler.exec(data.url, {
                            decoded,
                            lastPath,
                            urlParams: new URL(data.url).searchParams,
                            fullPath: pathname,
                            originalURL: data.url
                        });

                        // If the handler threw an error or the URL is invalid
                        if (result.error || validateURL(result.url) === false) {
                            if (result.url !== 'undefined') this.log(result.error, 'error');
                        }

                        // result.url will always by the original URL when an error is thrown
                        recleanData = result.url;
                    }
                } else {
                    // If the response is a string we can continue
                    target = decoded;
                }

                // Re-clean the URL after handler result
                target = allowReclean ? this.clean(recleanData ?? target, false).url : recleanData ?? target;

                // If the key we want exists and is a valid url then update the data url
                if (target && target !== '' && validateURL(target)) {
                    data.url = `${target}` + original.hash;
                }
            } catch (error) {
                this.log(`${error}`, 'error');
            }
        }

        // Handle empty hash / anchors
        if (_url.endsWith('#')) {
            data.url += '#';
            url += '#';
        }

        // Remove empty values when requested
        for (const rule of data.info.match) {
            if (rule.rev) data.url = data.url.replace(/=(?=&|$)/gm, '');
        }

        const diff = getLinkDiff(data.url, url);
        data.info = Object.assign(data.info, diff);

        // If the link is longer then we have an issue
        if (data.info.reduction < 0) {
            this.log(`Reduction is ${data.info.reduction}. Please report this link on GitHub: ${$github}/issues`, 'error');
            data.url = data.info.original;
        }

        data.info.fullClean = true;
        data.info.full_clean = true;

        // Reset the original URL if there is no change, just to be safe
        if (data.info.difference === 0 && data.info.reduction === 0) {
            data.url = data.info.original;
        }

        return data;
    }
    private reapplyClean(url: string, allowReclean = true): string {
        let data = this.clean(url, allowReclean);
        return data.url;
    }
}

export const TidyURL = new TidyCleaner();
export const clean = (url: string) => TidyURL.clean(url);
