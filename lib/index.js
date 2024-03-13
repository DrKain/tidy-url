"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clean = exports.TidyURL = exports.TidyCleaner = void 0;
var utils_1 = require("./utils");
var interface_1 = require("./interface");
var handlers_1 = require("./handlers");
var config_1 = require("./config");
var $github = 'https://github.com/DrKain/tidy-url';
var TidyCleaner = /** @class */ (function () {
    function TidyCleaner() {
        this.rules = [];
        /**
         * Stores config options for this cleaner. If you would like to
         * use multiple configs simply create a new instance
         */
        this.config = new config_1.TidyConfig();
        /**
         * Contains all logged information from the last clean, even if `config.silent` was `true`.
         * This will be reset when a new URL is cleaned. This is for debugging and not to be relied upon
         */
        this.loglines = [];
        try {
            this.syncDeprecatedToConfig();
            // Load the rules
            this.rules = require('../data/rules.js');
        }
        catch (error) {
            // If this fails nothing can be cleaned
            this.log("" + error, 'error');
            this.rules = [];
        }
    }
    Object.defineProperty(TidyCleaner.prototype, "expandedRules", {
        /**
         * The full list of all rules with default value
         * that are not used in the main rules file to save space.
         */
        get: function () {
            return this.rules.map(function (rule) {
                return Object.assign({
                    rules: [],
                    replace: [],
                    exclude: [],
                    redirect: '',
                    amp: null,
                    decode: null
                }, rule);
            });
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Only log to the console if debug is enabled
     * @param str Message
     */
    TidyCleaner.prototype.log = function (str, type) {
        this.loglines.push({ type: type, message: str });
        if (!this.config.silent)
            console.log("[" + type + "] " + str);
    };
    /**
     * Rebuild to ensure trailing slashes or encoded characters match.
     * @param url Any URL
     */
    TidyCleaner.prototype.rebuild = function (url) {
        var original = new URL(url);
        return original.protocol + '//' + original.host + original.pathname + original.search + original.hash;
    };
    /**
     * This lets users know when they are using the deprecated variables that will
     * be removed in a few updates.
     */
    TidyCleaner.prototype.syncDeprecatedToConfig = function () {
        var c = this.config;
        if (this.allow_amp !== undefined) {
            this.config.allowAMP = this.allow_amp;
            this.log('DEPRECATED: Please use `config.allowAMP` instead of `allow_amp`', 'warn');
        }
        if (this.allow_redirects !== undefined) {
            this.config.allowRedirects = this.allow_redirects;
            this.log('DEPRECATED: Please use `config.allowRedirects` instead of `allow_redirects`', 'warn');
        }
        if (this.allow_custom_handlers !== undefined) {
            this.config.allowCustomHandlers = this.allow_custom_handlers;
            this.log('DEPRECATED: Please use `config.allowCustomHandlers` instead of `allow_custom_handlers`', 'warn');
        }
        if (this.silent !== undefined) {
            this.config.silent = this.silent;
            this.log('DEPRECATED: Please use `config.silent` instead of `silent`', 'warn');
        }
    };
    /** @deprecated Import `validateURL` instead */
    TidyCleaner.prototype.validate = function (url) {
        return utils_1.validateURL(url);
    };
    /**
     * Clean a URL
     * @param _url Any URL
     * @returns IData
     */
    TidyCleaner.prototype.clean = function (_url, allowReclean) {
        var _a;
        if (allowReclean === void 0) { allowReclean = true; }
        if (!allowReclean)
            this.loglines = [];
        this.syncDeprecatedToConfig();
        // Default values
        var data = {
            url: _url,
            info: {
                original: _url,
                reduction: 0,
                difference: 0,
                replace: [],
                removed: [],
                handler: null,
                match: [],
                decoded: null,
                is_new_host: false,
                isNewHost: false,
                full_clean: false,
                fullClean: false
            }
        };
        // Make sure the URL is valid before we try to clean it
        if (!utils_1.validateURL(_url)) {
            if (_url !== 'undefined' && _url.length > 0) {
                this.log('Invalid URL: ' + _url, 'error');
            }
            return data;
        }
        // If there's no params, we can skip the rest of the process
        if (this.config.allowAMP && utils_1.urlHasParams(_url) === false) {
            data.url = data.info.original;
            return data;
        }
        // Rebuild to ensure trailing slashes or encoded characters match
        var url = this.rebuild(_url);
        data.url = url;
        // List of parmeters that will be deleted if found
        var to_remove = [];
        var original = new URL(url);
        var cleaner = original.searchParams;
        var cleaner_ci = new URLSearchParams();
        var pathname = original.pathname;
        // Case insensitive cleaner for the redirect rule
        cleaner.forEach(function (v, k) { return cleaner_ci.append(k.toLowerCase(), v); });
        // Loop through the rules and match them to the host name
        for (var _i = 0, _b = this.expandedRules; _i < _b.length; _i++) {
            var rule = _b[_i];
            // Match the host or the full URL
            var match_s = original.host;
            if (rule.match_href === true)
                match_s = original.href;
            // Reset lastIndex
            rule.match.lastIndex = 0;
            if (rule.match.exec(match_s) !== null) {
                // Loop through the rules and add to to_remove
                to_remove = __spreadArray(__spreadArray([], to_remove), (rule.rules || []));
                data.info.replace = __spreadArray(__spreadArray([], data.info.replace), (rule.replace || []));
                data.info.match.push(rule);
            }
        }
        // Stop cleaning if any exclude rule matches
        var ex_pass = true;
        for (var _c = 0, _d = data.info.match; _c < _d.length; _c++) {
            var rule = _d[_c];
            for (var _e = 0, _f = rule.exclude; _e < _f.length; _e++) {
                var reg = _f[_e];
                reg.lastIndex = 0;
                if (reg.exec(url) !== null)
                    ex_pass = false;
            }
        }
        if (!ex_pass) {
            data.url = data.info.original;
            return data;
        }
        // Check if the match has any amp rules, if not we can redirect
        var hasAmpRule = data.info.match.find(function (item) { return item.amp; });
        if (this.config.allowAMP === true && hasAmpRule === undefined) {
            // Make sure there are no parameters before resetting
            if (!utils_1.urlHasParams(url)) {
                data.url = data.info.original;
                return data;
            }
        }
        // Delete any matching parameters
        for (var _g = 0, to_remove_1 = to_remove; _g < to_remove_1.length; _g++) {
            var key = to_remove_1[_g];
            if (cleaner.has(key)) {
                data.info.removed.push({ key: key, value: cleaner.get(key) });
                cleaner.delete(key);
            }
        }
        // Update the pathname if needed
        for (var _h = 0, _j = data.info.replace; _h < _j.length; _h++) {
            var key = _j[_h];
            var changed = pathname.replace(key, '');
            if (changed !== pathname)
                pathname = changed;
        }
        // Rebuild URL
        data.url = original.protocol + '//' + original.host + pathname + original.search + original.hash;
        // Redirect if the redirect parameter exists
        if (this.config.allowRedirects) {
            for (var _k = 0, _l = data.info.match; _k < _l.length; _k++) {
                var rule = _l[_k];
                if (!rule.redirect)
                    continue;
                var target = rule.redirect;
                var value = cleaner_ci.get(target);
                // Sometimes the parameter is encoded
                var isEncoded = utils_1.decodeURL(value, interface_1.EEncoding.urlc);
                if (isEncoded !== value && utils_1.validateURL(isEncoded))
                    value = isEncoded;
                if (target.length && cleaner_ci.has(target)) {
                    if (utils_1.validateURL(value)) {
                        data.url = "" + value + original.hash;
                        if (allowReclean)
                            data.url = this.clean(data.url, false).url;
                    }
                    else {
                        this.log('Failed to redirect: ' + value, 'error');
                    }
                }
            }
        }
        // De-amp the URL
        if (this.config.allowAMP === false) {
            for (var _m = 0, _o = data.info.match; _m < _o.length; _m++) {
                var rule = _o[_m];
                try {
                    // Ensure at least one rule exists
                    if (rule.amp && (rule.amp.regex || rule.amp.replace)) {
                        // Handle replacing text in the URL
                        if (rule.amp.replace) {
                            data.info.handler = rule.name;
                            this.log('AMP Replace: ' + rule.amp.replace.text, 'info');
                            var toReplace = rule.amp.replace.text;
                            var toReplaceWith = (_a = rule.amp.replace.with) !== null && _a !== void 0 ? _a : '';
                            data.url = data.url.replace(toReplace, toReplaceWith);
                        }
                        // Use RegEx capture groups
                        if (rule.amp.regex && data.url.match(rule.amp.regex)) {
                            data.info.handler = rule.name;
                            this.log('AMP RegEx: ' + rule.amp.regex, 'info');
                            rule.amp.regex.lastIndex = 0;
                            var result = rule.amp.regex.exec(data.url);
                            // If there is a result, replace the URL
                            if (result && result[1]) {
                                var target = decodeURIComponent(result[1]);
                                // Add the protocol when it's missing
                                if (!target.startsWith('https'))
                                    target = 'https://' + target;
                                // Valiate the URL to make sure it's still good
                                if (utils_1.validateURL(target)) {
                                    // Sometimes the result is another domain that has its own tracking parameters
                                    // So a re-clean can be useful.
                                    data.url = allowReclean ? this.clean(target, false).url : target;
                                }
                            }
                            else {
                                this.log('AMP RegEx failed to get a result for ' + rule.name, 'error');
                            }
                        }
                        // TODO: Apply to existing rules
                        if (rule.amp.sliceTrailing) {
                            if (data.url.endsWith(rule.amp.sliceTrailing)) {
                                data.url = data.url.slice(0, -rule.amp.sliceTrailing.length);
                            }
                        }
                        // Remove trailing amp/ or /amp
                        if (data.url.endsWith('%3Famp'))
                            data.url = data.url.slice(0, -6);
                        if (data.url.endsWith('amp/'))
                            data.url = data.url.slice(0, -4);
                    }
                }
                catch (error) {
                    this.log("" + error, 'error');
                }
            }
        }
        // Decode handler
        for (var _p = 0, _q = data.info.match; _p < _q.length; _p++) {
            var rule = _q[_p];
            try {
                if (!rule.decode)
                    continue;
                // Make sure the target parameter exists
                if (!cleaner.has(rule.decode.param) && rule.decode.targetPath !== true)
                    continue;
                // These will almost always be clickjacking links, so use the allowRedirects rule if enabled
                if (!this.config.allowRedirects)
                    continue;
                // Decode the string using selected encoding
                var encoding = rule.decode.encoding || 'base64';
                // Sometimes the website path is what we need to decode
                var lastPath = pathname.split('/').pop();
                // This will be null if the param doesn't exist
                var param = cleaner.get(rule.decode.param);
                // Use a default string
                var encodedString = '';
                if (lastPath === undefined)
                    lastPath = '';
                // Decide what we are decoding
                if (param === null)
                    encodedString = lastPath;
                else if (param)
                    encodedString = param;
                else
                    continue;
                if (typeof encodedString !== 'string') {
                    this.log("Expected " + encodedString + " to be a string", 'error');
                    continue;
                }
                var decoded = utils_1.decodeURL(encodedString, encoding);
                var target = '';
                var recleanData = null;
                // If the response is JSON, decode and look for a key
                if (utils_1.isJSON(decoded)) {
                    var json = JSON.parse(decoded);
                    target = json[rule.decode.lookFor];
                    // Add to the info response
                    data.info.decoded = json;
                }
                else if (this.config.allowCustomHandlers === true && rule.decode.handler) {
                    // Run custom URL handlers for websites
                    var handler = handlers_1.handlers[rule.decode.handler];
                    if (typeof handler === 'undefined') {
                        this.log('Handler was not found for ' + rule.decode.handler, 'error');
                    }
                    if (rule.decode.handler && handler) {
                        data.info.handler = rule.decode.handler;
                        // Pass the handler a bunch of information it can use
                        var result = handler.exec(data.url, {
                            decoded: decoded,
                            lastPath: lastPath,
                            urlParams: new URL(data.url).searchParams,
                            fullPath: pathname,
                            originalURL: data.url
                        });
                        // If the handler threw an error or the URL is invalid
                        if (result.error || utils_1.validateURL(result.url) === false) {
                            if (result.url !== 'undefined')
                                this.log(result.error, 'error');
                        }
                        // result.url will always by the original URL when an error is thrown
                        recleanData = result.url;
                    }
                }
                else {
                    // If the response is a string we can continue
                    target = decoded;
                }
                // Re-clean the URL after handler result
                target = allowReclean ? this.clean(recleanData !== null && recleanData !== void 0 ? recleanData : target, false).url : recleanData !== null && recleanData !== void 0 ? recleanData : target;
                // If the key we want exists and is a valid url then update the data url
                if (target && target !== '' && utils_1.validateURL(target)) {
                    data.url = "" + target + original.hash;
                }
            }
            catch (error) {
                this.log("" + error, 'error');
            }
        }
        // Handle empty hash / anchors
        if (_url.endsWith('#')) {
            data.url += '#';
            url += '#';
        }
        // Remove empty values when requested
        for (var _r = 0, _s = data.info.match; _r < _s.length; _r++) {
            var rule = _s[_r];
            if (rule.rev)
                data.url = data.url.replace(/=(?=&|$)/gm, '');
        }
        var diff = utils_1.getLinkDiff(data.url, url);
        data.info = Object.assign(data.info, diff);
        // If the link is longer then we have an issue
        if (data.info.reduction < 0) {
            this.log("Reduction is " + data.info.reduction + ". Please report this link on GitHub: " + $github + "/issues", 'error');
            data.url = data.info.original;
        }
        data.info.fullClean = true;
        data.info.full_clean = true;
        // Reset the original URL if there is no change, just to be safe
        if (data.info.difference === 0 && data.info.reduction === 0) {
            data.url = data.info.original;
        }
        return data;
    };
    return TidyCleaner;
}());
exports.TidyCleaner = TidyCleaner;
exports.TidyURL = new TidyCleaner();
var clean = function (url) { return exports.TidyURL.clean(url); };
exports.clean = clean;
