"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlers = void 0;
var utils_1 = require("./utils");
/**
 * This is currently experimental while I decide on how I want to restructure the main code to make it easier to follow.
 * There will need to be handlers for each process of the "clean" as well as these custom cases for sites that mix it up.
 * If you would like to help or give your thoughts feel free to open an issue on GitHub.
 */
exports.handlers = {};
exports.handlers['patchbot.io'] = {
    exec: function (_str, args) {
        try {
            var dec = args.decoded.replace(/%3D/g, '=');
            return { url: decodeURIComponent(dec.split('|')[2]) };
        }
        catch (error) {
            if (("" + error).startsWith('URIError'))
                error = new Error('Unable to decode URI component. The URL may be invalid');
            return { url: args.originalURL, error: error };
        }
    }
};
exports.handlers['urldefense.proofpoint.com'] = {
    exec: function (_str, args) {
        try {
            var arg = args.urlParams.get('u');
            if (arg === null)
                throw new Error('Target parameter (u) was null');
            var url = decodeURIComponent(arg.replace(/-/g, '%')).replace(/_/g, '/').replace(/%2F/g, '/');
            return { url: url };
        }
        catch (error) {
            return { url: args.originalURL, error: error };
        }
    }
};
exports.handlers['stardockentertainment.info'] = {
    exec: function (str, args) {
        try {
            var target = str.split('/').pop();
            var url = '';
            if (typeof target == 'undefined')
                throw new Error('Undefined target');
            url = utils_1.decodeBase64(target);
            return { url: url };
        }
        catch (error) {
            return { url: args.originalURL, error: error };
        }
    }
};
exports.handlers['0yxjo.mjt.lu'] = {
    exec: function (str, args) {
        try {
            var target = str.split('/').pop();
            var url = '';
            if (typeof target == 'undefined')
                throw new Error('Undefined target');
            url = utils_1.decodeBase64(target);
            return { url: url };
        }
        catch (error) {
            return { url: args.originalURL, error: error };
        }
    }
};
exports.handlers['click.redditmail.com'] = {
    exec: function (str, args) {
        try {
            var reg = /https:\/\/click\.redditmail\.com\/CL0\/(.*?)\//gi;
            var matches = utils_1.regexExtract(reg, str);
            if (typeof matches[1] === 'undefined')
                throw new Error('regexExtract failed to find a URL');
            var url = decodeURIComponent(matches[1]);
            return { url: url };
        }
        catch (error) {
            return { url: args.originalURL, error: error };
        }
    }
};
exports.handlers['deals.dominos.co.nz'] = {
    exec: function (str, args) {
        try {
            var target = str.split('/').pop();
            var url = '';
            if (!target)
                throw new Error('Missing target');
            url = utils_1.decodeBase64(target);
            return { url: url };
        }
        catch (error) {
            return { url: args.originalURL, error: error };
        }
    }
};
