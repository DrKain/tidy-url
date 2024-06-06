import { EEncoding, IGuessEncoding, ILinkDiff } from './interface';
/**
 * Accepts any base64 string and attempts to decode it.
 * If run through the browser `atob` will be used, otherwise
 * the code will use `Buffer.from`.
 * If there's an error the original string will be returned.
 * @param str String to be decoded
 * @returns Decoded string
 */
export declare const decodeBase64: (str: string) => string;
/**
 * Checks if data is valid JSON. The result will be either `true` or `false`.
 * @param data Any string that might be JSON
 * @returns true or false
 */
export declare const isJSON: (data: string) => boolean;
/**
 * Check if a domain has any URL parameters
 * @param url Any valid URL
 * @returns true / false
 */
export declare const urlHasParams: (url: string) => boolean;
/**
 * Determine if the input is a valid URL or not. This will only
 * accept http and https protocols.
 * @param url Any URL
 * @returns true / false
 */
export declare const validateURL: (url: string) => boolean;
/**
 * Check if a string is b64. For now this should only be
 * used in testing.
 * @param str Any possible b64 string
 * @returns true/false
 */
export declare const isB64: (str: string) => boolean;
/**
 * DO NOT USE THIS IN HANDLERS.
 * This is purely for use in testing to save time.
 * This is not reliable, there are many incorrect
 * matches and it will fail in a lot of cases.
 * Do not use it anywhere else.
 * @param str Any string
 * @returns An object with possible encodings
 */
export declare const guessEncoding: (str: string) => IGuessEncoding;
/**
 * Calculates the difference between two links and returns an object of information.
 * @param firstURL Any valid URL
 * @param secondURL Any valid URL
 * @returns The difference between two links
 */
export declare const getLinkDiff: (firstURL: string, secondURL: string) => ILinkDiff;
export declare const regexExtract: (regex: RegExp, str: string) => string[];
/**
 * Attempts to decode a URL or string using the selected method.
 * If the decoding fails the original string will be returned.
 * `encoding` is optional and will default to base64
 * @param str String to decode
 * @param encoding Encoding to use
 * @returns decoded string
 */
export declare const decodeURL: (str: string, encoding?: EEncoding) => string;
