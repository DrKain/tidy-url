const $kurlc_rules = [
    {
        name: 'Global',
        match: /.*/,
        rules: [
            // https://en.wikipedia.org/wiki/UTM_parameters
            'utm_source', 'utm_medium', 'utm_term', 'utm_campaign',
            'utm_content', 'utm_name', 'utm_cid', 'utm_reader', 'utm_viz_id',
            'utm_pubreferrer', 'utm_swu', 'utm_social-type', 'utm_brand',
            'utm_team', 'utm_feeditemid', 'utm_id', 'utm_marketing_tactic', 
            'utm_creative_format', 'utm_campaign_id', 'utm_source_platform',
            'utm_timestamp', 'utm_souce',
            // ITM parameters, a variant of UTM parameters
            'itm_source', 'itm_medium', 'itm_term', 'itm_campaign', 'itm_content',
            'itm_channel', 'itm_source_s', 'itm_medium_s', 'itm_campaign_s',
            'itm_audience',
            // INT parameters, another variant of UTM
            'int_source', 'int_cmp_name', 'int_cmp_id', 'int_cmp_creative',
            'int_medium', 'int_campaign',
            // piwik (https://github.com/DrKain/tidy-url/issues/49)
            'pk_campaign', 'pk_cpn', 'pk_source', 'pk_medium',
            'pk_keyword', 'pk_kwd', 'pk_content', 'pk_cid',
            'piwik_campaign', 'piwik_cpn', 'piwik_source', 'piwik_medium',
            'piwik_keyword', 'piwik_kwd', 'piwik_content', 'piwik_cid',
            // Google Ads
            'gclid', 'ga_source', 'ga_medium', 'ga_term', 'ga_content', 'ga_campaign',
            'ga_place', 'gclid', 'gclsrc',
            // https://github.com/DrKain/tidy-url/issues/21
            'hsa_cam', 'hsa_grp', 'hsa_mt', 'hsa_src', 'hsa_ad', 'hsa_acc',
            'hsa_net', 'hsa_kw', 'hsa_tgt', 'hsa_ver', 'hsa_la', 'hsa_ol',
            // Facebook
            'fbclid',
            // Olytics
            'oly_enc_id', 'oly_anon_id',
            // Vero
            'vero_id', 'vero_conv',
            // Drip
            '__s', 
            // HubSpot
            '_hsenc', '_hsmi', '__hssc', '__hstc', '__hsfp', 'hsCtaTracking',
            // Marketo
            'mkt_tok',
            // Matomo (https://github.com/DrKain/tidy-url/issues/47)
            'mtm_campaign', 'mtm_keyword', 'mtm_kwd', 'mtm_source', 'mtm_medium',
            'mtm_content', 'mtm_cid', 'mtm_group', 'mtm_placement', 
            // Oracle Eloqua
            'elqTrackId', 'elq', 'elqaid', 'elqat', 'elqCampaignId', 'elqTrack',
            // MailChimp
            'mc_cid', 'mc_eid',
            // Other              
            'ncid', 'cmpid', 'mbid',
            // Reddit Ads (https://github.com/DrKain/tidy-url/issues/31)
            'rdt_cid'
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
        match: /amazon\.[a-z0-9]{0,3}/i,
        rules: [
            'psc', 'colid', 'coliid', 'linkId', 'tag', 'linkCode', 'ms3_c',
            'pf_rd_s', 'pf_rd_t', ' pf_rd_i', 'pf_rd_m', 'pd_rd_w', 'qid', 'sr',
            'keywords', 'dchild', 'ref', 'ref_', 'rnid', 'pf_rd_r', 'pf_rd_p', 'pd_rd_r',
            'smid', 'pd_rd_wg', 'content-id', 'spLa', 'crid', 'sprefix',
            'hvlocint', 'hvdvcmdl', 'hvptwo', 'hvpone', 'hvpos',
            'qu', 'pd_rd_i', 'nc2', 'nc1', 'trk', 'sc_icampaign', 'trkCampaign',
            'ufe', 'sc_icontent', 'sc_ichannel', 'sc_iplace', 'sc_country',
            'sc_outcome', 'sc_geo', 'sc_campaign', 'sc_channel'
        ],
        replace: [/(\/ref|&ref_)=[^\/?]*/i]
    },
    {
        name: 'reddit.com',
        match: /.*.reddit.com/i,
        rules: [
            'ref_campaign', 'ref_source', 'tags', 'keyword', 'channel', 'campaign',
            'user_agent', 'domain', 'base_url', '$android_deeplink_path',
            '$deeplink_path', '$og_redirect', 'share_id', 'correlation_id', 'ref'
        ]
    },
    {
        name: 'app.link',
        match: /.*\.app\.link/i,
        rules: [
            'tags', 'keyword', 'channel', 'campaign',
            'user_agent', 'domain', 'base_url', '$android_deeplink_path',
            '$deeplink_path', '$og_redirect', 'compact_view', 'dnt',
            'adblock', 'geoip_country', 'referrer_domain',
            'referrer_url'
        ]
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
        rules: [
            'si', 'utm_source', 'context', 'sp_cid',
            '_branch_match_id', '_branch_referrer'
        ],
        allow: ['go', 'nd']
    },
    {
        name: 'aliexpress.com',
        match: /^(?:https?:\/\/)?(?:[^.]+\.)?aliexpress\.(?:[a-z]{2,}){1,}/i,
        rules: [
            '_t', 'spm', 'algo_pvid', 'algo_expid', 'btsid', 'ws_ab_test',
            'initiative_id', 'origin', 'widgetId', 'tabType', 'productId',
            'productIds', 'gps-id', 'scm', 'scm_id', 'scm-url', 'pvid',
            'algo_exp_id', 'pdp_pi', 'fromRankId', 'sourceType', 'utparam',
            'gatewayAdapt', '_evo_buckets', 'tpp_rcmd_bucket_id', 'scenario',
            'pdp_npi', 'tt', 'spreadType', 'srcSns', 'bizType', 'social_params',
            'aff_fcid', 'aff_fsk', 'aff_platform', 'aff_trace_key', 'shareId',
            'platform', 'businessType', 'terminal_id', 'afSmartRedirect', 'sk',
            'gbraid'
        ],
        allow: ['sku_id', 'pdp_ext_f']
    },
    {
        name: 'google.com',
        match: /www.google\..*/i,
        rules: [
            'sourceid', 'client', 'aqs', 'sxsrf', 'uact', 'ved', 'iflsig', 'source',
            'ei', 'oq', 'gs_lcp', 'sclient', 'bih', 'biw', 'sa', 'dpr', 'rlz',
            'gs_lp', 'sca_esv', 'si', 'gs_l'
        ],
        amp: {
            regex: /www\.google\.(?:.*)\/amp\/s\/(.*)/gim,
        },
        redirect: 'url'
    },
    {
        name: 'youtube.com',
        match: /.*.youtube.com/i,
        rules: ['gclid', 'feature', 'app', 'src', 'lId', 'cId', 'embeds_referring_euri'],
        redirect: 'q'
    },
    {
        name: 'humblebundle.com',
        match: /www.humblebundle.com/i,
        rules: ['hmb_source', 'hmb_medium', 'hmb_campaign', 'mcID', 'linkID'],
        allow: ['partner']
    },
    {
        name: 'greenmangaming.com',
        match: /www.greenmangaming.com/i,
        rules: ['CJEVENT', 'cjevent', 'irclickid', 'irgwc', 'pdpgatetoken']
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
        match: /^.*\.imdb\.com/i,
        rules: [
            'ref_', 'ref\\_', 'pf_rd_m', 'pf_rd_r', 'pf_rd_p', 'pf_rd_s',
            'pf_rd_t', 'pf_rd_i', 'ref_hp_hp_e_2', 'rf', 'ref'
        ]
    },
    {
        name: 'gog.com',
        match: /www.gog.com/i,
        rules: [
            'at_gd', 'rec_scenario_id', 'rec_sub_source_id', 'rec_item_id',
            'vds_id', 'prod_id', 'rec_source'
        ]
    },
    {
        name: 'tiktok.com',
        match: /www.tiktok.com/i,
        rules: [
            'is_copy_url', 'is_from_webapp', 'sender_device', 'sender_web_id',
            'sec_user_id', 'share_app_id', 'share_item_id', 'share_link_id',
            'social_sharing', '_r', 'source', 'user_id', 'u_code', 'tt_from', 
            'share_author_id', 'sec_uid', 'checksum', '_d', 'refer', 'enter_from',
            'enter_method', 'attr_medium', 'attr_source'
        ],
        allow: ['lang']
    },
    {
        name: 'tiktok.com/link',
        match: /tiktok\.com\/link\/v2/i,
        match_href: true,
        redirect: 'target'
    },
    {
        name: 'facebook.com',
        match: /.*.facebook.com/i,
        rules: ['fbclid', 'fb_ref', 'fb_source', 'referral_code', 'referral_story_type', 'tracking', 'ref'],
        redirect: 'u',
        exclude: [
            /www\.facebook\.com\/sharer/gi
        ]
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
            'contextUrn', 'destRedirectURL', 'lipi', 'licu', 'trk',
            'trkInfo', 'originalReferer', 'upsellOrderOrigin',
            'upsellTrk', 'upsellTrackingId', 'src', 'trackingId',
            'midToken', 'midSig', 'trkEmail', 'eid'
        ],
        allow: [ 'otpToken' ]
    },
    {
        name: 'indeed.com',
        match: /.*.indeed.com/i,
        rules: ['from', 'attributionid']
    },
    {
        name: 'discord.com',
        match: /(?:.*\.)?discord\.com/i,
        rules: ['source' , 'ref']
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
        match: /^www.gamesload.com/i,
        rules: ['affil'],
        allow: ['REF']
    },
    {
        name: 'mightyape',
        match: /mightyape.(co.nz|com.au)/i,
        rules: ['m']
    },
    {
        name: 'apple.com',
        match: /.*.apple.com/i,
        rules: ['uo', 'app', 'at', 'ct', 'ls', 'pt', 'mt', 'itsct', 'itscg', 'referrer', 'src', 'cid']
    },
    {
        name: 'music.apple.com',
        match: /music.apple.com/i,
        rules: ['i', 'lId', 'cId', 'sr', 'src']
    },
    {
        name: 'play.google.com',
        match: /play.google.com/i,
        rules: ['referrer', 'pcampaignid']
    },
    {
        name: 'adtraction.com',
        match: /adtraction.com/i,
        redirect: 'url'
    },
    {
        name: 'dpbolvw.net',
        match: /dpbolvw.net/i,
        redirect: 'url'
    },
    {
        name: 'lenovo.com',
        match: /.*.lenovo.com/i,
        rules: ['PID', 'clickid', 'irgwc', 'cid', 'acid', 'linkTrack']
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
        name: 'steamcommunity.com/linkfilter',
        match: /steamcommunity.com\/linkfilter/i,
        redirect: 'u',
        match_href: true
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
        rules: ['igshid', 'igsh', 'source'],
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
        allow: ['epid', '_nkw']
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
        rules: [
            'guce_referrer', 'guce_referrer_sig', 'guccounter',
            'soc_src', 'soc_trk', 'tsrc'
        ]
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
        rules: ['tm_link']
    },
    {
        name: 'bostonglobe.com',
        match: /bostonglobe.com/i,
        rules: ['p1']
    },
    {
        name: 'ampproject.org',
        match: /cdn.ampproject.org/i,
        rules: ['amp_gsa', 'amp_js_v', 'usqp', 'outputType'],
        amp: {
            regex: /cdn\.ampproject\.org\/v\/s\/(.*)\#(aoh|csi|referrer|amp)/gim
        }
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
        match: /^www.jdoqocy.com/i,
        redirect: 'url'
    },
    {
        name: 'gamesplanet.com',
        match: /^(?:.*\.|)gamesplanet\.com/i,
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
    },
    {
        name: 'qflm.net',
        match: /.*.qflm.net/i,
        redirect: 'u'
    },
    {
        name: 'anrdoezrs.net',
        match: /anrdoezrs.net/i,
        amp: {
            regex: /(?:.*)\/links\/(?:.*)\/type\/dlg\/sid\/\[subid_value\]\/(.*)/gi
        }
    },
    {
        name: 'emjcd.com',
        match: /^www.emjcd.com/i,
        decode: {
            param: 'd',
            lookFor: 'destinationUrl'
        }
    },
    {
        name: 'go2cloud.org',
        match: /^.*.go2cloud.org/i,
        redirect: 'aff_unique1'
    },
    {
        name: 'bn5x.net',
        match: /^.*.bn5x.net/i,
        redirect: 'u'
    },
    {
        name: 'tvguide.com',
        match: /^www.tvguide.com/i,
        amp: { regex: /(.*)\#link=/i }
    },
    {
        name: 'ranker.com',
        match: /^(www|blog).ranker.com/i,
        rules: ['ref', 'rlf', 'l', 'li_source', 'li_medium']
    },
    {
        name: 'tkqlhce.com',
        match: /^www.tkqlhce.com/i,
        redirect: 'url'
    },
    {
        name: 'flexlinkspro.com',
        match: /^track.flexlinkspro.com/i,
        redirect: 'url'
    },
    {
        name: 'watchworthy.app',
        match: /^watchworthy.app/i,
        rules: ['ref']
    },
    {
        name: 'hbomax.com',
        match: /^trk.hbomax.com/i,
        redirect: 'url'
    },
    {
        name: 'squarespace.com',
        match: /^.*.squarespace.com/i,
        rules: ['subchannel', 'source', 'subcampaign', 'campaign', 'channel', '_ga']
    },
    {
        name: 'baidu.com',
        match: /^www.baidu.com/i,
        rules: [
            'rsv_spt', 'rsv_idx', 'rsv_pq', 'rsv_t', 'rsv_bp', 'rsv_dl',
            'rsv_iqid', 'rsv_enter', 'rsv_sug1', 'rsv_sug2', 'rsv_sug3',
            'rsv_sug4', 'rsv_sug5', 'rsv_sug6', 'rsv_sug7', 'rsv_sug8',
            'rsv_sug9', 'rsv_sug7', 'rsv_btype',
            'tn', 'sa', 'rsf', 'rqid', 'usm', '__pc2ps_ab', 'p_signature',
            'p_sign', 'p_timestamp', 'p_tk', 'oq'
        ],
        allow: ['wd', 'ie']
    },
    {
        name: 'primevideo.com',
        match: /^www.primevideo.com/i,
        rules: ['dclid'],
        replace: [/\/ref=[^\/?]*/i]
    },
    {
        name: 'threadless.com',
        match: /^www.threadless.com/i,
        rules: ['itm_source_s', 'itm_medium_s', 'itm_campaign_s'],
    },
    {
        name: 'wsj.com',
        match: /^www.wsj.com/i,
        rules: ['mod'],
    },
    {
        name: 'thewarehouse.co.nz',
        match: /^www.thewarehouse.co.nz/i,
        rules: ['sfmc_j', 'sfmc_id', 'sfmc_mid', 'sfmc_uid', 'sfmc_id', 'sfmc_activityid'],
    },
    {
        name: 'awstrack.me',
        match: /^.*awstrack.me/i,
        amp: { regex: /awstrack.me\/L0\/(.*)/ }
    },
    {
        name: 'express.co.uk',
        match: /^www.express.co.uk/i,
        replace: [/\/amp$/i]
    },
    {
        name: 'ko-fi.com',
        match: /^ko-fi.com/i,
        rules: ['ref', 'src']
    },
    {
        name: 'indiegala.com',
        match: /^www.indiegala.com/i,
        rules: ['ref']
    },
    {
        name: 'l.messenger.com',
        match: /^l.messenger.com/i,
        redirect: 'u'
    },
    {
        name: 'transparency.fb.com',
        match: /^transparency.fb.com/i,
        rules: ['source']
    },
    {
        name: 'manymorestores.com',
        match: /^www.manymorestores.com/i,
        rules: ['ref']
    },
    {
        name: 'macgamestore.com',
        match: /^www.macgamestore.com/i,
        rules: ['ars']
    },
    {
        name: 'blizzardgearstore.com',
        match: /^www.blizzardgearstore.com/i,
        rules: ['_s']
    },
    {
        name: 'playbook.com',
        match: /^www.playbook.com/i,
        rules: ['p']
    },
    {
        name: 'cookiepro.com',
        match: /^.*.cookiepro.com/i,
        rules: ['source', 'referral']
    },
    {
        name: 'pinterest.com',
        match: /^www\.pinterest\..*/i,
        rules: ['rs']
    },
    {
        name: 'bing.com',
        match: /^www\.bing\.com/i,
        rules: [
            'qs', 'form', 'sp', 'pq', 'sc', 'sk', 'cvid', 'FORM',
            'ck', 'simid', 'thid', 'cdnurl', 'pivotparams', 'ghsh', 'ghacc',
            'ccid', '', 'ru'
        ],
        readded: ['sim','exph', 'expw', 'vt', 'mediaurl', 'first'],
        allow: ['q', 'tsc', 'iss', 'id', 'view', 'setlang'],
    },
    {
        name: 'jf79.net',
        match: /^jf79\.net/i,
        rules: ['li', 'wi', 'ws', 'ws2']
    },
    {
        name: 'frankenergie.nl',
        match: /^www\.frankenergie\.nl/i,
        rules: ['aff_id']
    },
    {
        name: 'nova.cz',
        match: /^.*\.nova\.cz/i,
        rules: ['sznclid'],
    },
    {
        name: 'cnn.com',
        match: /.*.cnn.com/i,
        rules: ['hpt', 'iid'],
        amp: {
            replace: {
                text: 'amp.cnn.com/cnn/',
                with: 'www.cnn.com/'
            }
        },
        exclude: [
            /e.newsletters.cnn.com/gi,
        ]
    },
    {
        name: 'amp.scmp.com',
        match: /amp\.scmp\.com/i,
        amp: {
            replace: {
                text: 'amp.scmp.com',
                with: 'scmp.com'
            }
        }
    },
    {
        name: 'justwatch.com',
        match: /click\.justwatch\.com/i,
        rules: ['cx','uct_country', 'uct_buybox', 'sid'],
        redirect: 'r'
    },
    {
        name: 'psychologytoday.com',
        match: /www\.psychologytoday\.com/i,
        rules: ['amp']
    },
    {
        name: 'mouser.com',
        match: /www\.mouser\.com/i,
        rules: ['qs']
    },
    {
        name: 'awin1.com',
        match: /www\.awin1\.com/i,
        redirect: 'ued',
        rules: ['awinmid', 'awinaffid', 'clickref']
    },
    {
        name: 'syteapi.com',
        match: /syteapi\.com/i,
        decode: { param: 'url', encoding: 'base64' }
    },
    {
        name: 'castorama.fr',
        match: /www\.castorama\.fr/i,
        rules: ['syte_ref']
    },
    {
        name: 'quizlet.com',
        match: /quizlet\.com/i,
        rules: ['funnelUUID', 'source']
    },
    {
        name: 'pbtech.co.nz',
        match: /www\.pbtech\.co\.nz/i,
        rules: ['qr']
    },
    {
        name: 'matomo.org',
        match: /matomo\.org/i,
        rules: [
            'menu', 'footer', 'header', 'hp-reasons-learn', 'hp-top',
            'above-fold', 'step1-hp', 'mid-hp', 'take-back-control-hp',
            'hp-reasons-icon', 'hp-reasons-heading', 'hp-reasons-p',
            'hp-bottom', 'footer', 'menu'
        ]
    },
    {
        name: 'eufy.com',
        match: /eufy\.com/i,
        rules: ['ref']
    },
    {
        name: 'newsflare.com',
        match: /www\.newsflare\.com/i,
        rules: ['jwsource']
    },
    {
        name: 'wish.com',
        match: /www\.wish\.com/i,
        rules: ['share']
    },
    {
        name: 'change.org',
        match: /www\.change\.org/i,
        rules: ['source_location']
    },
    {
        name: 'washingtonpost.com',
        match: /.*\.washingtonpost\.com/i,
        rules: ['itid', 's_l']
    },
    {
        name: 'lowes.com',
        match: /www\.lowes\.com/i,
        rules: ['cm_mmc', 'ds_rl', 'gbraid']
    },
    {
        name: 'stacks.wellcomecollection.org',
        match: /stacks\.wellcomecollection\.org/i,
        rules: ['source']
    },
    {
        name: 'redbubble.com',
        match: /.*\.redbubble\.com/i,
        rules: ['ref']
    },
    {
        name: 'inyourarea.co.uk',
        match: /inyourarea.co.uk/i,
        rules: ['from_reach_primary_nav', 'from_reach_footer_nav', 'branding']
    },
    {
        name: 'fiverr.com',
        match: /.*\.fiverr\.com/i,
        rules: [
            'source', 'context_referrer', 'referrer_gig_slug',
            'ref_ctx_id', 'funnel', 'imp_id'
        ]
    },
    {
        name: 'kqzyfj.com',
        match: /www\.kqzyfj\.com/i,
        redirect: 'url',
        rules: ['cjsku', 'pubdata']
    },
    {
        name: 'marca.com',
        match: /.*\.marca\.com/i,
        rules: ['intcmp', 's_kw', 'emk']
    },
    {
        name: 'marcaentradas.com',
        match: /.*\.marcaentradas\.com/i,
        rules: ['intcmp', 's_kw']
    },
    {
        name: 'honeycode.aws',
        match: /.*\.honeycode\.aws/i,
        rules: [
            'trackingId', 'sc_icampaign', 'sc_icontent', 'sc_ichannel',
            'sc_iplace', 'sc_country', 'sc_outcome', 'sc_geo',
            'sc_campaign', 'sc_channel', 'trkCampaign', 'trk'
        ]
    },
    {
        name: 'news.artnet.com',
        match: /news\.artnet\.com/i,
        replace: [/\/amp-page$/i]
    },
    {
        name: 'studentbeans.com',
        match: /www\.studentbeans\.com/i,
        rules: ['source']
    },
    {
        name: 'boxofficemojo.com',
        match: /boxofficemojo.com/i,
        rules: ['ref_']
    },
    {
        name: 'solodeportes.com.ar',
        match: /www.solodeportes.com.ar/i,
        rules: ['nosto', 'refSrc']
    },
    {
        name: 'amp.dw.com',
        match: /amp.dw.com/i,
        amp: {
            replace: {
                text: 'amp.dw.com',
                with: 'dw.com'
            }
        }
    },
    {
        name: 'joybuggy.com',
        match: /joybuggy.com/i,
        rules: ['ref']
    },
    {
        name: 'etail.market',
        match: /etail.market/i,
        rules: ['tracking']
    },
    {
        name: 'myanimelist.net',
        match: /myanimelist.net/i,
        rules: ['_location', 'click_type', 'click_param']
    },
    {
        name: 'support-dev.discord.com',
        match: /support-dev.discord.com/i,
        rules: ['ref']
    },
    {
        name: 'dlgamer.com',
        match: /dlgamer.com/i,
        rules: ['affil']
    },
    {
        name: 'newsletter.manor.ch',
        match: /newsletter.manor.ch/i,
        rules: ['user_id_1'],
        rev: true
    },
    {
        name: 'knowyourmeme.com',
        match: /amp.knowyourmeme.com/i,
        amp: {
            replace: {
                text: 'amp.knowyourmeme.com',
                with: 'knowyourmeme.com'
            }
        }
    },
    {
        name: 'ojrq.net',
        match: /ojrq.net/i,
        redirect: 'return'
    },
    {
        name: 'click.pstmrk.it',
        match: /click.pstmrk.it/i,
        amp: { regex: /click\.pstmrk\.it\/(?:[a-zA-Z0-9]){1,2}\/(.*?)\//gim }
    },
    {
        name: 'track.roeye.co.nz',
        match: /track.roeye.co.nz/i,
        redirect: 'path'
    },
    {
        name: 'producthunt.com',
        match: /producthunt.com/i,
        rules: ['ref']
    },
    {
        name: 'cbsnews.com',
        match: /www.cbsnews.com/i,
        rules: ['ftag', 'intcid'],
        amp: {
            replace: {
                text: 'cbsnews.com/amp/',
                with: 'cbsnews.com/'
            }
        }
    },
    {
        name: 'jobs.venturebeat.com',
        match: /jobs.venturebeat.com/i,
        rules: ['source']
    },
    {
        name: 'api.ffm.to',
        match: /api.ffm.to/i,
        decode: {
            param: 'cd',
            lookFor: 'destUrl'
        }
    },
    {
        name: 'wfaa.com',
        match: /www.wfaa.com/i,
        rules: ['ref']
    },
    {
        name: 'buyatoyota.com',
        match: /www.buyatoyota.com/i,
        rules: ['siteid']
    },
    {
        name: 'independent.co.uk',
        match: /www.independent.co.uk/i,
        rules: ['amp', 'regSourceMethod']
    },
    {
        name: 'lenovo.vzew.net',
        match: /lenovo.vzew.net/i,
        redirect: 'u'
    },
    {
        name: 'stats.newswire.com',
        match: /stats.newswire.com/i,
        decode: { param: 'final' }
    },
    {
        name: 'cooking.nytimes.com',
        match: /cooking.nytimes.com/i,
        rules: [
            'smid', 'variant', 'algo', 'req_id', 'surface', 'imp_id',
            'action', 'region', 'module', 'pgType'
        ]
    },
    {
        name: 'optigruen.com',
        match: /www\.optigruen\.[a-z0-9]{0,3}/i,
        rules: ['cHash', 'chash', 'mdrv']
    },
    {
        name: 'osi.rosenberger.com',
        match: /osi.rosenberger.com/i,
        rules: ['cHash', 'chash']
    },
    {
        name: 'cbc.ca',
        match: /cbc.ca/i,
        rules: ['__vfz', 'cmp', 'referrer']
    },
    {
        name: 'local12.com',
        match: /local12.com/i,
        rules: ['_gl']
    },
    {
        name: 'eufylife.com',
        match: /eufylife.com/i,
        rules: ['ref']
    },
    {
        name: 'walmart.com',
        match: /walmart.com/i,
        rules: [
            'athAsset', 'povid', 'wmlspartner', 'athcpid', 'athpgid', 'athznid',
            'athmtid', 'athstid', 'athguid', 'athwpid', 'athtvid', 'athcgid',
            'athieid', 'athancid', 'athbdg', 'campaign_id', 'eventST', 'bt',
            'pos', 'rdf', 'tax', 'plmt', 'mloc', 'pltfm', 'pgId', 'pt', 'spQs',
            'adUid', 'adsRedirect'
        ],
        redirect: 'rd'
    },
    {
        name: 'adclick.g.doubleclick.net',
        match: /adclick.g.doubleclick.net/i,
        redirect: 'adurl'
    },
    {
        name: 'dyno.gg',
        match: /dyno.gg/i,
        rules: ['ref']
    },
    {
        name: 'eufylife.com',
        match: /eufylife.com/i,
        rules: ['ref']
    },
    {
        name: 'connect.studentbeans.com',
        match: /connect.studentbeans.com/i,
        rules: ['ref']
    },
    {
        name: 'urldefense.proofpoint.com',
        match: /urldefense.proofpoint.com/i,
        decode: {
            param: 'u',
            handler: 'urldefense.proofpoint.com'
        }
    },
    {
        name: 'curseforge.com',
        match: /www.curseforge.com/i,
        redirect: 'remoteurl'
    },
    {
        name: 's.pemsrv.com',
        match: /s.pemsrv.com/i,
        rules: [
            'cat', 'idzone', 'type', 'sub', 'block',
            'el', 'tags', 'cookieconsent', 'scr_info'
        ],
        redirect: 'p'
    },
    {
        name: 'chess.com',
        match: /www.chess.com/i,
        rules: ['c']
    },
    {
        name: 'porndude.link',
        match: /porndude.link/i,
        rules: ['ref']
    },
    {
        name: 'xvideos.com',
        match: /xvideos.com/i,
        rules: ['sxcaf']
    },
    {
        name: 'xvideos.red',
        match: /xvideos.red/i,
        rules: ['sxcaf', 'pmsc', 'pmln']
    },
    {
        name: 'xhamster.com',
        match: /xhamster.com/i,
        rules: ['source']
    },
    {
        name: 'patchbot.io',
        match: /patchbot.io/i,
        decode: {
            targetPath: true,
            handler: 'patchbot.io'
        }
    },
    {
        name: 'milkrun.com',
        match: /milkrun.com/i,
        rules: [
            '_branch_match_id',
            '_branch_referrer'
        ]
    },
    {
        name: 'gog.salesmanago.com',
        match: /gog.salesmanago.com/i,
        rules: [
            'smclient', 'smconv', 'smlid'
        ],
        redirect: 'url'
    },
    {
        name: 'dailymail.co.uk',
        match: /dailymail.co.uk/i,
        rules: ['reg_source', 'ito']
    },
    {
        name: 'stardockentertainment.info',
        match: /www.stardockentertainment.info/i,
        decode: {
            targetPath: true,
            handler: 'stardockentertainment.info',
        }
    },
    {
        name: '0yxjo.mjt.lu',
        match: /0yxjo.mjt.lu/i,
        decode: {
            targetPath: true,
            handler: '0yxjo.mjt.lu',
        }
    },
    {
        name: 'click.redditmail.com',
        match: /click.redditmail.com/i,
        decode: {
            targetPath: true,
            handler: 'click.redditmail.com',
        }
    },
    {
        name: 'deals.dominos.co.nz',
        match: /deals.dominos.co.nz/i,
        decode:{
            targetPath: true,
            handler: 'deals.dominos.co.nz'
        }
    },
    {
        name: 'hashnode.com',
        match: /(?:.*\.)?hashnode\.com/i,
        rules: ['source']
    },
    {
        name: 's.amazon-adsystem.com',
        match: /s.amazon-adsystem.com/i,
        rules: ['dsig', 'd', 'ex-fch', 'ex-fargs', 'cb'],
        redirect: 'rd'
    },
    {
        name: 'hypable.com',
        match: /www.hypable.com/i,
        amp: { replace: { text: /amp\/$/gi } }
    },
    {
        name: 'theguardian.com',
        match: /theguardian.com/i,
        amp: {
            replace: {
                text: 'amp.theguardian.com',
                with: 'theguardian.com'
            }
        },
        rules: ['INTCMP', 'acquisitionData', 'REFPVID']
    },
    {
        name: 'indiatoday.in',
        match: /www.indiatoday.in/i,
        amp: {
            replace: {
                text: 'www.indiatoday.in/amp/',
                with: 'www.indiatoday.in/'
            }
        }
    },
    {
        name: 'seek.co.nz',
        match: /www.seek.co.nz/i,
        rules: ['tracking', 'sc_trk']
    },
    {
        name: 'seekvolunteer.co.nz',
        match: /seekvolunteer.co.nz/i,
        rules: ['tracking', 'sc_trk']
    },
    {
        name: 'seekbusiness.com.au',
        match: /www.seekbusiness.com.au/i,
        rules: ['tracking', 'cid']
    },
    {
        name: 'garageclothing.com',
        match: /www.garageclothing.com/i,
        rules: ['syte_ref', 'site_ref']
    },
    {
        name: 'urbandictionary.com',
        match: /urbandictionary.com/i,
        rules: ['amp']
    },
    {
        name: 'norml.org',
        match: /norml.org/i,
        rules: ['amp']
    },
    {
        name: 'nbcconnecticut.com',
        match: /www.nbcconnecticut.com/i,
        rules: ['amp']
    },
    {
        name: 'pbs.org',
        match: /www.pbs.org/i,
        amp: {
            replace: {
                text: 'pbs.org/newshour/amp/',
                with: 'pbs.org/newshour/'
            }
        }
    },
    {
        name: 'm.thewire.in',
        match: /m.thewire.in/i,
        amp: {
            replace: {
                text: 'm.thewire.in/article/',
                with: 'thewire.in/'
            },
            sliceTrailing: '/amp'
        }
    },
    {
        name: 'ladysmithchronicle.com',
        match: /www.ladysmithchronicle.com/i,
        rules: ['ref']
    }
];

module.exports = $kurlc_rules;
