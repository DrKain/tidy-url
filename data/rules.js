// Prettier refuses to format the array in an acceptable way, so we have to do it manually.
// prettier-ignore
const $kurlc_rules = [
    {
        name: 'Global',
        match: /.*/,
        rules: [
            'ncid', 'utm_source', 'utm_medium', 'utm_term', 'utm_campaign',
            'utm_content', 'utm_name', 'utm_cid', 'utm_reader', 'utm_viz_id',
            'utm_pubreferrer', 'utm_swu', 'gclid', 'ga_source', 'ga_medium',
            'ga_term', 'ga_content', 'ga_campaign', 'ga_place', 'gclid', 'gclsrc'
        ]
    },
    {
        name: 'audible.com',
        match: /www.audible.com/i,
        rules: ['qid', 'sr', 'pf_rd_p', 'pf_rd_r', 'plink', 'ref']
    },
    {
        name: 'bandcamp.com',
        match: /.*.bandcamp.com/gi,
        rules: [
            'from', 'search_item_id', 'search_item_type', 'search_match_part', 'search_page_id',
            'search_page_no', 'search_rank', 'search_sig'
        ]
    },
    {
        name: 'amazon.com',
        match: /^(?:https?:\/\/)?(?:[^.]+\.)?amazon\.[a-z0-9]{0,3}/i,
        rules: [
            'psc', 'colid', 'coliid', 'linkId', 'tag', 'linkCode', 'ms3_c',
            'pf_rd_s', 'pf_rd_t', ' pf_rd_i', 'pf_rd_m', 'pd_rd_w', 'qid', 'sr',
            'keywords', 'dchild', 'ref', 'ref_', 'rnid', 'pf_rd_r', 'pf_rd_p', 'pd_rd_r',
            'smid', 'pd_rd_wg', 'content-id'
        ],
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
        rules: ['si', 'utm_source', 'context', 'sp_cid'],
        exclude: ['go', 'nd']
    },
    {
        name: 'aliexpress.com',
        match: /^(?:https?:\/\/)?(?:[^.]+\.)?aliexpress\.[a-z0-9]{0,3}/i,
        rules: [
            '_t', 'spm', 'algo_pvid', 'algo_expid', 'btsid', 'ws_ab_test',
            'initiative_id', 'origin', 'widgetId', 'tabType', 'productId',
            'productIds', 'gps-id', 'scm', 'scm_id', 'scm-url', 'pvid',
            'algo_exp_id', 'pdp_pi', 'fromRankId', 'sourceType', 'utparam',
            'gatewayAdapt', '_evo_buckets', 'tpp_rcmd_bucket_id', 'scenario',
            'pdp_npi', 'tt', 'spreadType', 'srcSns', 'bizType', 'social_params',
            'aff_fcid', 'aff_fsk', 'aff_platform', 'aff_trace_key', 'shareId',
            'platform', 'businessType', 'terminal_id', 'afSmartRedirect', 'sk'
        ],
        exclude: ['sku_id', 'pdp_ext_f']
    },
    {
        name: 'google.com',
        match: /www.google\..*/i,
        rules: [
            'sourceid', 'client', 'aqs', 'sxsrf', 'uact', 'ved', 'iflsig', 'source',
            'ei', 'oq', 'gs_lcp', 'sclient', 'bih', 'biw', 'sa', 'dpr'
        ],
        amp: /www\.google\.com\/amp\/s\/(.*)/gim
    },
    {
        name: 'youtube.com',
        match: /.*.youtube.com/i,
        rules: ['gclid', 'feature', 'app', 'src', 'lId', 'cId'],
        redirect: 'q'
    },
    {
        name: 'humblebundle.com',
        match: /www.humblebundle.com/i,
        rules: ['hmb_source', 'hmb_medium', 'hmb_campaign', 'mcID', 'linkID'],
        exclude: ['partner']
    },
    {
        name: 'greenmangaming.com',
        match: /www.greenmangaming.com/i,
        rules: ['CJEVENT', 'cjevent', 'irclickid', 'irgwc']
    },
    {
        name: 'fanatical.com',
        match: /www.fanatical.com/i,
        rules: ['cj_pid', 'cj_aid', 'aff_track', 'CJEVENT', 'cjevent']
    },
    {
        name: 'newsweek.com',
        match: /www.newsweek.com/i,
        rules: ['subref', 'amp']
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
        rules: [
            'ref_', 'pf_rd_m', 'pf_rd_r', 'pf_rd_p', 'pf_rd_s',
            'pf_rd_t', 'pf_rd_i', 'ref_hp_hp_e_2'
        ]
    },
    {
        name: 'gog.com',
        match: /www.gog.com/i,
        rules: ['at_gd']
    },
    {
        name: 'tiktok.com',
        match: /www.tiktok.com/i,
        rules: [
            'is_copy_url', 'is_from_webapp', 'sender_device', 'sender_web_id',
            'sec_user_id', 'share_app_id', 'share_item_id', 'share_link_id',
            'social_sharing', '_r', 'source', 'user_id', 'u_code', 'tt_from', 
            'share_author_id', 'sec_uid', 'checksum', '_d'
        ],
        exclude: ['lang']
    },
    {
        name: 'facebook.com',
        match: /.*.facebook.com/i,
        rules: ['fbclid', 'fb_ref', 'fb_source', 'referral_code', 'referral_story_type', 'tracking'],
        redirect: 'u'
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
        rules: [
            'contextUrn', 'destRedirectURL', 'lipi', 'licu', 'trk', 'trkInfo', 'originalReferer',
            'upsellOrderOrigin', 'upsellTrk', 'upsellTrackingId', 'src'
        ]
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
        rules: ['affil']
    },
    {
        name: 'mightyape',
        match: /mightyape.(co.nz|com.au)/i,
        rules: ['m']
    },
    {
        name: 'apple.com',
        match: /.*.apple.com/i,
        rules: ['uo', 'app', 'at', 'ct', 'ls', 'pt', 'mt', 'itsct', 'itscg']
    },
    {
        name: 'music.apple.com',
        match: /music.apple.com/i,
        rules: ['i', 'lId', 'cId', 'sr', 'src']
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
        rules: ['refd', 'icid']
    },
    {
        name: 'berrybase.de',
        match: /berrybase.de/i,
        rules: ['sPartner']
    },
    {
        name: 'instagram.com',
        match: /instagram.com/i,
        rules: ['igshid'],
        redirect: 'u'
    },
    {
        name: 'hubspot.com',
        match: /hubspot.com/i,
        rules: ['hubs_content-cta', 'hubs_content']
    },
    {
        name: 'ebay.com',
        match: /^(?:https?:\/\/)?(?:[^.]+\.)?ebay\.[a-z0-9]{0,3}/i,
        rules: [
            'amdata', 'var', 'hash', '_trkparms', '_trksid', '_from', 'mkcid',
            'mkrid', 'campid', 'toolid', 'mkevt', 'customid', 'siteid', 'ufes_redirect',
            'ff3', 'pub', 'media', 'widget_ver', 'ssspo', 'sssrc', 'ssuid'
        ],
        exclude: ['epid', '_nkw']
    },
    {
        name: 'shopee.com',
        match: /^(?:https?:\/\/)?(?:[^.]+\.)?shopee\.[a-z0-9]{0,3}/i,
        rules: [
            'af_siteid', 'pid', 'af_click_lookback', 'af_viewthrough_lookback',
            'is_retargeting', 'af_reengagement_window', 'af_sub_siteid', 'c'
        ]
    },
    {
        name: 'msn.com',
        match: /www.msn.com/i,
        rules: ['ocid', 'cvid', 'pc']
    },
    {
        name: 'nuuvem.com',
        match: /www.nuuvem.com/i,
        rules: ['ranMID', 'ranEAID', 'ranSiteID']
    },
    {
        name: 'sjv.io',
        match: /.*.sjv.io/i,
        redirect: 'u'
    },
    {
        name: 'linksynergy.com',
        match: /.*.linksynergy.com/i,
        rules: ['id', 'mid'],
        redirect: 'murl'
    },
    {
        name: 'cnbc.com',
        match: /www.cnbc.com/i,
        rules: ['__source']
    },
    {
        name: 'yahoo.com',
        match: /yahoo.com/i,
        rules: ['guce_referrer', 'guce_referrer_sig', 'guccounter']
    },
    {
        name: 'techcrunch.com',
        match: /techcrunch.com/i,
        rules: ['guce_referrer', 'guce_referrer_sig', 'guccounter']
    },
    {
        name: 'office.com',
        match: /office.com/i,
        rules: ['from']
    },
    {
        name: 'ticketmaster.co.nz',
        match: /ticketmaster.co.nz/i,
        rules: ['int_cmp_name', 'int_cmp_id', 'int_cmp_creative', 'tm_link']
    },
    {
        name: 'bostonglobe.com',
        match: /www.bostonglobe.com/i,
        rules: ['p1']
    },
    {
        name: 'ampproject.org',
        match: /cdn.ampproject.org/i,
        rules: ['amp_gsa', 'amp_js_v', 'usqp', 'outputType'],
        amp: /cdn\.ampproject\.org\/v\/s\/(.*)\#(aoh|csi|referrer|amp)/gim
    },
    {
        name: 'nbcnews.com',
        match: /nbcnews.com/i,
        rules: ['fbclid']
    },
    {
        name: 'countdown.co.nz',
        match: /www.countdown.co.nz/i,
        rules: ['promo_name', 'promo_creative', 'promo_position', 'itemID']
    },
    {
        name: 'etsy.com',
        match: /www.etsy.com/i,
        rules: ['click_key', 'click_sum', 'rec_type', 'ref', 'frs', 'sts']
    },
    {
        name: 'wattpad.com',
        match: /www.wattpad.com/i,
        rules: ['wp_page', 'wp_uname', 'wp_originator']
    },
    {
        name: 'redirect.viglink.com',
        match: /redirect.viglink.com/i,
        redirect: 'u'
    },
    {
        name: 'noctre.com',
        match: /www.noctre.com/i,
        rules: ['aff']
    },
    {
        name: 'dreamgame.com',
        match: /www.dreamgame.com/i,
        rules: ['affiliate']
    },
    {
        name: 'startpage.com',
        match: /.*.startpage.com/i,
        rules: ['source']
    },
    {
        name: '2game.com',
        match: /^2game.com/i,
        rules: ['ref']
    },
    {
        name: 'jdoqocy.com',
        match: /www.jdoqocy.com/i,
        redirect: 'URL'
    },
    {
        name: 'gamesplanet.com',
        match: /.*.gamesplanet.com/i,
        rules: ['ref']
    },
    {
        name: 'gamersgate.com',
        match: /www.gamersgate.com/i,
        rules: ['aff']
    },
    {
        name: 'gate.sc',
        match: /gate.sc/i,
        redirect: 'url'
    },
    {
        name: 'getmusicbee.com',
        match: /^getmusicbee.com/i,
        redirect: 'r'
    },
    {
        name: 'imp.i305175.net',
        match: /^imp.i305175.net/i,
        redirect: 'u'
    }
];

module.exports = $kurlc_rules;
