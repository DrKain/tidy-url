import { IData } from '../interfaces';
import { TidyConfig } from '../config/TidyConfig';
export declare class RedirectHandler {
    private config;
    /**
     * Constructor for the RedirectHandler class.
     * Initializes the rules and configuration.
     * @param {IRule[]} rules - Array of rules to apply for redirection.
     * @param {TidyConfig} config - Configuration object.
     */
    constructor(config: TidyConfig);
    /**
     * Applies the redirection rules to the provided data.
     * If redirects are not allowed in the configuration, returns the data as is.
     * Otherwise, iterates over all rules and applies the first one that matches the URL and has a redirect.
     * @param {IData} data - The data to handle.
     * @returns {IData} - The possibly modified data.
     */
    handle(data: IData): IData;
    private matchRule;
    private applyRedirect;
}
