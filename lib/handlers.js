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
            var dec = args[0].replace(/%3D/g, '=');
            return { url: decodeURIComponent(dec.split('|')[2]) };
        }
        catch (error) {
            if (("" + error).startsWith('URIError'))
                error = 'Unable to decode URI component. The URL may be invalid';
            return { url: str, error: error };
        }
    }
};
exports.handlers['stardockentertainment.info'] = {
    exec: function (str) {
        try {
            var target = str.split('/').pop();
            var url = '';
            if (typeof target == 'undefined')
                throw Error('Undefined target');
            if (typeof atob === 'undefined') {
                url = Buffer.from(target, 'base64').toString('binary');
            }
            else {
                url = atob(target);
            }
            return { url: url };
        }
        catch (error) {
            return { url: str, error: error };
        }
    }
};
exports.handlers['0yxjo.mjt.lu'] = {
    exec: function (str) {
        try {
            var target = str.split('/').pop();
            var url = '';
            if (typeof target == 'undefined')
                throw Error('Undefined target');
            if (typeof atob === 'undefined') {
                url = Buffer.from(target, 'base64').toString('binary');
            }
            else {
                url = atob(target);
            }
            return { url: url };
        }
        catch (error) {
            return { url: str, error: error };
        }
    }
};
exports.handlers['click.redditmail.com'] = {
    exec: function (str) {
        try {
            var reg = /https:\/\/click\.redditmail\.com\/CL0\//gi;
            var url = decodeURIComponent(str.replace(reg, ''));
            new URL(url);
            return { url: url };
        }
        catch (error) {
            return { url: str, error: error };
        }
    }
};
