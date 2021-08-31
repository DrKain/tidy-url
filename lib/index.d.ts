import { IRule, IData } from './interface';
declare class TidyCleaner {
    rules: IRule[];
    silent: boolean;
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
     * Clean a URL
     * @param url Any URL
     * @returns IData
     */
    clean(url: string): IData;
}
export declare const TidyURL: TidyCleaner;
export {};
