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
