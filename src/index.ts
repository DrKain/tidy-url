import { IRule, IData, EEncoding } from './interface';
import { handlers } from './handlers';

const $github = 'https://github.com/DrKain/tidy-url';

export class TidyCleaner {
    public rules: IRule[] = [];
    /**
     * Don't log anything to the console.
     */
    public silent = true;

    /**
     * There's a whole number of reasons why you don't want AMP links,
     * too many to fit in this description.
     * See this link for more info: https://redd.it/ehrq3z
     */
    public allow_amp = false;
    /**
     * Used to auto-redirect to a different URL based on the parameter.
     * This is used to skip websites that track external links.
     */
    public allow_redirects = true;
    /**
     * Custom handlers for specific websites that use tricky URLs
     * that make it harder to "clean"
     */
    public allow_custom_handlers = true;

    public loglines: string[] = [];

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
        // Load the rules
        try {
            this.rules = require('../data/rules.js');
        } catch (error) {
            this.log(`${error}`);
            this.rules = [];
        }
    }

    /**
     * Only log to the console if debug is enabled
     * @param str Message
     */
    private log(str: string) {
        this.loglines.push(str);
        if (!this.silent) console.log(str);
    }

    /**
     * Determine if the input is a valid URL or not
     * @param url Any URL
     * @returns true/false
     */
    public validate(url: string): boolean {
        try {
            const pass = ['http:', 'https:'];
            const test = new URL(url);
            const prot = test.protocol.toLowerCase();

            if (pass.includes(prot) === false) {
                throw Error('Not acceptable protocol: ' + prot);
            }

            return true;
        } catch (error) {
            if (url !== 'undefined' && url !== 'null' && url.length > 0) {
                this.log(`[error] Invalid URL: ` + url);
            }
            return false;
        }
    }

    /**
     * Rebuild to ensure trailing slashes or encoded characters match.
     * @param url Any URL
     */
    public rebuild(url: string): string {
        const original = new URL(url);
        return original.protocol + '//' + original.host + original.pathname + original.search + original.hash;
    }

    public hasParams(url: string): boolean {
        return new URL(url).searchParams.toString().length > 0;
    }

    private isJSON(data: string) {
        try {
            JSON.parse(data);
            return true;
        } catch (error) {
            return false;
        }
    }

    private getDiff(data: IData, url: string) {
        return {
            is_new_host: new URL(url).host !== new URL(data.url).host,
            difference: url.length - data.url.length,
            reduction: +(100 - (data.url.length / url.length) * 100).toFixed(2)
        };
    }

    private decode(str: string, encoding: EEncoding = EEncoding.base64): string {
        let decoded = str;

        // Simple base64 decoding
        if (encoding === EEncoding.base64) {
            if (typeof atob === 'undefined') {
                return Buffer.from(decoded, 'base64').toString('binary');
            } else {
                return atob(decoded);
            }
        }

        // Decode uri when used in URL parameters
        if (encoding === EEncoding.url) {
            decoded = decodeURI(str);
        }

        // decodeURIComponent
        if (encoding === EEncoding.urlc) {
            decoded = decodeURIComponent(str);
        }

        // This is more of a special case but it may help other rules. See issue #72
        if (encoding === EEncoding.url2) {
            decoded = decodeURIComponent(str.replace(/-/g, '%')).replace(/_/g, '/').replace(/%2F/g, '/');
        }

        // hex decode, not the best method but it works.
        // Open a PR if you want to improve it
        if (encoding === EEncoding.hex) {
            let hex = str.toString();
            let out = '';

            for (var i = 0; i < hex.length; i += 2) {
                out += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
            }

            decoded = out;
        }

        return decoded;
    }

    /**
     * Clean a URL
     * @param _url Any URL
     * @returns IData
     */
    public clean(_url: string, allow_reclean = true): IData {
        if (!allow_reclean) this.loglines = [];

        // Default values
        const data: IData = {
            url: _url,
            info: {
                original: _url,
                reduction: 0,
                difference: 0,
                replace: [],
                removed: [],
                handler: null,
                match: [],
                decoded: null,
                is_new_host: false,
                full_clean: false
            }
        };

        // Make sure the URL is valid before we try to clean it
        if (!this.validate(_url)) {
            if (_url !== 'undefined') this.log('[error] An invalid URL was supplied');
            return data;
        }

        // If there's no params, we can skip the rest of the process
        if (this.allow_amp && this.hasParams(_url) === false) {
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
        if (this.allow_amp === true && hasAmpRule === undefined) {
            // Make sure there are no parameters before resetting
            if (!this.hasParams(url)) {
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
        if (this.allow_redirects) {
            for (const rule of data.info.match) {
                if (!rule.redirect) continue;

                const target = rule.redirect;
                let value = cleaner_ci.get(target) as string;

                // Sometimes the parameter is encoded
                const isEncoded = this.decode(value, EEncoding.urlc);
                if (isEncoded !== value && this.validate(isEncoded)) value = isEncoded;

                if (target.length && cleaner_ci.has(target)) {
                    if (this.validate(value)) {
                        data.url = `${value}` + original.hash;
                        if (allow_reclean) data.url = this.clean(data.url, false).url;
                    } else {
                        this.log('[error] Failed to redirect: ' + value);
                    }
                }
            }
        }

        // De-amp the URL
        if (this.allow_amp === false) {
            for (const rule of data.info.match) {
                try {
                    // Ensure the amp rule matches
                    if (rule.amp && data.url.match(rule.amp)) {
                        // Reset the lastIndex
                        rule.amp.lastIndex = 0;
                        const result = rule.amp.exec(data.url);
                        if (result && result[1]) {
                            // If there is a result, replace the URL
                            let target = decodeURIComponent(result[1]);
                            if (!target.startsWith('https')) target = 'https://' + target;
                            if (this.validate(target)) {
                                data.url = allow_reclean ? this.clean(target, false).url : target;
                                if (data.url.endsWith('%3Famp')) data.url = data.url.slice(0, -6);
                                if (data.url.endsWith('amp/')) data.url = data.url.slice(0, -4);
                            }
                        }
                    }
                } catch (error) {
                    this.log(`${error}`);
                }
            }
        }

        // Decode handler
        for (const rule of data.info.match) {
            try {
                if (!rule.decode) continue;
                // Make sure the target parameter exists
                if (!cleaner.has(rule.decode.param) && rule.decode.targetPath !== true) continue;
                // These will always be clickjacking links, so use the allow_redirects rule
                if (!this.allow_redirects) continue;
                // Decode the string using selected encoding
                const encoding = rule.decode.encoding || 'base64';
                // Sometimes the website path is what we need to decode
                let lastPath = pathname.split('/').pop();
                // This will be null if the param doesn't exist
                const param = cleaner.get(rule.decode.param);
                // Use a default string
                let encodedString: string = '';

                // Decide what we are decoding
                if (param === null && lastPath !== undefined) encodedString = lastPath;
                else if (param) encodedString = param;
                else continue;

                if (typeof encodedString !== 'string') {
                    this.log(`[error] Expected ${encodedString} to be a string`);
                    continue;
                }

                const decoded = this.decode(encodedString, encoding);
                let target = '';

                // If the response is JSON, decode and look for a key
                if (this.isJSON(decoded)) {
                    const json = JSON.parse(decoded);
                    target = json[rule.decode.lookFor];
                    // Add to the info response
                    data.info.decoded = json;
                } else if (this.allow_custom_handlers === true && rule.decode.handler) {
                    // Run custom URL handlers for websites
                    const handler = handlers[rule.decode.handler];

                    if (typeof handler === 'undefined') {
                        this.log('[error] Handler was not found for ' + rule.decode.handler);
                    }

                    if (rule.decode.handler && handler) {
                        data.info.handler = rule.decode.handler;
                        const result = handler.exec(data.url, [decoded]);
                        // If the handler threw an error or the URL is invalid
                        if (result.error || this.validate(result.url) === false) {
                            if (result.url !== 'undefined') this.log('[error] ' + result.error);
                        }
                        // Re-clean the URL after handler result
                        target = this.clean(result.url, false).url;
                    } else {
                        // If the response is a string we can continue
                        target = decoded;
                    }
                }

                // If the key we want exists and is a valid url then update the data url
                if (target && this.validate(target)) {
                    data.url = `${target}` + original.hash;
                }
            } catch (error) {
                this.log(`[error] ${error}`);
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

        const diff = this.getDiff(data, url);
        data.info = Object.assign(data.info, diff);

        // If the link is longer then we have an issue
        if (data.info.reduction < 0) {
            this.log(`[error] Reduction is ${data.info.reduction}. Please report this link on GitHub: ${$github}/issues`);
            data.url = data.info.original;
        }

        data.info.full_clean = true;

        // Reset the original URL if there is no change, just to be safe
        if (data.info.difference === 0 && data.info.reduction === 0) {
            data.url = data.info.original;
        }

        return data;
    }
}

export const TidyURL = new TidyCleaner();
export const clean = (url: string) => TidyURL.clean(url);
