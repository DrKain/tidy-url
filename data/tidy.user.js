// ==UserScript==
// @name         Tidy URL
// @namespace    https://ksir.pw
// @version      1.0.6
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
let replace = [];
let deleted = [];
let queue = [];
let kurlc = [];

if (typeof $kurlc_rules === 'udefined') console.error('[TidyURL] Failed to load rules.js - Script will not work');
else kurlc = $kurlc_rules;

console.log(`Target: ${window.location.href}\nOrigin: ${original.origin}`);

for (let rule of kurlc) {
    if (rule.match.exec(host) !== null) {
        console.log(`Matched ${rule.name} (${rule.match})`);
        queue = [...queue, ...rule.rules];
        replace = [...replace, ...rule.replace];
    }
}

for (let key of queue) {
    if (cleaner.has(key)) {
        deleted.push(key);
        cleaner.delete(key);
        modified++;
    }
}

console.log(`Deleted ${deleted.length} items: ${deleted.join(' ')}`);

for (let key of replace) {
    const changed = pathname.replace(key, '');
    if (changed !== pathname) {
        console.log(`Pathname changed: ${pathname} -> ${changed}`);
        pathname = changed;
    }
}

const params = cleaner.toString().length ? '?' + cleaner.toString() : '';
const final = window.location.origin + pathname + params;

console.log(`Final: ${final}`);

if (modified > 0) window.location = final;
