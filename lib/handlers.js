"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlers = void 0;
/**
 * This is currently experimental while I decide on how I want to restructure the main code to make it easier to follow.
 * There will need to be handlers for each process of the "clean" as well as these custom cases for sites that mix it up.
 * If you would like to help or give your thoughts feel free to open an issue on GitHub.
 */
exports.handlers = {};
exports.handlers['patchbot.io'] = {
    exec: function (str, args) {
        try {
            var dec = decodeURIComponent(args[0]);
            return { url: decodeURIComponent(dec.split('|')[2]) };
        }
        catch (error) {
            if (("" + error).startsWith('URIError'))
                error = 'Unable to decode URI component. The URL may be invalid';
            return { url: str, error: error };
        }
    }
};
