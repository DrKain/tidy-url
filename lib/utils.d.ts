/**
 * Accepts any base64 string and attempts to decode it.
 * If run through the browser `atob` will be used, otherwise
 * the code will use `Buffer.from`.
 * If there's an error the original string will be returned.
 * @param str String to be decoded
 * @returns Decoded string
 */
export declare const decodeBase64: (str: string) => string;
