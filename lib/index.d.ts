import { IRule, IData } from './interface';
export declare class TidyCleaner {
    rules: IRule[];
    silent: boolean;
    /**
     * There's a whole number of reasons why you don't want AMP links,
     * too many to fit in this description.
     * See this link for more info: https://redd.it/ehrq3z
     */
    allow_amp: boolean;
    /**
     * Used to auto-redirect to a different URL based on the parameter.
     * This is used to skip websites that track external links.
     */
    allow_redirects: boolean;
    get expandedRules(): IRule[];
    constructor();
    /**
     * Only log to the console if debug is enabled
     * @param str Message
     */
    private log;
    /**
     * Determine if the input is a valid URL or not
     * @param url Any URL
     * @returns true/false
     */
    validate(url: string): boolean;
    /**
     * Rebuild to ensure trailing slashes or encoded characters match.
     * @param url Any URL
     */
    rebuild(url: string): string;
    hasParams(url: string): boolean;
    /**
     * Clean a URL
     * @param _url Any URL
     * @returns IData
     */
    clean(_url: string, allow_reclean?: boolean): IData;
}
export declare const TidyURL: TidyCleaner;
export declare const clean: (url: string) => IData;
