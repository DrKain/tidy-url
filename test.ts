import { TidyURL } from './src';

const tests = [
    'https://poetsroad.bandcamp.com/?from=search&search_item_id=1141951669&search_item_type=b&search_match_part=%3F&search_page_id=1748155363&search_page_no=1&search_rank=1&search_sig=a9a9cbdfc454df7c2999f097dc8a216b',
    'https://www.audible.com/pd/Project-Hail-Mary-Audiobook/B08G9PRS1K?plink=GZIIiCHG0Uo5V8ND&ref=a_hp_c9_adblp13nmpxxp13n-mpl-dt-c_1_2&pf_rd_p=164101a8-2aab-4c5e-91ee-1f39e10719e6&pf_rd_r=2Q5R6VH8HJAD48PSQRS4',
    'https://www.amazon.com/Alexander-Theatre-Sessions-Poets-Fall/dp/B08NT852YT/ref=sr_1_1?dchild=1&keywords=Poets+of+the+fall&qid=1621684985&sr=8-1',
    'https://open.spotify.com/track/1hhZQVLXpg10ySFQFxGbih?si=-k8RwDQwTCK923jxZuy07w&utm_source=copy-link',
    'https://www.aliexpress.com/item/1005001913861188.html?spm=a2g0o.productlist.0.0.b1c55e86sFKsxH&algo_pvid=b4648621-2371-4d1e-9a9c-89b4d6c59395&algo_expid=b4648621-2371-4d1e-9a9c-89b4d6c59395-0&btsid=0b0a556816216865399393168e562d&ws_ab_test=searchweb0_0,searchweb201602_,searchweb201603',
    'https://www.google.com/search?q=cat&source=hp&ei=AwGpYKzyE7uW4-EPy_CnSA&iflsig=AINFCbYAAAAAYKkPE4rmSi0Im0sHgmOVb3DYosyq2B0B&oq=cat&gs_lcp=Cgdnd3Mtd2l6EAMyBQguEJMCMgIILjICCAAyAggAMgIILjICCAAyAggAMgIILjICCC4yAgguOggIABDqAhCPAToLCC4QxwEQowIQkwI6CAguEMcBEKMCUNgEWIQHYMwIaAFwAHgAgAHIAYgB2ASSAQMyLTOYAQCgAQGqAQdnd3Mtd2l6sAEK&sclient=gws-wiz&ved=0ahUKEwjs_9PdrN3wAhU7yzgGHUv4CQkQ4dUDCAY&uact=5',
    'https://www.mightyape.co.nz/search?page=1&r=3386626&utm_content=grd-nz-1195453813162301200&q=Sony',
    'https://www.humblebundle.com/subscription?hmb_campaign=210504_12for12_premium_banner&hmb_medium=banner',
    'https://watch.plex.tv/?plex_utm=1&utm_source=Plex&utm_medium=marketing-site&utm_campaign=Free%20Movies%20%7C%20Watch%20Free%20With%20Plex&origin=marketing',
    'https://www.amazon.com/stores/page/178CFE22-9512-4C2F-BC37-8070B261FDB6&ref_=af_gw_tallhero_apr_katyperry?pf_rd_r=V7VBS6NHY2DK5XE7TRM9&pf_rd_p=de3491ec-f98c-420b-b1b2-d06e1f3b0a48',
    'https://store.steampowered.com/search/?category2=2&snr=1_5_9__423'
];

TidyURL.debug = true;

for (let test of tests) {
    TidyURL.clean(test);
    console.log('\n\n');
}
