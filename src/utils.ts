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
