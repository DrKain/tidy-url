const $kurlc_rules = [
    {
        name: 'Global',
        match: /.*/,
        rules: ['ncid', 'utm_source', 'utm_medium', 'utm_term', 'utm_campaign', 'utm_content', 'utm_name', 'utm_cid', 'utm_reader', 'utm_viz_id', 'utm_pubreferrer', 'utm_swu', 'gclid', 'ga_source', 'ga_medium', 'ga_term', 'ga_content', 'ga_campaign', 'ga_place', 'gclid', 'gclsrc']
    },
    {
        name: 'audible.com',
        match: /www.audible.com/i,
        rules: ['qid', 'sr', 'pf_rd_p', 'pf_rd_r', 'plink', 'ref']
    },
    {
        name: 'bandcamp.com',
        match: /.*.bandcamp.com/gi,
        rules: ['from', 'search_item_id', 'search_item_type', 'search_match_part', 'search_page_id', 'search_page_no', 'search_rank', 'search_sig']
    },
    {
        name: 'amazon.com',
        match: /^(?:https?:\/\/)?(?:[^.]+\.)?amazon\.[a-z0-9]{0,3}/i,
        rules: ['psc', 'colid', 'coliid', 'linkId', 'tag', 'linkCode', 'ms3_c', 'pf_rd_s', 'pf_rd_t', ' pf_rd_i', 'pf_rd_m', 'pd_rd_w', 'qid', 'sr', 'keywords', 'dchild', 'ref', 'ref_', 'rnid', 'pf_rd_r', 'pf_rd_p', 'pd_rd_r', 'smid', 'pd_rd_wg'],
        replace: [/(\/ref|&ref_)=[^\/?]*/i]
    },
    {
        name: 'reddit.com',
        match: /.*.reddit.com/i,
        rules: ['ref_campaign', 'ref_source']
    },
    {
        name: 'twitch.tv',
        match: /www.twitch.tv/i,
        rules: ['tt_medium', 'tt_content', 'tt_email_id']
    },
    {
        name: 'blog.twitch.tv',
        match: /blog.twitch.tv/i,
        rules: ['utm_referrer']
    },
    {
        name: 'pixiv.net',
        match: /www.pixiv.net/i,
        rules: ['p', 'i', 'g']
    },
    {
        name: 'spotify.com',
        match: /open.spotify.com/i,
        rules: ['si', 'utm_source', 'context']
    },
    {
        name: 'aliexpress.com',
        match: /^(?:https?:\/\/)?(?:[^.]+\.)?aliexpress\.[a-z0-9]{0,3}/i,
        rules: ['_t', 'spm', 'algo_pvid', 'algo_expid', 'btsid', 'ws_ab_test', 'initiative_id', 'origin', 'widgetId', 'tabType', 'productId', 'productIds', 'gps-id', 'scm', 'scm_id', 'scm-url', 'pvid', 'algo_exp_id', 'pdp_ext_f', 'pdp_pi', 'fromRankId', 'sourceType', 'utparam', 'gatewayAdapt', '_evo_buckets', 'tpp_rcmd_bucket_id', 'scenario'],
        exclude: ['sku_id']
    },
    {
        name: 'google.com',
        match: /www.google\..*/i,
        rules: ['sourceid', 'client', 'aqs', 'sxsrf', 'uact', 'ved', 'iflsig', 'source', 'ei', 'oq', 'gs_lcp', 'sclient', 'bih', 'biw', 'sa', 'dpr']
    },
    {
        name: 'youtube.com',
        match: /.*.youtube.com/i,
        rules: ['gclid', 'feature']
    },
    {
        name: 'humblebundle.com',
        match: /www.humblebundle.com/i,
        rules: ['hmb_source', 'hmb_medium', 'hmb_campaign', 'mcID', 'linkID']
    },
    {
        name: 'greenmangaming.com',
        match: /www.greenmangaming.com/i,
        rules: ['CJEVENT', 'cjevent']
    },
    {
        name: 'fanatical.com',
        match: /www.fanatical.com/i,
        rules: ['cj_pid', 'cj_aid', 'aff_track', 'CJEVENT', 'cjevent']
    },
    {
        name: 'gamebillet.com',
        match: /www.gamebillet.com/i,
        rules: ['affiliate']
    },
    {
        name: 'newsweek.com',
        match: /www.newsweek.com/i,
        rules: ['subref']
    },
    {
        name: 'imgur.com',
        match: /imgur.com/i,
        rules: ['source']
    },
    {
        name: 'plex.tv',
        match: /.*.plex.tv/i,
        rules: ['origin', 'plex_utm', 'sl', 'ckhid']
    },
    {
        name: 'imdb.com',
        match: /www.imdb.com/i,
        rules: ['ref_', 'pf_rd_m', 'pf_rd_r', 'pf_rd_p', 'pf_rd_s', 'pf_rd_t', 'pf_rd_i']
    },
    {
        name: 'gog.com',
        match: /www.gog.com/i,
        rules: ['at_gd']
    },
    {
        name: 'tiktok.com',
        match: /www.tiktok.com/i,
        rules: ['is_copy_url', 'is_from_webapp', 'sender_device', 'sender_web_id', 'sec_user_id', 'share_app_id', 'share_item_id', 'share_link_id', 'social_sharing', '_r']
    },
    {
        name: 'facebook.com',
        match: /www.facebook.com/i,
        rules: ['fbclid', 'fb_ref', 'fb_source']
    },
    {
        name: 'yandex.com',
        match: /yandex.com/i,
        rules: ['lr', 'from', 'grhow', 'origin', '_openstat']
    },
    {
        name: 'store.steampowered.com',
        match: /store.steampowered.com/i,
        rules: ['snr']
    },
    {
        name: 'findojobs.co.nz',
        match: /www.findojobs.co.nz/i,
        rules: ['source']
    },
    {
        name: 'linkedin.com',
        match: /.*.linkedin.com/i,
        rules: ['contextUrn', 'destRedirectURL', 'lipi', 'licu', 'trk', 'trkInfo', 'originalReferer', 'upsellOrderOrigin', 'upsellTrk', 'upsellTrackingId', 'src']
    },
    {
        name: 'indeed.com',
        match: /.*.indeed.com/i,
        rules: ['from', 'attributionid']
    },
    {
        name: 'discord.com',
        match: /.*.discord.com/i,
        rules: ['source']
    },
    {
        name: 'medium.com',
        match: /medium.com/i,
        rules: ['source']
    },
    {
        name: 'twitter.com',
        match: /twitter.com/i,
        rules: ['s', 'src', 'ref_url', 'ref_src']
    },
    {
        name: 'voidu.com',
        match: /voidu.com/i,
        rules: ['affiliate']
    },
    {
        name: 'wingamestore.com',
        match: /wingamestore.com/i,
        rules: ['ars']
    },
    {
        name: 'gamebillet.com',
        match: /gamebillet.com/i,
        rules: ['affiliate']
    },
    {
        name: 'gamesload.com',
        match: /gamesload.com/i,
        rules: ['affil'],
        replace: []
    },
    {
        name: 'mightyape',
        match: /mightyape.co.(nz|au)/i,
        rules: ['m']
    },
    {
        name: 'music.apple.com',
        match: /music.apple.com/i,
        rules: ['uo', 'app', 'at', 'ct', 'ls']
    },
    {
        name: 'play.google.com',
        match: /play.google.com/i,
        rules: ['referrer']
    },
    {
        name: 'adtraction.com',
        match: /adtraction.com/i,
        redirect: 'url'
    },
    {
        name: 'dpbolvw.net',
        match: /dpbolvw.net/i,
        redirect: 'URL'
    },
    {
        name: 'itch.io',
        match: /itch.io/i,
        rules: ['fbclid']
    },
    {
        name: 'steamcommunity.com',
        match: /steamcommunity.com/i,
        redirect: 'url'
    },
    {
        name: 'microsoft.com',
        match: /microsoft.com/i,
        rules: ['refd']
    },
    {
        name: 'berrybase.de',
        match: /berrybase.de/i,
        rules: ['sPartner']
    },
    {
        name: 'instagram.com',
        match: /instagram.com/i,
        rules: ['igshid']
    },
    {
        name: 'hubspot.com',
        match: /hubspot.com/i,
        rules: ['hubs_content-cta', 'hubs_content']
    },
    {
        name: 'ebay.com',
        match: /^(?:https?:\/\/)?(?:[^.]+\.)?ebay\.[a-z0-9]{0,3}/i,
        rules: ['amdata', 'var', 'hash', '_trkparms', '_trksid', '_from', 'mkcid', 'mkrid', 'campid', 'toolid', 'mkevt', 'customid', 'siteid', 'ufes_redirect', 'ff3', 'pub'],
        exclude: ['epid', '_nkw']
    }
];
