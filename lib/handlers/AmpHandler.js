"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmpHandler = void 0;
var utils_1 = require("../utils");
/**
 * Class AmpHandler handles AMP URLs based on provided rules.
 */
var AmpHandler = /** @class */ (function () {
    /**
    * Constructor initializes the rules and reapplyClean function.
    * Only considers rules that have an 'amp' property.
    * @param {IRule[]} rules - Array of rules to apply.
    * @param {(url: string,allowReclean: boolean ) => string} reapplyClean - Function to reapply cleaning.
    */
    function AmpHandler(rules, reapplyClean) {
        this.rules = rules.filter(function (rule) { return rule.amp; }); // Only consider rules that have an 'amp' property
        this.reapplyClean = reapplyClean;
    }
    /**
     * Applies the AMP handling rules to the provided data.
     * Iterates over all rules that have an 'amp' property and applies them to the data's URL.
     * @param {IData} data - The data to handle.
     * @param {boolean} allowReclean - Whether to allow re-cleaning of the URL.
     * @returns {IData} - The possibly modified data.
     */
    AmpHandler.prototype.handle = function (data, allowReclean) {
        var _this = this;
        if (allowReclean === void 0) { allowReclean = true; }
        data.info.match.filter(function (rule) { return rule.amp; }).forEach(function (rule) {
            var _a;
            try {
                // Handle replacing text in the URL
                if (rule.amp.replace) {
                    var toReplace = rule.amp.replace.text;
                    var toReplaceWith = (_a = rule.amp.replace.with) !== null && _a !== void 0 ? _a : '';
                    data.url = data.url.replace(toReplace, toReplaceWith);
                    data.info.handler = rule.name;
                }
                // Use RegEx capture groups to further modify the URL
                if (rule.amp.regex && new RegExp(rule.amp.regex).test(data.url)) {
                    var regex = new RegExp(rule.amp.regex);
                    var result = regex.exec(data.url);
                    if (result && result[1]) {
                        var target = decodeURIComponent(result[1]);
                        if (!target.startsWith('https'))
                            target = 'https://' + target;
                        if ((0, utils_1.validateURL)(target)) {
                            data.url = allowReclean ? _this.reapplyClean(target, false) : target;
                        }
                    }
                }
                // Handle slicing off specific trailing parts identified in the rule
                if (rule.amp.sliceTrailing && data.url.endsWith(rule.amp.sliceTrailing)) {
                    data.url = data.url.slice(0, -rule.amp.sliceTrailing.length);
                }
                // Remove known AMP path segments
                if (data.url.includes('/amp') || data.url.includes('amp/')) {
                    data.url = data.url.replace('/amp', '').replace('amp/', '');
                }
            }
            catch (error) {
                console.error("AMP Handling Error: ".concat(error));
            }
        });
        return data;
    };
    return AmpHandler;
}());
exports.AmpHandler = AmpHandler;
