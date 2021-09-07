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
        /** Number of characters removed */
        reduction: number;
        /** RegEx Replacements */
        replace: any[];
        /** Parameters that were removed */
        remove: any[];
        /** Rules matched */
        match: any[];
        /** If a query parameter exists, redirect to the value */
        redirect: string;
    };
}
