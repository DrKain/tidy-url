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
    'https://store.steampowered.com/search/?category2=2&snr=1_5_9__423',
    'https://www.linkedin.com/learning/subscription/products?courseSlug=learning-typescript-2&destRedirectURL=https%3A%2F%2Fwww%2Elinkedin%2Ecom%2Flearning%2Flearning-typescript-2&trk=course_info&upsellTrk=lil_upsell_course_info_subscription&upsellOrderOrigin=homepage-basic_intent-module-learning&upsellTrackingId=61%2B9XTYCSVm%2BXktDSeAPrQ%3D%3D&contextUrn=urn%3Ali%3AlyndaCourse%3A5025110&lipi=urn%3Ali%3Apage%3Ad_learning_course_guest_jsbeacon%3BynyajXiZRAq_y3eoadwhzw',
    'https://learning.linkedin.com/en-us/elearning-solutions-contact-us?disableLocaleAutoRedirect=true&trk=lil-b2b-prod_upx_general&src=enterprise_defensibility_hero',
    'https://twitter.com/PoetsOfTheFall/status/1371420629380034564/photo/1?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1371420629380034564%7Ctwgr%5E%7Ctwcon%5Es1_&ref_url=https%3A%2F%2Fpublish.twitter.com%2F%3Fquery%3Dhttps3A2F2Ftwitter.com2FPoetsOfTheFall2Fstatus2F1371420629380034564widget%3DTweet',
    'https://www.amazon.co.uk/Novacene-Coming-Hyperintelligence-James-Lovelock/dp/0141990791?_encoding=UTF8&qid=1620889178&sr=8-1&linkCode=sl1&tag=tomscottcom-21&linkId=85a56bda850c6eded8c89560592872f4&language=en_GB&ref_=as_li_ss_tl',
    'https://www.humblebundle.com/books/isekai-kodansha-books?mcID=102:610b4f27ac003a12e902e318:ot:5914ac0b66d5d92055543a3e:1&linkID=610b4f2891ccf74a322ba90a&utm_campaign=2021_08_05_isekaikodansha_bookbundle&utm_source=Humble+Bundle+Newsletter&utm_medium=email',
    'https://www.voidu.com/en/battlefield-4-vehicle-shortcut-bundle?utm_campaign=isthereanydeal&utm_content=Battlefield+4:+Vehicle+Shortcut+Bundle&utm_source=isthereanydeal&utm_medium=pricecomp&utm_term=EA&affiliate=isthereanydeal',
    'https://www.wingamestore.com/product/6236/Shadow-Warrior-2/?ars=itad',
    'https://www.gamebillet.com/shadow-warrior-2-n?affiliate=1c8adfeb-78f3-4d89-9a91-5b697ec73e37',
    'https://www.gamesload.com/product.html?REF=817181&affil=33615'
];

TidyURL.debug = true;

for (let test of tests) {
    TidyURL.clean(test);
    console.log('\n\n');
}
