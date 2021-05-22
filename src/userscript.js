// ==UserScript==
// @name         Kain's URL Cleaner
// @namespace    https://ksir.pw
// @version      0.1
// @description  Removes garbage parameters from URLs
// @author       Kain (ksir.pw)
// @include      *
// @icon         https://www.google.com/s2/favicons?domain=ksir.pw
// @grant        none
// @run-at       document-start
// ==/UserScript==

var cleaner = new URLSearchParams(window.location.search);
var modified = 0;
var queue = [];
var host = window.location.hostname;

const data = kurlc ?? window.kurlc ?? [];

if (data.length === 0) console.warn('Failed to load kurlc data');

for (let rule of data) {
    if (rule.match.exec(host) !== null) {
        queue = [...queue, ...rule.rules];
    }
}

for (let key of queue) {
    if (cleaner.has(key)) {
        cleaner.delete(key);
        modified++;
    }
}

if (modified > 0) window.location.search = cleaner.toString();
