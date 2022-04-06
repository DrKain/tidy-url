import { IRule, IData } from './interface';

const $github = 'https://github.com/DrKain/tidy-url';

export class TidyCleaner {
    public rules: IRule[] = [];
    public silent = false;

    get expandedRules() {
        return this.rules.map((rule) => {
            return Object.assign({ rules: [], replace: [], redirect: '' }, rule) as IRule;
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

    public rebuild(url: string) {
        const original = new URL(url);
        const params = original.searchParams;
        const param_str = params.toString().length ? '?' + params.toString() : '';
        return original.origin + original.pathname + param_str + original.hash;
    }

    /**
     * Clean a URL
     * @param _url Any URL
     * @returns IData
     */
    public clean(_url: string): IData {
        // Rebuild to ensure trailing slashes or encoded characters match
        const url = this.rebuild(_url);
        // List of parmeters that will be deleted if found
        let to_remove: string[] = [];

        const data: IData = {
            url,
            info: {
                original: url,
                reduction: 0,
                difference: 0,
                replace: [],
                removed: [],
                match: [],
                redirect: ''
            }
        };

        // Make sure the URL is valid before we try to clean it
        if (!this.validate(url)) {
            this.log('An invalid URL was supplied');
            return data;
        }

        const original = new URL(url);
        const cleaner = original.searchParams;
        let pathname = original.pathname;

        // Loop through the rules and match them to the host name
        for (const rule of this.expandedRules) {
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
        const params = cleaner.toString().length ? '?' + cleaner.toString() : '';
        data.url = original.origin + pathname + params + original.hash;

        // Redirect if the redirect parameter exists
        for (const rule of data.info.match) {
            if (rule.redirect.length && cleaner.has(rule.redirect)) {
                data.url = `${cleaner.get(rule.redirect)}` + original.hash;
            }
        }

        data.info.difference = url.length - data.url.length;
        data.info.reduction = +(100 - (data.url.length / url.length) * 100).toFixed(2);

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
