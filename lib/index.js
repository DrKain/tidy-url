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
        this.silent = true;
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
    TidyCleaner.prototype.atob = function (data) {
        if (typeof atob === 'undefined') {
            this.log('atob not supported, using Buffer');
            return Buffer.from(data, 'base64').toString('binary');
        }
        else {
            return atob(data);
        }
    };
    Object.defineProperty(TidyCleaner.prototype, "expandedRules", {
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
            var pass = ['http:', 'https:'];
            var test = new URL(url);
            var prot = test.protocol.toLowerCase();
            if (pass.includes(prot) === false) {
                throw Error('Not acceptable protocol: ' + prot);
            }
            return true;
        }
        catch (error) {
            this.log("" + error);
            return false;
        }
    };
    /**
     * Rebuild to ensure trailing slashes or encoded characters match.
     * @param url Any URL
     */
    TidyCleaner.prototype.rebuild = function (url) {
        var original = new URL(url);
        var pathname = original.pathname;
        // if (original.href === original.origin + pathname) {
        //     pathname = '';
        // }
        return original.protocol + '//' + original.host + pathname + original.search + original.hash;
    };
    TidyCleaner.prototype.hasParams = function (url) {
        return new URL(url).searchParams.toString().length > 0;
    };
    TidyCleaner.prototype.isJSON = function (data) {
        try {
            JSON.parse(data);
            return true;
        }
        catch (error) {
            return false;
        }
    };
    TidyCleaner.prototype.getDiff = function (data, url) {
        return {
            is_new_host: new URL(url).host !== new URL(data.url).host,
            difference: url.length - data.url.length,
            reduction: +(100 - (data.url.length / url.length) * 100).toFixed(2)
        };
    };
    /**
     * Clean a URL
     * @param _url Any URL
     * @returns IData
     */
    TidyCleaner.prototype.clean = function (_url, allow_reclean) {
        if (allow_reclean === void 0) { allow_reclean = true; }
        // Default values
        var data = {
            url: _url,
            info: {
                original: _url,
                reduction: 0,
                difference: 0,
                replace: [],
                removed: [],
                match: [],
                decoded: null,
                is_new_host: false,
                full_clean: false
            }
        };
        // Make sure the URL is valid before we try to clean it
        if (!this.validate(_url)) {
            this.log('An invalid URL was supplied');
            return data;
        }
        // If there's no params, we can skip the rest of the process
        if (this.allow_amp && !this.hasParams(_url)) {
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
                to_remove = __spreadArray(__spreadArray([], to_remove), (rule.rules || []));
                data.info.replace = __spreadArray(__spreadArray([], data.info.replace), (rule.replace || []));
                data.info.match.push(rule);
            }
        }
        // Stop cleaninng if any exclude rule matches
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
        if (this.allow_amp && hasAmpRule === undefined) {
            data.url = data.info.original;
            return data;
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
        if (this.allow_redirects) {
            for (var _j = 0, _k = data.info.match; _j < _k.length; _j++) {
                var rule = _k[_j];
                if (rule.redirect.length && cleaner_ci.has(rule.redirect)) {
                    if (this.validate(cleaner_ci.get(rule.redirect))) {
                        data.url = "" + cleaner_ci.get(rule.redirect) + original.hash;
                        if (allow_reclean)
                            data.url = this.clean(data.url, false).url;
                    }
                }
            }
        }
        // De-amp the URL
        if (this.allow_amp === false) {
            for (var _l = 0, _m = data.info.match; _l < _m.length; _l++) {
                var rule = _m[_l];
                try {
                    // Ensure the amp rule matches
                    if (rule.amp && data.url.match(rule.amp)) {
                        // Reset the lastIndex
                        rule.amp.lastIndex = 0;
                        var result = rule.amp.exec(data.url);
                        if (result && result[1]) {
                            // If there is a result, replace the URL
                            var target = decodeURIComponent(result[1]);
                            if (!target.startsWith('https'))
                                target = 'https://' + target;
                            if (this.validate(target)) {
                                data.url = allow_reclean ? this.clean(target, false).url : target;
                                if (data.url.endsWith('%3Famp'))
                                    data.url = data.url.slice(0, -6);
                                if (data.url.endsWith('amp/'))
                                    data.url = data.url.slice(0, -4);
                            }
                        }
                    }
                }
                catch (error) {
                    this.log("" + error);
                }
            }
        }
        // Decode handler
        for (var _o = 0, _p = data.info.match; _o < _p.length; _o++) {
            var rule = _p[_o];
            try {
                if (!rule.decode)
                    continue;
                if (!cleaner.has(rule.decode.param))
                    continue;
                // These will always be clickjacking links, so use the allow_redirects rule
                if (!this.allow_redirects)
                    continue;
                // Decode the base64 string
                var decoded = this.atob(cleaner.get(rule.decode.param));
                var target = '';
                // If the response is JSON, decode and look for a key
                if (this.isJSON(decoded)) {
                    var json = JSON.parse(decoded);
                    target = json[rule.decode.lookFor];
                    // Add to the info response
                    data.info.decoded = json;
                }
                else {
                    // If the response is a string we can continue
                    target = decoded;
                }
                // If the key we want exists and is a valid url then update the data url
                if (target && this.validate(target)) {
                    data.url = "" + target + original.hash;
                }
            }
            catch (error) {
                this.log("" + error);
            }
        }
        // Handle empty hash / anchors
        if (_url.endsWith('#')) {
            data.url += '#';
            url += '#';
        }
        // Remove empty values when requested
        for (var _q = 0, _r = data.info.match; _q < _r.length; _q++) {
            var rule = _r[_q];
            if (rule.rev)
                data.url = data.url.replace(/=(?=&|$)/gm, '');
        }
        var diff = this.getDiff(data, url);
        data.info = Object.assign(data.info, diff);
        // If the link is longer then we have an issue
        if (data.info.reduction < 0) {
            this.log("Reduction is " + data.info.reduction + ". Please report this link on GitHub: " + $github + "/issues");
            data.url = data.info.original;
        }
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
