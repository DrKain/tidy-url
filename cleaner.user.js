// ==UserScript==
// @name         Kain's URL Cleaner
// @namespace    https://ksir.pw
// @version      0.1.5
// @description  Removes garbage parameters from URLs
// @author       Kain (ksir.pw)
// @include      *
// @icon         data:image/gif;base64,R0lGODlhEAAQAMIDAAAAAIAAAP8AAP///////////////////yH5BAEKAAQALAAAAAAQABAAAAMuSLrc/jA+QBUFM2iqA2ZAMAiCNpafFZAs64Fr66aqjGbtC4WkHoU+SUVCLBohCQA7
// @updateURL    https://github.com/DrKain/url-cleaner/raw/main/cleaner.user.js
// @downloadURL  https://github.com/DrKain/url-cleaner/raw/main/cleaner.user.js
// @grant        none
// @run-at       document-start
// ==/UserScript==

const cleaner = new URLSearchParams(window.location.search);
let modified = 0;
let queue = [];
let replace = [];
let pathname = window.location.pathname;
const host = window.location.hostname;

// ---------------------------------------

const kurlc = [
    {
        name: 'Global',
        match: /.*/,
        rules: ['ga_source', 'ga_medium', 'ga_term', 'ga_content', 'ga_campaign', 'ga_place'],
        replace: []
    },
    {
        name: 'audible.com',
        match: /www.audible.com/i,
        rules: ['qid', 'sr', 'pf_rd_p', 'pf_rd_r', 'plink'],
        replace: []
    },
    {
        name: 'bandcamp',
        match: /.*.bandcamp.com/gi,
        rules: ['from', 'search_item_id', 'search_item_type', 'search_match_part', 'search_page_no', 'search_rank', 'search_sig'],
        replace: []
    },
    {
        name: 'amazon.com',
        match: /www.amazon.com/i,
        rules: ['pd_rd_w', 'qid', 'sr', 'keywords', 'dchild', 'ref', 'ref_', 'rnid', 'pf_rd_r', 'pf_rd_p', 'rh', 'pd_rd_r', 'smid', 'pd_rd_wg'],
        replace: [/\/ref=[^/?]*/i]
    },
    {
        name: 'reddit.com',
        match: /.*.reddit.com/i,
        rules: ['ref_campaign', 'ref_source'],
        replace: []
    },
    {
        name: 'twitch.tv',
        match: /www.twitch.tv/i,
        rules: ['tt_medium', 'tt_content'],
        replace: []
    },
    {
        name: 'pixiv.net',
        match: /www.pixiv.net/i,
        rules: ['p', 'i', 'g'],
        replace: []
    },
    {
        name: 'spotify',
        match: /open.spotify.com/i,
        rules: ['si', 'utm_source'],
        replace: []
    },
    {
        name: 'aliexpress',
        match: /.*.aliexpress.com/i,
        rules: ['_t', 'spm', 'algo_pvid', 'algo_expid', 'btsid', 'ws_ab_test', 'initiative_id', 'origin', 'widgetId', 'tabType', 'productId', 'productIds', 'gps-id', 'scm', 'scm_id', 'scm-url', 'pvid'],
        replace: []
    }
];

// ---------------------------------------

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
