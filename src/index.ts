import { IRule, IData } from './interface';

class TidyCleaner {
    public rules: IRule[] = [];
    public silent = false;

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
     * Clean a URL
     * @param url Any URL
     * @returns IData
     */
    public clean(url: string): IData {
        let data: IData = {
            url,
            info: {
                original: url,
                reduction: 0,
                replace: [],
                remove: [],
                match: [],
                custom: false
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
        for (let rule of this.rules) {
            if (rule.match.exec(original.host) !== null) {
                data.info.remove = [...data.info.remove, ...rule.rules];
                data.info.replace = [...data.info.replace, ...rule.replace];
                data.info.match.push(rule);
            }
        }

        // Delete any matching parameters
        for (let key of data.info.remove) {
            if (cleaner.has(key)) cleaner.delete(key);
        }

        // Update the pathname if needed
        for (let key of data.info.replace) {
            const changed = pathname.replace(key, '');
            if (changed !== pathname) pathname = changed;
        }

        // Rebuild URL
        const params = cleaner.toString().length ? '?' + cleaner.toString() : '';
        data.url = original.origin + pathname + params;

        // Run custom function if needed (special case)
        for (let rule of data.info.match) {
            if (rule.custom) {
                data.url = rule.custom(data.url);
                data.info.custom = true;
            }
        }

        data.info.reduction = +(100 - (data.url.length / url.length) * 100).toFixed(2);

        return data;
    }
}

export const TidyURL = new TidyCleaner();
