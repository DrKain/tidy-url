import { IRule, IData } from './interface';

const $github = 'https://github.com/DrKain/tidy-url';

export class TidyCleaner {
    public rules: IRule[] = [];
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

    get expandedRules() {
        return this.rules.map((rule) => {
            return Object.assign(
                {
                    rules: [],
                    replace: [],
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
        if (!this.silent) console.log(str);
    }

    /**
     * Determine if the input is a valid URL or not
     * @param url Any URL
     * @returns true/false
     */
    public validate(url: string): boolean {
        try {
            new URL(url);
            return true;
        } catch (error) {
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

    /**
     * Clean a URL
     * @param _url Any URL
     * @returns IData
     */
    public clean(_url: string, allow_reclean = true): IData {
        // Default values
        const data: IData = {
            url: _url,
            info: {
                original: _url,
                reduction: 0,
                difference: 0,
                replace: [],
                removed: [],
                match: [],
                decoded: null,
                is_new_host: false
            }
        };

        // Make sure the URL is valid before we try to clean it
        if (!this.validate(_url)) {
            this.log('An invalid URL was supplied');
            return data;
        }

        // If there's no params, we can skip the rest of the process
        if (!this.hasParams(_url)) return data;

        // Rebuild to ensure trailing slashes or encoded characters match
        const url = this.rebuild(_url);
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
            rule.match.lastIndex = 0;
            if (rule.match.exec(original.host) !== null) {
                // Loop through the rules and add to to_remove
                to_remove = [...to_remove, ...(rule.rules || [])];
                data.info.replace = [...data.info.replace, ...(rule.replace || [])];
                data.info.match.push(rule);
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
                if (rule.redirect.length && cleaner_ci.has(rule.redirect)) {
                    data.url = `${cleaner_ci.get(rule.redirect)}` + original.hash;
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
                if (!cleaner.has(rule.decode.param)) continue;
                // These will always be clickjacking links, so use the allow_redirects rule
                if (!this.allow_redirects) continue;
                // Decode the base64 string and parse it as JSON
                const json = JSON.parse(atob(cleaner.get(rule.decode.param) as string));
                const target = json[rule.decode.lookFor];
                // If the key we want exists and is a valid url then update the data url
                if (target && this.validate(target)) {
                    data.url = `${target}` + original.hash;
                }
                // Add to the info response
                data.info.decoded = json;
            } catch (error) {
                this.log(`${error}`);
            }
        }

        data.info.difference = _url.length - data.url.length;
        data.info.reduction = +(100 - (data.url.length / _url.length) * 100).toFixed(2);

        if (new URL(url).host !== new URL(data.url).host) {
            data.info.is_new_host = true;
        }

        // If the link is longer then we have an issue
        if (data.info.reduction < 0) {
            this.log(`Reduction is ${data.info.reduction}. Please report this link on GitHub: ${$github}/issues`);
            data.url = data.info.original;
        }

        return data;
    }
}

export const TidyURL = new TidyCleaner();
export const clean = (url: string) => TidyURL.clean(url);
