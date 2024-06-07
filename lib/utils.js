"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeURL = exports.regexExtract = exports.getLinkDiff = exports.guessEncoding = exports.isB64 = exports.validateURL = exports.urlHasParams = exports.isJSON = exports.decodeBase64 = void 0;
var interface_1 = require("./interface");
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
/**
 * Checks if data is valid JSON. The result will be either `true` or `false`.
 * @param data Any string that might be JSON
 * @returns true or false
 */
var isJSON = function (data) {
    try {
        var sample = JSON.parse(data);
        if (typeof sample !== 'object')
            return false;
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.isJSON = isJSON;
/**
 * Check if a domain has any URL parameters
 * @param url Any valid URL
 * @returns true / false
 */
var urlHasParams = function (url) {
    return new URL(url).searchParams.toString().length > 0;
};
exports.urlHasParams = urlHasParams;
/**
 * Determine if the input is a valid URL or not. This will only
 * accept http and https protocols.
 * @param url Any URL
 * @returns true / false
 */
var validateURL = function (url) {
    try {
        var pass = ['http:', 'https:'];
        var test = new URL(url);
        var prot = test.protocol.toLowerCase();
        if (!pass.includes(prot)) {
            throw new Error('Not acceptable protocol: ' + prot);
        }
        return true;
    }
    catch (error) {
        if (url !== 'undefined' && url !== 'null' && url.length > 0) {
            throw new Error("Invalid URL: " + url);
        }
        return false;
    }
};
exports.validateURL = validateURL;
/**
 * Check if a string is b64. For now this should only be
 * used in testing.
 * @param str Any possible b64 string
 * @returns true/false
 */
var isB64 = function (str) {
    try {
        var regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
        return regex.test(str);
    }
    catch (error) {
        // Using try/catch to be safe
        return false;
    }
};
exports.isB64 = isB64;
/**
 * DO NOT USE THIS IN HANDLERS.
 * This is purely for use in testing to save time.
 * This is not reliable, there are many incorrect
 * matches and it will fail in a lot of cases.
 * Do not use it anywhere else.
 * @param str Any string
 * @returns An object with possible encodings
 */
var guessEncoding = function (str) {
    return {
        base64: exports.isB64(str),
        isJSON: exports.isJSON(str)
    };
};
exports.guessEncoding = guessEncoding;
/**
 * Calculates the difference between two links and returns an object of information.
 * @param firstURL Any valid URL
 * @param secondURL Any valid URL
 * @returns The difference between two links
 */
var getLinkDiff = function (firstURL, secondURL) {
    var oldUrl = new URL(firstURL);
    var newUrl = new URL(secondURL);
    return {
        is_new_host: oldUrl.host !== newUrl.host,
        isNewHost: oldUrl.host !== newUrl.host,
        difference: secondURL.length - firstURL.length,
        reduction: +(100 - (firstURL.length / secondURL.length) * 100).toFixed(2)
    };
};
exports.getLinkDiff = getLinkDiff;
var regexExtract = function (regex, str) {
    var matches = null;
    var result = [];
    var i = 0;
    // Limit to 10 to avoid infinite loop
    if ((matches = regex.exec(str)) !== null && i !== 10) {
        i++;
        if (matches.index === regex.lastIndex)
            regex.lastIndex++;
        matches.forEach(function (v) { return result.push(v); });
    }
    return result;
};
exports.regexExtract = regexExtract;
/**
 * These are methods that have not been written yet,
 * the original string will be returned.
 */
var _placeholder = function (decoded) { return decoded; };
var decoders = (_a = {},
    _a[interface_1.EEncoding.url] = function (decoded) { return decodeURI(decoded); },
    _a[interface_1.EEncoding.urlc] = function (decoded) { return decodeURIComponent(decoded); },
    _a[interface_1.EEncoding.base32] = _placeholder,
    _a[interface_1.EEncoding.base45] = _placeholder,
    _a[interface_1.EEncoding.base64] = function (decoded) { return exports.decodeBase64(decoded); },
    _a[interface_1.EEncoding.binary] = _placeholder,
    _a[interface_1.EEncoding.hex] = function (decoded) {
        var hex = decoded.toString();
        var out = '';
        for (var i = 0; i < hex.length; i += 2) {
            out += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        }
        return out;
    },
    _a);
/**
 * Attempts to decode a URL or string using the selected method.
 * If the decoding fails the original string will be returned.
 * `encoding` is optional and will default to base64
 * @param str String to decode
 * @param encoding Encoding to use
 * @returns decoded string
 */
var decodeURL = function (str, encoding) {
    if (encoding === void 0) { encoding = interface_1.EEncoding.base64; }
    try {
        return decoders[encoding](str);
    }
    catch (error) {
        return str;
    }
};
exports.decodeURL = decodeURL;
