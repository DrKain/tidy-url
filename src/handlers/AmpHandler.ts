import { IData, IRule } from '../interfaces';
import { validateURL } from '../utils';

/**
 * Class AmpHandler handles AMP URLs based on provided rules.
 */
export class AmpHandler {
    private rules: IRule[];
    private reapplyClean: (url: string,allowReclean: boolean ) => string;

     /**
     * Constructor initializes the rules and reapplyClean function.
     * Only considers rules that have an 'amp' property.
     * @param {IRule[]} rules - Array of rules to apply.
     * @param {(url: string,allowReclean: boolean ) => string} reapplyClean - Function to reapply cleaning.
     */
    constructor(rules: IRule[], reapplyClean: (url: string,allowReclean: boolean ) => string ){
        this.rules = rules.filter(rule => rule.amp);  // Only consider rules that have an 'amp' property
        this.reapplyClean = reapplyClean;
    }

    /**
     * Applies the AMP handling rules to the provided data.
     * Iterates over all rules that have an 'amp' property and applies them to the data's URL.
     * @param {IData} data - The data to handle.
     * @param {boolean} allowReclean - Whether to allow re-cleaning of the URL.
     * @returns {IData} - The possibly modified data.
     */
    public handle(data: IData, allowReclean: boolean = true): IData {
        data.info.match.filter(rule => rule.amp).forEach(rule => {
            try {
                // Handle replacing text in the URL
                if (rule.amp.replace) {
                    const toReplace = rule.amp.replace.text;
                    const toReplaceWith = rule.amp.replace.with ?? '';
                    data.url = data.url.replace(toReplace, toReplaceWith);
                    data.info.handler = rule.name;
                }

                // Use RegEx capture groups to further modify the URL
                if (rule.amp.regex && new RegExp(rule.amp.regex).test(data.url)) {
                    const regex = new RegExp(rule.amp.regex);
                    const result = regex.exec(data.url);
                    if (result && result[1]) {
                        let target = decodeURIComponent(result[1]);
                        if (!target.startsWith('https')) target = 'https://' + target;
                        if (validateURL(target)) {
                            data.url = allowReclean ? this.reapplyClean(target, false) : target;
                        }
                    }
                }

                // Handle slicing off specific trailing parts identified in the rule
                if (rule.amp.sliceTrailing && data.url.endsWith(rule.amp.sliceTrailing)) {
                    data.url = data.url.slice(0, -rule.amp.sliceTrailing.length);
                }

                // Remove known AMP path segments
                if (data.url.includes('/amp') || data.url.includes('amp/')) {
                    data.url = data.url.replace('/amp', '').replace('amp/', '');
                }
            } catch (error) {
                console.error(`AMP Handling Error: ${error}`);
            }
        });
        return data;
    }
}
