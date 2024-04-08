// File: src/handlers/RedirectHandler.ts

import { IData, IRule, EEncoding } from '../interfaces';
import { decodeURL, validateURL } from '../utils';
import { TidyConfig } from '../config/TidyConfig';

export class RedirectHandler {
    private config: TidyConfig;

    /**
     * Constructor for the RedirectHandler class.
     * Initializes the rules and configuration.
     * @param {IRule[]} rules - Array of rules to apply for redirection.
     * @param {TidyConfig} config - Configuration object.
     */
    constructor(config: TidyConfig) {
        this.config = config;
    }
    /**
     * Applies the redirection rules to the provided data.
     * If redirects are not allowed in the configuration, returns the data as is.
     * Otherwise, iterates over all rules and applies the first one that matches the URL and has a redirect.
     * @param {IData} data - The data to handle.
     * @returns {IData} - The possibly modified data.
     */
    public handle(data: IData): IData {
        if (!this.config.allowRedirects) {
            return data; // Early exit if redirects are not allowed
        }

        const url = new URL(data.url);
        const cleaner_ci = new URLSearchParams();
        url.searchParams.forEach((v, k) => cleaner_ci.append(k.toLowerCase(), v));

        for (const rule of data.info.match) {
            if (!rule.redirect) continue;
            if (this.matchRule(url, rule)) {
                const targetParam = cleaner_ci.get(rule.redirect.toLowerCase());
                if (!targetParam) continue;
                let decodedUrl = decodeURL(targetParam, EEncoding.urlc);
                if (validateURL(decodedUrl)) {
                    data.url = this.applyRedirect(decodedUrl);
                    break; // Stop after the first successful redirect
                }
            }
        }

        return data;
    }

    private matchRule(url: URL, rule: IRule): boolean {
        const matchHost = rule.match_href ? url.href : url.host;
        return rule.match.test(matchHost);
    }

    private applyRedirect(newUrl: string): string {
        return newUrl; // Additional logic might be applied here if needed
    }
}
