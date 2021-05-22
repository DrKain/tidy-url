const $kurlc_rules = [
    {
        name: 'Global',
        match: /.*/,
        rules: ['ga_source', 'ga_medium', 'ga_term', 'ga_content', 'ga_campaign', 'ga_place'],
        replace: []
    },
    {
        name: 'audible.com',
        match: /www.audible.com/i,
        rules: ['qid', 'sr', 'pf_rd_p', 'pf_rd_r', 'plink', 'ref'],
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
    },
    {
        name: 'google.com',
        match: /www.google\..*/i,
        rules: ['sxsrf', 'uact', 'ved', 'iflsig', 'source', 'ei', 'oq', 'gs_lcp', 'sclient', 'bih', 'biw', 'sa', 'dpr'],
        replace: []
    }
];

var module = module ?? { exports: null };
module.exports = $kurlc_rules;
