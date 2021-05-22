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

const cleaner = new URLSearchParams(window.location.search);
const modified = 0;
const queue = [];
const host = window.location.hostname;

// ---------------------------------------

const kurlc = [
    {
        name: 'Global',
        match: /.*/,
        rules: ['ga_source', 'ga_medium', 'ga_term', 'ga_content', 'ga_campaign', 'ga_place', 'yclid', '_openstat', 'fb_action_ids', 'fb_action_types', 'fb_source', 'fb_ref', 'fbclid', 'action_type_map', 'action_ref_map', 'gs_l', 'mkt_tok', 'hmb_campaign', 'hmb_medium', 'hmb_source']
    },
    {
        name: 'audible.com',
        match: /www.audible.com/i,
        rules: ['qid', 'sr', 'pf_rd_p', 'pf_rd_r', 'plink']
    },
    {
        name: 'bandcamp',
        match: /.*.bandcamp.com/gi,
        rules: ['from', 'search_item_id', 'search_item_type', 'search_match_part', 'search_page_no', 'search_rank', 'search_sig']
    }
];

// ---------------------------------------

for (let rule of kurlc) {
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
