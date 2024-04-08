"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clean = exports.TidyURL = exports.TidyCleaner = void 0;
var utils_1 = require("./utils");
var handlers_1 = require("./handlers");
var TidyConfig_1 = require("./config/TidyConfig");
var index_1 = require("./handlers/index");
var $github = 'https://github.com/DrKain/tidy-url';
var TidyCleaner = /** @class */ (function () {
    function TidyCleaner() {
        this.rules = [];
        this.redirectHandler = new index_1.RedirectHandler(new TidyConfig_1.TidyConfig());
        this.ampHandler = new index_1.AmpHandler([], this.reapplyClean.bind(this));
        /**
         * Stores config options for this cleaner. If you would like to
         * use multiple configs simply create a new instance
         */
        this.config = new TidyConfig_1.TidyConfig();
        /**
         * Contains all logged information from the last clean, even if `config.silent` was `true`.
         * This will be reset when a new URL is cleaned. This is for debugging and not to be relied upon
         */
        this.loglines = [];
        try {
            this.syncDeprecatedToConfig();
            // Load the rules
            this.rules = require('../data/rules.js');
            this.redirectHandler = new index_1.RedirectHandler(this.config);
        }
        catch (error) {
            // If this fails nothing can be cleaned
            this.log("".concat(error), 'error');
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
            console.log("[".concat(type, "] ").concat(str));
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
        return (0, utils_1.validateURL)(url);
    };
    TidyCleaner.prototype.createInitialDataObject = function (url) {
        return {
            url: url,
            info: {
                original: url,
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
    };
    /**
     * Clean a URL
     * @param _url Any URL
     * @returns IData
     */
    TidyCleaner.prototype.clean = function (_url, allowReclean) {
        if (allowReclean === void 0) { allowReclean = true; }
        if (!allowReclean)
            this.loglines = [];
        this.syncDeprecatedToConfig();
        // Default values
        var data = this.createInitialDataObject(_url);
        // Make sure the URL is valid before we try to clean it
        if (!(0, utils_1.validateURL)(_url)) {
            if (_url !== 'undefined' && _url.length > 0) {
                this.log('Invalid URL: ' + _url, 'error');
            }
            return data;
        }
        // If there's no params, we can skip the rest of the process
        if (this.config.allowAMP && (0, utils_1.urlHasParams)(_url) === false) {
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
        for (var _i = 0, _a = this.expandedRules; _i < _a.length; _i++) {
            var rule = _a[_i];
            // Match the host or the full URL
            var match_s = original.host;
            if (rule.match_href === true)
                match_s = original.href;
            // Reset lastIndex
            rule.match.lastIndex = 0;
            if (rule.match.exec(match_s) !== null) {
                // Loop through the rules and add to to_remove
                to_remove = __spreadArray(__spreadArray([], to_remove, true), (rule.rules || []), true);
                data.info.replace = __spreadArray(__spreadArray([], data.info.replace, true), (rule.replace || []), true);
                data.info.match.push(rule);
            }
        }
        // Stop cleaning if any exclude rule matches
        var ex_pass = true;
        for (var _b = 0, _c = data.info.match; _b < _c.length; _b++) {
            var rule = _c[_b];
            for (var _d = 0, _e = rule.exclude; _d < _e.length; _d++) {
                var reg = _e[_d];
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
            if (!(0, utils_1.urlHasParams)(url)) {
                data.url = data.info.original;
                return data;
            }
        }
        // Delete any matching parameters
        for (var _f = 0, to_remove_1 = to_remove; _f < to_remove_1.length; _f++) {
            var key = to_remove_1[_f];
            if (cleaner.has(key)) {
                data.info.removed.push({ key: key, value: cleaner.get(key) });
                cleaner.delete(key);
            }
        }
        // Update the pathname if needed
        for (var _g = 0, _h = data.info.replace; _g < _h.length; _g++) {
            var key = _h[_g];
            var changed = pathname.replace(key, '');
            if (changed !== pathname)
                pathname = changed;
        }
        // Rebuild URL
        data.url = original.protocol + '//' + original.host + pathname + original.search + original.hash;
        // Redirect if the redirect parameter exists
        data = this.redirectHandler.handle(data);
        // Instantiate and utilize the AmpHandler class to handle AMP URLs based on provided rules.
        if (this.config.allowAMP === false) {
            this.ampHandler = new index_1.AmpHandler(this.rules, this.reapplyClean.bind(this));
            data = this.ampHandler.handle(data);
        }
        // Decode handler
        for (var _j = 0, _k = data.info.match; _j < _k.length; _j++) {
            var rule = _k[_j];
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
                    this.log("Expected ".concat(encodedString, " to be a string"), 'error');
                    continue;
                }
                var decoded = (0, utils_1.decodeURL)(encodedString, encoding);
                var target = '';
                var recleanData = null;
                // If the response is JSON, decode and look for a key
                if ((0, utils_1.isJSON)(decoded)) {
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
                        if (result.error || (0, utils_1.validateURL)(result.url) === false) {
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
                if (target && target !== '' && (0, utils_1.validateURL)(target)) {
                    data.url = "".concat(target) + original.hash;
                }
            }
            catch (error) {
                this.log("".concat(error), 'error');
            }
        }
        // Handle empty hash / anchors
        if (_url.endsWith('#')) {
            data.url += '#';
            url += '#';
        }
        // Remove empty values when requested
        for (var _l = 0, _m = data.info.match; _l < _m.length; _l++) {
            var rule = _m[_l];
            if (rule.rev)
                data.url = data.url.replace(/=(?=&|$)/gm, '');
        }
        var diff = (0, utils_1.getLinkDiff)(data.url, url);
        data.info = Object.assign(data.info, diff);
        // If the link is longer then we have an issue
        if (data.info.reduction < 0) {
            this.log("Reduction is ".concat(data.info.reduction, ". Please report this link on GitHub: ").concat($github, "/issues"), 'error');
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
    TidyCleaner.prototype.reapplyClean = function (url, allowReclean) {
        if (allowReclean === void 0) { allowReclean = true; }
        var data = this.clean(url, allowReclean);
        return data.url;
    };
    return TidyCleaner;
}());
exports.TidyCleaner = TidyCleaner;
exports.TidyURL = new TidyCleaner();
var clean = function (url) { return exports.TidyURL.clean(url); };
exports.clean = clean;
