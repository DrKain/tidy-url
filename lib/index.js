"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TidyURL = void 0;
var TidyCleaner = /** @class */ (function () {
    function TidyCleaner() {
        this.rules = [];
        this.debug = false;
        // Load the rules
        try {
            this.rules = require('../data/rules.js');
        }
        catch (error) {
            this.log("" + error);
            this.rules = [];
        }
    }
    /**
     * Only log to the console if debug is enabled
     * @param str Message
     */
    TidyCleaner.prototype.log = function (str) {
        if (this.debug)
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
    /**
     * Clean a URL
     * @param url Any URL
     * @returns String
     */
    TidyCleaner.prototype.clean = function (url) {
        var queue = [];
        var replace = [];
        var modified = 0;
        var deleted = [];
        // Make sure the URL is valid before we try to clean it
        if (!this.validate(url)) {
            this.log('An invalid URL was supplied');
            return url;
        }
        var original = new URL(url);
        var cleaner = original.searchParams;
        var pathname = original.pathname;
        this.log("Target: " + url + "\nOrigin: " + original.origin);
        // Loop through the rules and match them to the host name
        for (var _i = 0, _a = this.rules; _i < _a.length; _i++) {
            var rule = _a[_i];
            if (rule.match.exec(original.host) !== null) {
                this.log("Matched " + rule.name + " (" + rule.match + ")");
                queue = __spreadArray(__spreadArray([], queue), rule.rules);
                replace = __spreadArray(__spreadArray([], replace), rule.replace);
            }
        }
        // Delete any matches in the queue
        for (var _b = 0, queue_1 = queue; _b < queue_1.length; _b++) {
            var key = queue_1[_b];
            if (cleaner.has(key)) {
                deleted.push(key);
                cleaner.delete(key);
                modified++;
            }
        }
        this.log("Deleted " + deleted.length + " items: " + deleted.join(' '));
        // Update the pathname if needed
        for (var _c = 0, replace_1 = replace; _c < replace_1.length; _c++) {
            var key = replace_1[_c];
            var changed = pathname.replace(key, '');
            if (changed !== pathname) {
                this.log("Pathname changed: " + pathname + " -> " + changed);
                pathname = changed;
            }
        }
        // Build final URL
        var params = cleaner.toString().length ? '?' + cleaner.toString() : '';
        var final = original.origin + pathname + params;
        this.log("Final: " + final);
        return final;
    };
    return TidyCleaner;
}());
exports.TidyURL = new TidyCleaner();
