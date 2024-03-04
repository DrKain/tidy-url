import { IRule, IData } from './interface';
import { TidyConfig } from './config';
export declare class TidyCleaner {
    rules: IRule[];
    /** @deprecated Please use `config.silent` */
    silent: boolean;
    /** @deprecated Please use `config.allowAMP` */
    allow_amp: boolean;
    /** @deprecated Please use `config.allowRedirects` */
    allow_redirects: boolean;
    /** @deprecated Please use `config.allowCustomHandlers` */
    allow_custom_handlers: boolean;
    /**
     * Stores config options for this cleaner. If you would like to
     * use multiple configs simply create a new instance
     */
    config: TidyConfig;
    /**
     * Contains all logged information from the last clean, even if `config.silent` was `true`.
     * This will be reset when a new URL is cleaned. This is for debugging and not to be relied upon
     */
    loglines: {
        type: string;
        message: string;
    }[];
    /**
     * The full list of all rules with default value
     * that are not used in the main rules file to save space.
     */
    get expandedRules(): IRule[];
    constructor();
    /**
     * Only log to the console if debug is enabled
     * @param str Message
     */
    private log;
    /**
     * Rebuild to ensure trailing slashes or encoded characters match.
     * @param url Any URL
     */
    rebuild(url: string): string;
    /**
     * This lets users know when they are using the deprecated variables that will
     * be removed in a few updates.
     */
    private syncDeprecatedToConfig;
    /** @deprecated Import `validateURL` instead */
    validate(url: string): boolean;
    /**
     * Clean a URL
     * @param _url Any URL
     * @returns IData
     */
    clean(_url: string, allowReclean?: boolean): IData;
}
export declare const TidyURL: TidyCleaner;
export declare const clean: (url: string) => IData;
