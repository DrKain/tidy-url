export interface IRule {
    /** Name of the website */
    name: string;
    /** Regex to test against the host */
    match: RegExp;
    /** Regex to test against the full URL */
    match_href: boolean;
    /** All parameters that match these rules will be removed */
    rules: string[];
    /**
     * Used in special cases where parts of the URL needs to be modified.
     * See the amazon.com rule for an example.
     */
    replace: any[];
    /**
     * Used to auto-redirect to a different URL based on the parameter.
     * This is used to skip websites that track external links.
     */
    redirect: string;
    /**
     * There's a whole number of reasons why you don't want AMP links,
     * too many to fit in this description.
     * See this link for more info: https://redd.it/ehrq3z
     */
    amp: RegExp | null;
    /**
     * @experimental
     * Used to decode a base64 parameter, then redirect based on the returned object
     */
    decode: {
        param: string;
        lookFor?: string;
        encoding?: EEncoding;
    };
    /** Remove empty values */
    rev: boolean;
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
        /** The decoded object from the decode parameter (if it exists) */
        decoded: {
            [key: string]: any;
        } | null;
        /** If the cleaned URL is a different host */
        is_new_host: boolean;
        full_clean: boolean;
    };
}
export declare enum EEncoding {
    base64 = "base64",
    base32 = "base32",
    base45 = "base45",
    url = "url",
    urlc = "urlc",
    url2 = "url2",
    binary = "binary",
    hex = "hex"
}
