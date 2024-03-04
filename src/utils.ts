import { EEncoding, ILinkDiff } from './interface';

/**
 * Accepts any base64 string and attempts to decode it.
 * If run through the browser `atob` will be used, otherwise
 * the code will use `Buffer.from`.
 * If there's an error the original string will be returned.
 * @param str String to be decoded
 * @returns Decoded string
 */
export const decodeBase64 = (str: string): string => {
    try {
        let result = str;

        if (typeof atob === 'undefined') {
            result = Buffer.from(str, 'base64').toString('binary');
        } else {
            result = atob(str);
        }

        return result;
    } catch (error) {
        return str;
    }
};

/**
 * Checks if data is valid JSON. The result will be either `true` or `false`.
 * @param data Any string that might be JSON
 * @returns true or false
 */
export const isJSON = (data: string): boolean => {
    try {
        JSON.parse(data);
        return true;
    } catch (error) {
        return false;
    }
};

/**
 * Check if a domain has any URL parameters
 * @param url Any valid URL
 * @returns true / false
 */
export const urlHasParams = (url: string): boolean => {
    return new URL(url).searchParams.toString().length > 0;
};

/**
 * Determine if the input is a valid URL or not. This will only
 * accept http and https protocols.
 * @param url Any URL
 * @returns true / false
 */
export const validateURL = (url: string): boolean => {
    try {
        const pass = ['http:', 'https:'];
        const test = new URL(url);
        const prot = test.protocol.toLowerCase();

        if (!pass.includes(prot)) {
            throw new Error('Not acceptable protocol: ' + prot);
        }

        return true;
    } catch (error) {
        if (url !== 'undefined' && url !== 'null' && url.length > 0) {
            throw new Error(`Invalid URL: ` + url);
        }
        return false;
    }
};

/**
 * Calculates the difference between two links and returns an object of information.
 * @param firstURL Any valid URL
 * @param secondURL Any valid URL
 * @returns The difference between two links
 */
export const getLinkDiff = (firstURL: string, secondURL: string): ILinkDiff => {
    const oldUrl = new URL(firstURL);
    const newUrl = new URL(secondURL);

    return {
        is_new_host: oldUrl.host !== newUrl.host,
        isNewHost: oldUrl.host !== newUrl.host,
        difference: secondURL.length - firstURL.length,
        reduction: +(100 - (firstURL.length / secondURL.length) * 100).toFixed(2)
    };
};

export const regexExtract = (regex: RegExp, str: string): string[] => {
    let matches = null;
    let result: string[] = [];

    while ((matches = regex.exec(str)) !== null) {
        if (matches.index === regex.lastIndex) regex.lastIndex++;
        matches.forEach((v) => result.push(v));
    }

    return result;
};

/**
 * These are methods that have not been written yet,
 * the original string will be returned.
 */
const _placeholder = (decoded: string) => decoded;
const decoders: Record<EEncoding, (decoded: string) => string> = {
    [EEncoding.url]: (decoded: string) => decodeURI(decoded),
    [EEncoding.urlc]: (decoded: string) => decodeURIComponent(decoded),
    [EEncoding.base32]: _placeholder,
    [EEncoding.base45]: _placeholder,
    [EEncoding.base64]: (decoded: string) => decodeBase64(decoded),
    [EEncoding.binary]: _placeholder,
    [EEncoding.hex]: (decoded: string) => {
        let hex = decoded.toString();
        let out = '';
        for (var i = 0; i < hex.length; i += 2) {
            out += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        }
        return out;
    }
};

/**
 * Attempts to decode a URL or string using the selected method.
 * If the decoding fails the original string will be returned.
 * `encoding` is optional and will default to base64
 * @param str String to decode
 * @param encoding Encoding to use
 * @returns decoded string
 */
export const decodeURL = (str: string, encoding: EEncoding = EEncoding.base64): string => {
    try {
        return decoders[encoding](str);
    } catch (error) {
        return str;
    }
};
