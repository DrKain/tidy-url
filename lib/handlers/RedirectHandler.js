"use strict";
// File: src/handlers/RedirectHandler.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedirectHandler = void 0;
var interfaces_1 = require("../interfaces");
var utils_1 = require("../utils");
var RedirectHandler = /** @class */ (function () {
    /**
     * Constructor for the RedirectHandler class.
     * Initializes the rules and configuration.
     * @param {IRule[]} rules - Array of rules to apply for redirection.
     * @param {TidyConfig} config - Configuration object.
     */
    function RedirectHandler(config) {
        this.config = config;
    }
    /**
     * Applies the redirection rules to the provided data.
     * If redirects are not allowed in the configuration, returns the data as is.
     * Otherwise, iterates over all rules and applies the first one that matches the URL and has a redirect.
     * @param {IData} data - The data to handle.
     * @returns {IData} - The possibly modified data.
     */
    RedirectHandler.prototype.handle = function (data) {
        if (!this.config.allowRedirects) {
            return data; // Early exit if redirects are not allowed
        }
        var url = new URL(data.url);
        var cleaner_ci = new URLSearchParams();
        url.searchParams.forEach(function (v, k) { return cleaner_ci.append(k.toLowerCase(), v); });
        for (var _i = 0, _a = data.info.match; _i < _a.length; _i++) {
            var rule = _a[_i];
            if (!rule.redirect)
                continue;
            if (this.matchRule(url, rule)) {
                var targetParam = cleaner_ci.get(rule.redirect.toLowerCase());
                if (!targetParam)
                    continue;
                var decodedUrl = (0, utils_1.decodeURL)(targetParam, interfaces_1.EEncoding.urlc);
                if ((0, utils_1.validateURL)(decodedUrl)) {
                    data.url = this.applyRedirect(decodedUrl);
                    break; // Stop after the first successful redirect
                }
            }
        }
        return data;
    };
    RedirectHandler.prototype.matchRule = function (url, rule) {
        var matchHost = rule.match_href ? url.href : url.host;
        return rule.match.test(matchHost);
    };
    RedirectHandler.prototype.applyRedirect = function (newUrl) {
        return newUrl; // Additional logic might be applied here if needed
    };
    return RedirectHandler;
}());
exports.RedirectHandler = RedirectHandler;
