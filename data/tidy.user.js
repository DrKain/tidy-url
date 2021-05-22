// ==UserScript==
// @name         Tidy URL
// @namespace    https://ksir.pw
// @version      1.0.1
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

const cleaner = new URLSearchParams(window.location.search);
const host = window.location.hostname;
let pathname = window.location.pathname;
let modified = 0;
let queue = [];
let replace = [];
let kurlc = [];

if (typeof $kurlc_rules === 'udefined') console.error('[TidyURL] Failed to load rules.js - Script will not work');
else kurlc = $kurlc_rules;

for (let rule of kurlc) {
    if (rule.match.exec(host) !== null) {
        queue = [...queue, ...rule.rules];
        replace = [...replace, ...rule.replace];
    }
}

for (let key of queue) {
    if (cleaner.has(key)) {
        cleaner.delete(key);
        modified++;
    }
}

for (let key of replace) {
    const changed = pathname.replace(key, '');
    if (changed !== pathname) pathname = changed;
}

if (modified > 0) {
    const params = cleaner.toString().length ? '?' + cleaner.toString() : '';
    window.location = window.location = window.location.origin + pathname + params;
}
