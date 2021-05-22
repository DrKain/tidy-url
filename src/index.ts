import { IRule } from './interface';

class TidyCleaner {
    public rules: IRule[] = [];
    public debug = false;

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
        if (this.debug) console.log(str);
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
     * @returns String
     */
    public clean(url: string): string {
        let queue: any[] = [];
        let replace: any[] = [];
        let modified = 0;
        let deleted = [];

        // Make sure the URL is valid before we try to clean it
        if (!this.validate(url)) {
            this.log('An invalid URL was supplied');
            return url;
        }

        const original = new URL(url);
        const cleaner = original.searchParams;
        let pathname = original.pathname;

        this.log(`Target: ${url}\nOrigin: ${original.origin}`);

        // Loop through the rules and match them to the host name
        for (let rule of this.rules) {
            if (rule.match.exec(original.host) !== null) {
                this.log(`Matched ${rule.name} (${rule.match})`);
                queue = [...queue, ...rule.rules];
                replace = [...replace, ...rule.replace];
            }
        }

        // Delete any matches in the queue
        for (let key of queue) {
            if (cleaner.has(key)) {
                deleted.push(key);
                cleaner.delete(key);
                modified++;
            }
        }

        this.log(`Deleted ${deleted.length} items: ${deleted.join(' ')}`);

        // Update the pathname if needed
        for (let key of replace) {
            const changed = pathname.replace(key, '');
            if (changed !== pathname) {
                this.log(`Pathname changed: ${pathname} -> ${changed}`);
                pathname = changed;
            }
        }

        // Build final URL
        const params = cleaner.toString().length ? '?' + cleaner.toString() : '';
        const final = original.origin + pathname + params;

        this.log(`Final: ${final}`);
        return final;
    }
}

export const TidyURL = new TidyCleaner();
