import { IRule, IData } from './interface';
export declare class TidyCleaner {
    rules: IRule[];
    silent: boolean;
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
    rebuild(url: string): string;
    /**
     * Clean a URL
     * @param _url Any URL
     * @returns IData
     */
    clean(_url: string): IData;
}
export declare const TidyURL: TidyCleaner;
export declare const clean: (url: string) => IData;
