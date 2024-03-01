"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TidyConfig = void 0;
var TidyConfig = /** @class */ (function () {
    function TidyConfig() {
        this.allowAMP = false;
        this.allowCustomHandlers = true;
        this.allowRedirects = true;
        this.silent = true;
    }
    /**
     * Fetch a copy of the current config.
     * You can then pass this to `setMany` if
     * you want to sync with another TidyConfig instance.
     *
     * @returns A copy of the current config
     */
    TidyConfig.prototype.copy = function () {
        return {
            allowAMP: this.allowAMP,
            allowCustomHandlers: this.allowCustomHandlers,
            allowRedirects: this.allowRedirects,
            silent: this.silent
        };
    };
    /**
     * You can just use `config.key` but yeah.
     * @param key The key you're wanting to get the value of
     * @returns The value
     */
    TidyConfig.prototype.get = function (key) {
        return this[key];
    };
    /**
     * Set a single config option. If you want to set multiple at once
     * use `setMany`
     * @param key Option to set
     * @param value Value to set it to
     */
    TidyConfig.prototype.set = function (key, value) {
        this[key] = value;
    };
    /**
     * Set multiple config options at once by passing it an object.
     * @param obj An object containing any number of config options
     */
    TidyConfig.prototype.setMany = function (obj) {
        var _this = this;
        Object.keys(obj).forEach(function (_key) {
            var _a;
            var key = _key;
            var val = (_a = obj[key]) !== null && _a !== void 0 ? _a : _this[key];
            if (typeof _this[key] === 'undefined') {
                throw new Error("Config error: " + key + " is a valid config key");
            }
            _this.set(key, val);
        });
    };
    return TidyConfig;
}());
exports.TidyConfig = TidyConfig;
