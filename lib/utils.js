"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeBase64 = void 0;
/**
 * Accepts any base64 string and attempts to decode it.
 * If run through the browser `atob` will be used, otherwise
 * the code will use `Buffer.from`.
 * If there's an error the original string will be returned.
 * @param str String to be decoded
 * @returns Decoded string
 */
var decodeBase64 = function (str) {
    try {
        var result = str;
        if (typeof atob === 'undefined') {
            result = Buffer.from(str, 'base64').toString('binary');
        }
        else {
            result = atob(str);
        }
        return result;
    }
    catch (error) {
        return str;
    }
};
exports.decodeBase64 = decodeBase64;
