import { IData, IRule } from '../interfaces';
/**
 * Class AmpHandler handles AMP URLs based on provided rules.
 */
export declare class AmpHandler {
    private rules;
    private reapplyClean;
    /**
    * Constructor initializes the rules and reapplyClean function.
    * Only considers rules that have an 'amp' property.
    * @param {IRule[]} rules - Array of rules to apply.
    * @param {(url: string,allowReclean: boolean ) => string} reapplyClean - Function to reapply cleaning.
    */
    constructor(rules: IRule[], reapplyClean: (url: string, allowReclean: boolean) => string);
    /**
     * Applies the AMP handling rules to the provided data.
     * Iterates over all rules that have an 'amp' property and applies them to the data's URL.
     * @param {IData} data - The data to handle.
     * @param {boolean} allowReclean - Whether to allow re-cleaning of the URL.
     * @returns {IData} - The possibly modified data.
     */
    handle(data: IData, allowReclean?: boolean): IData;
}
