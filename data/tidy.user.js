// ==UserScript==
// @name         Tidy URL
// @namespace    https://ksir.pw
// @version      1.1.9
// @description  Cleans/removes garbage or tracking parameters from URLs
// @author       Kain (ksir.pw)
// @include      *
// @icon         data:image/gif;base64,R0lGODlhEAAQAMIDAAAAAIAAAP8AAP///////////////////yH5BAEKAAQALAAAAAAQABAAAAMuSLrc/jA+QBUFM2iqA2ZAMAiCNpafFZAs64Fr66aqjGbtC4WkHoU+SUVCLBohCQA7
// @updateURL    https://github.com/DrKain/tidy-url/raw/main/data/tidy.user.js
// @downloadURL  https://github.com/DrKain/tidy-url/raw/main/data/tidy.user.js
// @require      https://github.com/DrKain/tidy-url/raw/main/data/rules.js
// @grant        none
// @run-at       document-start
// ==/UserScript==

// S:AG

var TidyCleaner = /** @class */ (function () {
    function TidyCleaner() {
        this.rules = [];
        this.silent = false;
        // Load the rules
        try {
            if (typeof $kurlc_rules === 'udefined') console.error('[TidyURL] Failed to load rules.js - Script will not work');
            else this.rules = $kurlc_rules;
        } catch (error) {
            this.log('' + error);
            this.rules = [];
        }
    }
    Object.defineProperty(TidyCleaner.prototype, 'expandedRules', {
        get: function () {
            return this.rules.map(function (rule) {
                return Object.assign({ rules: [], replace: [], redirect: '' }, rule);
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
        if (!this.silent) console.log(str);
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
        } catch (error) {
            return false;
        }
    };
    /**
     * Clean a URL
     * @param url Any URL
     * @returns IData
     */
    TidyCleaner.prototype.clean = function (url) {
        var data = {
            url: url,
            info: {
                original: url,
                reduction: 0,
                replace: [],
                remove: [],
                match: [],
                redirect: ''
            }
        };
        // Make sure the URL is valid before we try to clean it
        if (!this.validate(url)) {
            this.log('An invalid URL was supplied');
            return data;
        }
        var original = new URL(url);
        var cleaner = original.searchParams;
        var pathname = original.pathname;
        // Loop through the rules and match them to the host name
        for (var _i = 0, _a = this.expandedRules; _i < _a.length; _i++) {
            var rule = _a[_i];
            if (rule.match.exec(original.host) !== null) {
                data.info.remove = [...data.info.remove, ...rule.rules];
                data.info.replace = [...data.info.replace, ...rule.replace];
                data.info.match.push(rule);
            }
        }
        // Delete any matching parameters
        for (var _b = 0, _c = data.info.remove; _b < _c.length; _b++) {
            var key = _c[_b];
            if (cleaner.has(key)) cleaner.delete(key);
        }
        // Update the pathname if needed
        for (var _d = 0, _e = data.info.replace; _d < _e.length; _d++) {
            var key = _e[_d];
            var changed = pathname.replace(key, '');
            if (changed !== pathname) pathname = changed;
        }
        // Rebuild URL
        var params = cleaner.toString().length ? '?' + cleaner.toString() : '';
        data.url = original.origin + pathname + params + original.hash;
        // Redirect if needed
        for (var _f = 0, _g = data.info.match; _f < _g.length; _f++) {
            var rule = _g[_f];
            if (rule.redirect.length && cleaner.has(rule.redirect)) {
                data.url = '' + cleaner.get(rule.redirect) + original.hash;
            }
        }
        data.info.reduction = +(100 - (data.url.length / url.length) * 100).toFixed(2);
        // If the link is longer then we have an issue
        if (data.info.reduction < 0) {
            this.log(`Reduction is ${data.info.reduction}. Please report this link on GitHub`);
            data.url = data.info.original;
        }
        return data;
    };
    return TidyCleaner;
})();

// E:AG

var tidy = new TidyCleaner();
var link = tidy.clean(window.location.href);

if (link.url !== link.info.original) window.history.pushState('', '', link.url);
