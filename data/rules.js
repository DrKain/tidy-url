const $kurlc_rules = [
    {
        name: 'Global',
        match: /.*/,
        rules: ['ga_source', 'ga_medium', 'ga_term', 'ga_content', 'ga_campaign', 'ga_place', 'utm_campaign', 'utm_source', 'utm_medium', 'utm_content'],
        replace: []
    },
    {
        name: 'audible.com',
        match: /www.audible.com/i,
        rules: ['qid', 'sr', 'pf_rd_p', 'pf_rd_r', 'plink', 'ref'],
        replace: []
    },
    {
        name: 'bandcamp.com',
        match: /.*.bandcamp.com/gi,
        rules: ['from', 'search_item_id', 'search_item_type', 'search_match_part', 'search_page_no', 'search_rank', 'search_sig'],
        replace: []
    },
    {
        name: 'amazon.com',
        match: /www.amazon.com/i,
        rules: ['ms3_c', 'pf_rd_s', 'pf_rd_t', ' pf_rd_i', 'pf_rd_m', 'pd_rd_w', 'qid', 'sr', 'keywords', 'dchild', 'ref', 'ref_', 'rnid', 'pf_rd_r', 'pf_rd_p', 'rh', 'pd_rd_r', 'smid', 'pd_rd_wg'],
        replace: [/(\/ref|&ref_)=[^\/?]*/i]
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
        name: 'blog.twitch.tv',
        match: /blog.twitch.tv/i,
        rules: ['utm_referrer'],
        replace: []
    },
    {
        name: 'pixiv.net',
        match: /www.pixiv.net/i,
        rules: ['p', 'i', 'g'],
        replace: []
    },
    {
        name: 'spotify.com',
        match: /open.spotify.com/i,
        rules: ['si', 'utm_source', 'context'],
        replace: []
    },
    {
        name: 'aliexpress.com',
        match: /.*.aliexpress.com/i,
        rules: ['_t', 'spm', 'algo_pvid', 'algo_expid', 'btsid', 'ws_ab_test', 'initiative_id', 'origin', 'widgetId', 'tabType', 'productId', 'productIds', 'gps-id', 'scm', 'scm_id', 'scm-url', 'pvid'],
        replace: []
    },
    {
        name: 'google.com',
        match: /www.google\..*/i,
        rules: ['sxsrf', 'uact', 'ved', 'iflsig', 'source', 'ei', 'oq', 'gs_lcp', 'sclient', 'bih', 'biw', 'sa', 'dpr'],
        replace: []
    },
    {
        name: 'youtube.com',
        match: /.*.youtube.com/i,
        rules: ['gclid'],
        replace: []
    },
    {
        name: 'humblebundle.com',
        match: /www.humblebundle.com/i,
        rules: ['hmb_source', 'hmb_medium', 'hmb_campaign'],
        replace: []
    },
    {
        name: 'greenmangaming.com',
        match: /www.greenmangaming.com/i,
        rules: ['CJEVENT'],
        replace: []
    },
    {
        name: 'fanatical.com',
        match: /www.fanatical.com/i,
        rules: ['cj_pid', 'cj_aid', 'aff_track', 'CJEVENT'],
        replace: []
    },
    {
        name: 'gamebillet.com',
        match: /www.gamebillet.com/i,
        rules: ['affiliate'],
        replace: []
    },
    {
        name: 'newsweek.com',
        match: /www.newsweek.com/i,
        rules: ['subref'],
        replace: []
    },
    {
        name: 'imgur.com',
        match: /imgur.com/i,
        rules: ['source'],
        replace: []
    },
    {
        name: 'plex.tv',
        match: /.*.plex.tv/i,
        rules: ['origin', 'plex_utm', 'sl', 'ckhid'],
        replace: []
    },
    {
        name: 'imdb.com',
        match: /www.imdb.com/i,
        rules: ['ref_'],
        replace: []
    },
    {
        name: 'gog.com',
        match: /www.gog.com/i,
        rules: ['at_gd'],
        replace: []
    },
    {
        name: 'tiktok.com',
        match: /www.tiktok.com/i,
        rules: ['is_copy_url', 'is_from_webapp', 'sender_device', 'sender_web_id'],
        replace: []
    }
];

var module = module ?? { exports: null };
module.exports = $kurlc_rules;
