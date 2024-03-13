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
    amp: {
        /**
         * Standard AMP handling using RegExp capture groups.
         */
        regex?: RegExp;
        /**
         * Replace text in the URL. If `with` is used the text will be
         * replaced with what you set instead of removing it.
         */
        replace?: {
            /** The text or RegEx you want to replace */
            text: string | RegExp;
            /** The text you want to replace it with. Optional */
            with?: string;
            /** Currently has no effect, this will change in another update */
            target?: 'host' | 'full';
        };
        /**
         * Slice off a trailing string, these are usually "/amp" or "amp/"
         * This setting should help prevent breaking any pages.
         */
        sliceTrailing?: string;
    };
    /**
     * Used to decode a parameter or path, then redirect based on the returned object
     */
    decode: {
        /** Target parameter */
        param?: string;
        /** If the decoded response is JSON, this will look for a certain key */
        lookFor?: string;
        /** Decide what encoding to use */
        encoding?: EEncoding;
        /** Target the full path instead of a parameter */
        targetPath?: boolean;
        /** Use a custom handler found in handlers.ts */
        handler?: string;
    };
    /** Remove empty values */
    rev: boolean;
}

export interface IData {
    /** Cleaned URL */
    url: string;
    /** Some debugging information about what was changed */
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
        removed: { key: string; value: string }[];
        /** Handler used */
        handler: string | null;
        /** Rules matched */
        match: any[];
        /** The decoded object from the decode parameter (if it exists) */
        decoded: { [key: string]: any } | null;
        /** @deprecated Please use `isNewHost` */
        is_new_host: boolean;
        /** If the compared links have different hosts */
        isNewHost: boolean;
        /** @deprecated Please use `fullClean` */
        full_clean: boolean;
        /** If the code reached the end of the clean without error */
        fullClean: boolean;
    };
}

export enum EEncoding {
    base64 = 'base64',
    base32 = 'base32',
    base45 = 'base45',
    url = 'url',
    urlc = 'urlc',
    binary = 'binary',
    hex = 'hex'
}

export interface IConfig {
    /**
     * There's a whole number of reasons why you don't want AMP links,
     * too many to fit in this description.
     * See this link for more info: https://redd.it/ehrq3z
     */
    allowAMP: boolean;
    /**
     * Custom handlers for specific websites that use tricky URLs
     * that make it harder to "clean"
     */
    allowCustomHandlers: boolean;
    /**
     * Used to auto-redirect to a different URL based on the parameter.
     * This is used to skip websites that track external links.
     */
    allowRedirects: boolean;
    /** Nothing logged to console */
    silent: boolean;
}

export interface IHandlerArgs {
    /** The attemp made at decoding the string, may be invalid */
    decoded: string;
    /** The last part of the URL path, split by a forward slash */
    lastPath: string;
    /** The full URL path excluding the host */
    fullPath: string;
    /** A fresh copy of URLSearchParams */
    urlParams: URLSearchParams;
    /** The original URL */
    readonly originalURL: string;
}

export interface IHandler {
    readonly note?: string;
    exec: (
        /** The original URL */
        str: string,
        /** Various args that can be used when writing a handler */
        args: IHandlerArgs
    ) => {
        /** The original URL */
        url: string;
        error?: any;
    };
}

export interface ILinkDiff {
    /** @deprecated Please use isNewHost */
    is_new_host: boolean;
    /** If the compared links have different hosts */
    isNewHost: boolean;
    difference: number;
    reduction: number;
}
