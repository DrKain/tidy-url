"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clean = exports.TidyURL = exports.TidyCleaner = void 0;
var $github = 'https://github.com/DrKain/tidy-url';
var TidyCleaner = /** @class */ (function () {
    function TidyCleaner() {
        this.rules = [];
        this.silent = false;
        /**
         * There's a whole number of reasons why you don't want AMP links,
         * too many to fit in this description.
         * See this link for more info: https://redd.it/ehrq3z
         */
        this.allow_amp = false;
        /**
         * Used to auto-redirect to a different URL based on the parameter.
         * This is used to skip websites that track external links.
         */
        this.allow_redirects = true;
        // Load the rules
        try {
            this.rules = require('../data/rules.js');
        }
        catch (error) {
            this.log("" + error);
            this.rules = [];
        }
    }
    Object.defineProperty(TidyCleaner.prototype, "expandedRules", {
        get: function () {
            return this.rules.map(function (rule) {
                return Object.assign({
                    rules: [],
                    replace: [],
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
    TidyCleaner.prototype.log = function (str) {
        if (!this.silent)
            console.log(str);
    };
    /**
     * Determine if the input is a valid URL or not
     * @param url Any URL
     * @returns true/false
     */
    TidyCleaner.prototype.validate = function (url) {
        try {
            new URL(url);
            return true;
        }
        catch (error) {
            return false;
        }
    };
    TidyCleaner.prototype.rebuild = function (url) {
        var original = new URL(url);
        var params = original.searchParams;
        var param_str = params.toString().length ? '?' + params.toString() : '';
        return original.origin + original.pathname + param_str + original.hash;
    };
    /**
     * Clean a URL
     * @param _url Any URL
     * @returns IData
     */
    TidyCleaner.prototype.clean = function (_url) {
        // Rebuild to ensure trailing slashes or encoded characters match
        var url = this.rebuild(_url);
        // List of parmeters that will be deleted if found
        var to_remove = [];
        var data = {
            url: url,
            info: {
                original: url,
                reduction: 0,
                difference: 0,
                replace: [],
                removed: [],
                match: [],
                decoded: null,
                is_new_host: false
            }
        };
        // Make sure the URL is valid before we try to clean it
        if (!this.validate(url)) {
            this.log('An invalid URL was supplied');
            return data;
        }
        var original = new URL(url);
        var cleaner = original.searchParams;
        var cleaner_ci = new URLSearchParams();
        var pathname = original.pathname;
        // Case insensitive cleaner for the redirect rule
        cleaner.forEach(function (v, k) { return cleaner_ci.append(k.toLowerCase(), v); });
        // Loop through the rules and match them to the host name
        for (var _i = 0, _a = this.expandedRules; _i < _a.length; _i++) {
            var rule = _a[_i];
            rule.match.lastIndex = 0;
            if (rule.match.exec(original.host) !== null) {
                // Loop through the rules and add to to_remove
                to_remove = __spreadArray(__spreadArray([], to_remove), (rule.rules || []));
                data.info.replace = __spreadArray(__spreadArray([], data.info.replace), (rule.replace || []));
                data.info.match.push(rule);
            }
        }
        // Delete any matching parameters
        for (var _b = 0, to_remove_1 = to_remove; _b < to_remove_1.length; _b++) {
            var key = to_remove_1[_b];
            if (cleaner.has(key)) {
                data.info.removed.push({ key: key, value: cleaner.get(key) });
                cleaner.delete(key);
            }
        }
        // Update the pathname if needed
        for (var _c = 0, _d = data.info.replace; _c < _d.length; _c++) {
            var key = _d[_c];
            var changed = pathname.replace(key, '');
            if (changed !== pathname)
                pathname = changed;
        }
        // Rebuild URL
        var params = cleaner.toString().length ? '?' + cleaner.toString() : '';
        data.url = original.origin + pathname + params + original.hash;
        // Redirect if the redirect parameter exists
        if (this.allow_redirects) {
            for (var _e = 0, _f = data.info.match; _e < _f.length; _e++) {
                var rule = _f[_e];
                if (rule.redirect.length && cleaner_ci.has(rule.redirect)) {
                    data.url = "" + cleaner_ci.get(rule.redirect) + original.hash;
                }
            }
        }
        // De-amp the URL
        if (this.allow_amp === false) {
            for (var _g = 0, _h = data.info.match; _g < _h.length; _g++) {
                var rule = _h[_g];
                // Ensure the amp rule matches
                if (rule.amp && data.url.match(rule.amp)) {
                    // Reset the lastIndex
                    rule.amp.lastIndex = 0;
                    var result = rule.amp.exec(data.url);
                    // If there is a result, replace the URL
                    if (result && result[1]) {
                        data.url = result[1];
                        if (!data.url.startsWith('https'))
                            data.url = 'https://' + data.url;
                        if (data.url.endsWith('%3Famp'))
                            data.url = data.url.slice(0, -6);
                        if (data.url.endsWith('amp/'))
                            data.url = data.url.slice(0, -4);
                    }
                }
            }
        }
        // Decode handler
        for (var _j = 0, _k = this.expandedRules; _j < _k.length; _j++) {
            var rule = _k[_j];
            try {
                if (!rule.decode)
                    continue;
                if (!cleaner.has(rule.decode.param))
                    continue;
                // These will always be clickjacking links, so use the allow_redirects rule
                if (!this.allow_redirects)
                    continue;
                // Decode the base64 string and parse it as JSON
                var json = JSON.parse(atob(cleaner.get(rule.decode.param)));
                var target = json[rule.decode.lookFor];
                // If the key we want exists and is a valid url then update the data url
                if (target && this.validate(target)) {
                    data.url = "" + target + original.hash;
                }
                // Add to the info response
                data.info.decoded = json;
            }
            catch (error) {
                this.log("" + error);
            }
        }
        data.info.difference = url.length - data.url.length;
        data.info.reduction = +(100 - (data.url.length / url.length) * 100).toFixed(2);
        if (new URL(url).host !== new URL(data.url).host) {
            data.info.is_new_host = true;
        }
        // If the link is longer then we have an issue
        if (data.info.reduction < 0) {
            this.log("Reduction is " + data.info.reduction + ". Please report this link on GitHub: " + $github + "/issues");
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
