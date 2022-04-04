export interface IRule {
    name: string;
    match: RegExp;
    rules: string[];
    replace: any[];
    redirect: string;
}
export interface IData {
    /** Cleaned URL */
    url: string;
    info: {
        /** Original URL before cleaning */
        original: string;
        /** URL reduction as a percentage */
        reduction: number;
        /** Number of characters removed */
        difference: number;
        /** RegEx Replacements */
        replace: any[];
        /** Parameters that were removed */
        removed: {
            key: string;
            value: string;
        }[];
        /** Rules matched */
        match: any[];
        /** If a query parameter exists, redirect to the value */
        redirect: string;
    };
}
