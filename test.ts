import { TidyURL } from './src';

/*
TODO: Automated tests for all domains in rules.js

Each url should have an expected ouput, if the cleaned URL does not match the expected output, the test fails.
This would help to ensure that the rules are correct and new rules do not break existing tests.
*/

const tests = [
    'https://google.com',
    'https://duckduckgo.com/this-is-fine',
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
    'https://www.gamesload.com/product.html?REF=817181&affil=33615',
    'https://music.apple.com/nz/search?at=11lEW&ct=4kg73k%7Cyoutube.com&ls=1&term=Poets%20of%20the%20fall&uo=4',
    'https://play.google.com/store/apps/details?id=com.soundcloud.android&hl=us&referrer=utm_source%3Dsoundcloud%26utm_medium%3Dweb%26utm_campaign%3Dweb_xsell_listen_page',
    'https://www.imdb.com/title/tt0111161/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=e31d89dd-322d-4646-8962-327b42fe94b1&pf_rd_r=7VNM3EBA521CRZ4JNT86&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_tt_1',
    'https://www.amazon.com/dp/B01JA49DI6/?coliid=I1HVWIICNZWQTZ&colid=107BE3PYAUBOA&psc=1',
    'https://track.adtraction.com/t/t?a=1578845458&as=1605593256&t=2&tk=1&url=http%3A%2F%2Fwww.gog.com%2Fgame%2Fcyberpunk_2077',
    'http://www.dpbolvw.net/click-6305441-10912384?URL=https%3A%2F%2Fwww.greenmangaming.com%2Fgames%2Fbattle-brothers%2F',
    'https://not-a-real.itch.io/just-a-test-link?fbclid=IwAR2mlVUJ9y8WB92ubp9088bogz6eboZaBhXKhh0n1hIveHXMyif5dQmtS1s',
    'https://www.google.com/search?q=cat&tbm=isch#imgrc=yLEFuCVfjYdk0M',
    'https://steamcommunity.com/linkfilter/?url=https://github.com/d0sboots/PerfectTower#factory-management-scripts',
    'https://steamcommunity.com/sharedfiles/filedetails/?id=2553845625',
    'https://duckduckgo.com/?q=%F0%9F%94%A5&t=newext&atb=v250-1&ia=answer',
    'https://www.mgm.com/results/view%20to%20a%20kill#/our-titles/2101/A-View-to-a-Kill',
    'https://account.microsoft.com/?refd=www.minecraft.net',
    'https://www.aliexpress.com/item/32964243189.html?algo_exp_id=f37c6199-8083-4ecd-a312-801da89e5b1e-19&pdp_ext_f=%7B%22sku_id%22%3A%2210000001822380708%22%7D',
    'https://www.aliexpress.com/item/4000030496731.html?sourceType=fd&utparam=%257B%2522process_id%2522%253A%2522110%2522%252C%2522x_object_type%2522%253A%2522product%2522%252C%2522pvid%2522%253A%25227a9d1c0b-cb2a-4128-820c-64f170a14f1d%2522%252C%2522belongs%2522%253A%255B%257B%2522id%2522%253A%25224001%2522%252C%2522type%2522%253A%2522dataset%2522%257D%255D%252C%2522scm%2522%253A%25221007.28480.226530.0%2522%252C%2522tpp_buckets%2522%253A%252221669%25230%2523186385%252383_21669%25234190%252319162%2523431_15324%25230%2523132599%25234%2522%252C%2522x_object_id%2522%253A%25224000030496731%2522%257D',
    // sku_id is automatically added even when purged
    'https://aliexpress.ru/item/1005003170671440.html?gatewayAdapt=glo2rus&spm=a2g2w.home.15002.76.5a50501dwThjGw&_evo_buckets=165609,165598,188873,224373,176818,194275&sku_id=12000024476377327&gps-id=pcJustForYou&scm=1007.13562.265877.0&scm_id=1007.13562.265877.0&scm-url=1007.13562.265877.0&pvid=ed2b99b7-359e-4c84-8a13-761e16c1d360&_t=gps-id:pcJustForYou,scm-url:1007.13562.265877.0,pvid:ed2b99b7-359e-4c84-8a13-761e16c1d360,tpp_buckets:21387%230%23250274%230#/',
    'https://www.tiktok.com/@1234/video/1234?language=en&sec_user_id=1111&share_app_id=1111&share_item_id=1111&share_link_id=1111&social_sharing=v4&_r=1',
    'https://www.amazon.es/Lacoste-Anal%C3%B3gico-Hombre-Cuarzo-2011016/dp/B07ND9N75K/?_encoding=UTF8&pd_rd_w=WtRtx&pf_rd_p=79b177d9-dec3-4902-8a80-f2ea2453e768&pf_rd_r=MDD53XXF52Q1F8PNPC3K&pd_rd_r=be654e33-0438-4811-930e-79191be4bab7&pd_rd_wg=tX5gT&ref_=pd_gw_unk&tag=atrapazon-21',
    'https://www.ebay.es/itm/284730185104?mkevt=1&mkcid=1&mkrid=1185-53479-19255-0&campid=5338467301&toolid=20012',
    'https://pages.ebay.es/cupon/2022/DECORA22/index.html?mkcid=1&mkrid=1185-53479-19255-0&siteid=186&campid=5338628502&customid=&toolid=10001&mkevt=1',
    'https://www.ebay.es/itm/373960634437?ff3=4&pub=5575101662&toolid=10001&campid=5338578859&customid=&mkevt=1&mkcid=1&mkrid=1185-53479-19255-0&ufes_redirect=true',
    'https://www.ebay.com/itm/143955818593?epid=21050187227&amdata=enc%3AAQAGAAAA8OtasjTDufIfupkvLtPPuyz8D02cY4ovHl%2FDR%2B7nYteaFlCcFu4Fwf8KSCn%2FdIUiMuhu28fyi9uewenJBLBg4FsBtuk83Jcgs2aNcYz4wUevAXhdxFJmLJZfS3fuQokHREG6eM4JebxpeN%2BNjiEFF9%2FXEboUJSM%2FljocvBpt1psFd1FKxLVm6XyUrUr8MtOGHY%2BCXiHFGCpte%2BXtooTMfqA3kXOtuUaMAoJBvMutTE6HuJFre4RBvGu%2Fs80Px%2BSn%2FS3tvgOxyLh4etB2UXxDAAaqEmh9yJbLigy2SFb62b5d1nZ17BgYdPNzwpuOWraYGg%3D%3D%7Ctkp%3ABFBM1LKyvv1f',
    // This should not be modified, all parameters here are valid
    'https://www.ebay.com/sch/i.html?_nkw=%28%22paint%22%2C%22paints%22%29+-cotman+watercolor+-oil&_sacat=28113&LH_TitleDesc=1&LH_TitleDesc=1&_fsrp=1&LH_TitleDesc=1&Brand=Winsor%2520%2526%2520Newton&Color=Multicolor&_dcat=28113&rt=nc&LH_ItemCondition=1000',
    'https://shopee.es/Tap%C3%B3n-De-Boca-De-Aceite-De-Oliva-Vino-Tinto-A-Prueba-De-Polvo-2-Piezas-Boquilla-i.569147984.12741241980?utm_source=an_22220520000&utm_medium=affiliates&utm_campaign=0hag3wq44j-&utm_content=583003-d4e5229598d31e1281f14414b6b1802b---&af_siteid=an_22220520000&pid=affiliates&af_click_lookback=7d&af_viewthrough_lookback=1d&is_retargeting=true&af_reengagement_window=7d&af_sub_siteid=583003-d4e5229598d31e1281f14414b6b1802b---&c=0hag3wq44j-',
    'https://www.msn.com/en-nz/news/national/gower-reveals-the-question-david-seymour-needs-to-answer-on-m%C4%81ori-co-governance/ar-AAVLTsD?ocid=msedgdhp&pc=U531&cvid=4121aaf9026f43309f3d08aa98e26abd',
    'https://www.msn.com/en-nz/feed?ocid=msedgdhp&pc=U531&cvid=4121aaf9026f43309f3d08aa98e26abd&locale=en-nz',
    'https://www.nuuvem.com/item/hidden-deep?ranMID=46796&ranEAID=cVR20kC0FGg&ranSiteID=cVR20kC0FGg-bG2DHfJcgX0enio2bPB5VQ',
    'https://greenmangaming.sjv.io/c/2545989/1281797/15105?u=https%3A%2F%2Fwww.greenmangaming.com%2Fgames%2Fhidden-deep-pc%2F',
    'https://click.linksynergy.com/deeplink?id=cVR20kC0FGg&mid=46796&murl=https%3A%2F%2Fwww.nuuvem.com%2Fitem%2Fhidden-deep',
    // Test where two parameters of the same name are present
    'https://anilist.co/search/manga?genres=Battle%20Royale&genres=Gore&utm_source=tidy-url',
    'https://es.aliexpress.com/item/1005002575990898.html?**pdp_ext_f=%7B%22ship_from%22:%22PL%22,%22sku_id%22:%2212000027510692600%22%7D**&&scm=1007.25281.272687.0&scm_id=1007.25281.272687.0&scm-url=1007.25281.272687.0&pvid=e2673f2f-0aac-499f-b348-194a89547a3d&utparam=%257B%2522process_id%2522%253A%25221%2522%252C%2522x_object_type%2522%253A%2522product%2522%252C%2522pvid%2522%253A%2522e2673f2f-0aac-499f-b348-194a89547a3d%2522%252C%2522belongs%2522%253A%255B%257B%2522floor_id%2522%253A%252223811812%2522%252C%2522id%2522%253A%2522968188%2522%252C%2522type%2522%253A%2522dataset%2522%257D%252C%257B%2522id_list%2522%253A%255B%25221000072031%2522%255D%252C%2522type%2522%253A%2522gbrain%2522%257D%255D%252C%2522pageSize%2522%253A%252212%2522%252C%2522language%2522%253A%2522es%2522%252C%2522scm%2522%253A%25221007.25281.272687.0%2522%252C%2522countryId%2522%253A%2522ES%2522%252C%2522scene%2522%253A%2522TopSelection-Waterfall%2522%252C%2522tpp_buckets%2522%253A%252221669%25230%2523265320%25235_21669%25234190%252319159%2523181_15281%25230%2523272687%25236%2522%252C%2522x_object_id%2522%253A%25221005002575990898%2522%257D',
    'https://www.greenmangaming.com/games/watch-dogs-2/?irclickid=2j0WETQXbxyITJW0fEwxs2ifUkGXIJ02HUbKxg0&irgwc=1',
    'https://www.cnbc.com/2022/04/25/twitter-accepts-elon-musks-buyout-deal.html?__source=iosappshare%7Ccom.apple.UIKit.activity.Message',
    // Unfortunately, this abomination seems to be valid
    'https://finance.yahoo.com/quote/NFLX/chart/?guccounter=1&guce_referrer=aHR0cHM6Ly9kdWNrZHVja2dvLmNvbS8&guce_referrer_sig=AQAAAF9FfW3JNh4lJE6j-fHCy6UW5RLpAtmQpHz7QBLr_fysH92XxXu9wfexiOdFdo7Ggm-XW5HTTKQEkVhS_Xf5wTxPpD33vZR5I_YbId299c9DHy9h8w-EBlXKbr08a_0cnBkObTl1NUt2N7CphtSwMTQQQRIjL6Sh1_CHQcWzOOBZ#eyJpbnRlcnZhbCI6ImRheSIsInBlcmlvZGljaXR5IjoxLCJ0aW1lVW5pdCI6bnVsbCwiY2FuZGxlV2lkdGgiOjEsImZsaXBwZWQiOmZhbHNlLCJ2b2x1bWVVbmRlcmxheSI6dHJ1ZSwiYWRqIjp0cnVlLCJjcm9zc2hhaXIiOnRydWUsImNoYXJ0VHlwZSI6ImxpbmUiLCJleHRlbmRlZCI6ZmFsc2UsIm1hcmtldFNlc3Npb25zIjp7fSwiYWdncmVnYXRpb25UeXBlIjoib2hsYyIsImNoYXJ0U2NhbGUiOiJsaW5lYXIiLCJzdHVkaWVzIjp7IuKAjHZvbCB1bmRy4oCMIjp7InR5cGUiOiJ2b2wgdW5kciIsImlucHV0cyI6eyJpZCI6IuKAjHZvbCB1bmRy4oCMIiwiZGlzcGxheSI6IuKAjHZvbCB1bmRy4oCMIn0sIm91dHB1dHMiOnsiVXAgVm9sdW1lIjoiIzAwYjA2MSIsIkRvd24gVm9sdW1lIjoiI2ZmMzMzYSJ9LCJwYW5lbCI6ImNoYXJ0IiwicGFyYW1ldGVycyI6eyJ3aWR0aEZhY3RvciI6MC40NSwiY2hhcnROYW1lIjoiY2hhcnQifX19LCJwYW5lbHMiOnsiY2hhcnQiOnsicGVyY2VudCI6MSwiZGlzcGxheSI6Ik5GTFgiLCJjaGFydE5hbWUiOiJjaGFydCIsImluZGV4IjowLCJ5QXhpcyI6eyJuYW1lIjoiY2hhcnQiLCJwb3NpdGlvbiI6bnVsbH0sInlheGlzTEhTIjpbXSwieWF4aXNSSFMiOlsiY2hhcnQiLCLigIx2b2wgdW5kcuKAjCJdfX0sInNldFNwYW4iOm51bGwsImxpbmVXaWR0aCI6Miwic3RyaXBlZEJhY2tncm91bmQiOnRydWUsImV2ZW50cyI6dHJ1ZSwiY29sb3IiOiIjMDA4MWYyIiwic3RyaXBlZEJhY2tncm91ZCI6dHJ1ZSwiZXZlbnRNYXAiOnsiY29ycG9yYXRlIjp7ImRpdnMiOnRydWUsInNwbGl0cyI6dHJ1ZX0sInNpZ0RldiI6e319LCJyYW5nZSI6bnVsbCwic3ltYm9scyI6W3sic3ltYm9sIjoiTkZMWCIsInN5bWJvbE9iamVjdCI6eyJzeW1ib2wiOiJORkxYIiwicXVvdGVUeXBlIjoiRVFVSVRZIiwiZXhjaGFuZ2VUaW1lWm9uZSI6IkFtZXJpY2EvTmV3X1lvcmsifSwicGVyaW9kaWNpdHkiOjEsImludGVydmFsIjoiZGF5IiwidGltZVVuaXQiOm51bGwsInNldFNwYW4iOm51bGx9XX0-',
    'https://techcrunch.com/2021/09/06/protonmail-logged-ip-address-of-french-activist-after-order-by-swiss-authorities/?guccounter=1&guce_referrer=aHR0cHM6Ly93d3cudGhldmVyZ2UuY29tLw&guce_referrer_sig=AQAAACslNIKX-0gBqFYP-1Hxyu1dg80OojvZLtLOB_INlDDOKr329PlngC2kl47UPRUIQUJc3UuI2QKDYWO0hMtQf9FlbwYVQYL7QeduG-MFnR5ZDxj-slnW77Q0K8dcJw0RKeL_uNDu13IavEaNk07JCQdt1OJYPAH6sjCnYkbb-8rt',
    'https://www.facebook.com/marketplace/item/1030767454337102/?referral_code=marketplace_top_picks&referral_story_type=top_picks&tracking=%7B%22qid%22%3A%22-7798517114374619577%22%2C%22mf_story_key%22%3A%22532089594268198849%22%2C%22commerce_rank_obj%22%3A%22%7B%5C%22target_id%5C%22%3A532089594268198849%2C%5C%22target_type%5C%22%3A6%2C%5C%22primary_position%5C%22%3A0%2C%5C%22ranking_signature%5C%22%3A1966095020037505024%2C%5C%22commerce_channel%5C%22%3A501%2C%5C%22value%5C%22%3A0%2C%5C%22upsell_type%5C%22%3A21%2C%5C%22grouping_info%5C%22%3Anull%7D%22%7D',
    'https://www.office.com/?from=OfficeKey',
    'https://www.microsoft.com/en-nz/d/surface-laptop-studio/8SRDF62SWKPF?icid=MSCOM_Hero_2_Surface_Laptop_Studio_270422_en_NZ&activetab=pivot:overviewtab',
    'https://help.ticketmaster.co.nz/hc/en-nz/articles/360019056077-Rescheduled-Cancelled-Events?int_cmp_name=Cancelled-and-Altered-Events&int_cmp_id=NZ-Home-750&int_cmp_creative=Home-featured-1&tm_link=tm_ccp_Home_featured_Cancelled-and-Altered-Events',
    'https://www.bostonglobe.com/2022/05/03/opinion/supreme-court-abortion-opinion-could-strip-other-rights/?p1=Article_Recirc_Most_Popular',
    // Very basic AMP support. You can disable this with allow_amp = true
    'https://www.google.com/amp/s/www.bostonglobe.com/lifestyle/style/2014/01/11/the-ice-rink-becomes-runway-for-female-figure-skaters/ZfSFpCEEKGGPrwzAcvnGRN/story.html',
    'https://www.google.com/amp/s/www.hitc.com/en-gb/2022/04/28/how-much-did-amber-heard-get-paid-for-aquaman/%3Famp',
    'https://www.newsweek.com/mexican-drug-cartels-asked-russia-arms-dealers-help-shooting-down-us-1234167?amp=1',
    'https://www.google.com/amp/s/amp.abc.net.au/article/100344174',
    'https://www.google.com/amp/s/www.the-sun.com/news/uk-news/1105742/johnny-depp-dog-window-amber-heard-laughed/amp/',
    // Test links found at https://www.reddit.com/domain/cdn.ampproject.org/
    'https://www-express-co-uk.cdn.ampproject.org/v/s/www.express.co.uk/entertainment/gaming/1605383/Best-co-op-games-Tiny-Tina-Wonderlands-It-Takes-Two-Overcooked-Streets-of-Rage-4/amp?amp_gsa=1&amp_js_v=a9&usqp=mq331AQIKAGwASCAAgM%3D#amp_tf=From%20%251%24s&aoh=16518029234618&csi=0&referrer=https%3A%2F%2Fwww.google.com&ampshare=https%3A%2F%2Fwww.express.co.uk%2Fentertainment%2Fgaming%2F1605383%2FBest-co-op-games-Tiny-Tina-Wonderlands-It-Takes-Two-Overcooked-Streets-of-Rage-4',
    'https://ktul-com.cdn.ampproject.org/v/s/ktul.com/amp/news/local/lyft-to-pay-any-legal-fees-for-drivers-sued-under-oklahoma-senate-bill-1503?amp_gsa=1&amp_js_v=a9&usqp=mq331AQIKAGwASCAAgM%3D#amp_tf=From%20%251%24s&aoh=16516640144781&csi=0&referrer=https%3A%2F%2Fwww.google.com&ampshare=https%3A%2F%2Fktul.com%2Fnews%2Flocal%2Flyft-to-pay-any-legal-fees-for-drivers-sued-under-oklahoma-senate-bill-1503',
    'https://amp-theguardian-com.cdn.ampproject.org/v/s/amp.theguardian.com/world/2022/apr/29/hgv-manufacturers-race-to-decarbonise-trucks-lorries-carbon-footprint-uk?amp_js_v=a6&amp_gsa=1&usqp=mq331AQIKAGwASCAAgM%3D#aoh=16517391501217&csi=0&referrer=https%3A%2F%2Fwww.google.com&amp_tf=From%20%251%24s&ampshare=https%3A%2F%2Fwww.theguardian.com%2Fworld%2F2022%2Fapr%2F29%2Fhgv-manufacturers-race-to-decarbonise-trucks-lorries-carbon-footprint-uk',
    'https://andscape-com.cdn.ampproject.org/v/s/andscape.com/features/p-j-tucker-explains-heat-culture-feeling-good-at-36-pat-riley-and-why-hes-the-nbas-wine-king/amp/?amp_gsa=1&amp_js_v=a9&usqp=mq331AQKKAFQArABIIACAw%3D%3D#amp_tf=From%20%251%24s&aoh=16516717220866&referrer=https%3A%2F%2Fwww.google.com&ampshare=https%3A%2F%2Fandscape.com%2Ffeatures%2Fp-j-tucker-explains-heat-culture-feeling-good-at-36-pat-riley-and-why-hes-the-nbas-wine-king%2F',
    'https://www-aljazeera-com.cdn.ampproject.org/v/s/www.aljazeera.com/amp/news/2022/5/3/myanmar-regime-condemns-malaysia-call-for-asean-to-work-with-nug?amp_js_v=a6&amp_gsa=1&usqp=mq331AQIKAGwASCAAgM%3D#aoh=16516490670287&csi=0&referrer=https%3A%2F%2Fwww.google.com&amp_tf=From%20%251%24s&ampshare=https%3A%2F%2Fwww.aljazeera.com%2Fnews%2F2022%2F5%2F3%2Fmyanmar-regime-condemns-malaysia-call-for-asean-to-work-with-nug',
    'https://www-inquirer-com.cdn.ampproject.org/v/s/www.inquirer.com/news/edsaul-mendoza-philly-police-charged-murder-thomas-tj-siderio-20220502.html?amp_js_v=a6&amp_gsa=1&outputType=amp&usqp=mq331AQKKAFQArABIIACAw%3D%3D#aoh=16515090761779&referrer=https%3A%2F%2Fwww.google.com&amp_tf=From%20%251%24s&ampshare=https%3A%2F%2Fwww.inquirer.com%2Fnews%2Fedsaul-mendoza-philly-police-charged-murder-thomas-tj-siderio-20220502.html',
    // Back to other tests
    'https://www.ebay.com/itm/264921790801?ssspo=l-u9Sc6sTHC&sssrc=2349624&ssuid=&widget_ver=artemis&media=COPY',
    'https://www.nbcnews.com/tech/tech-news/library-apps-book-ban-schools-conservative-parents-rcna26103?fbclid=IwAR3grwjabekSPvO1hM7akI8O5ouUxtTNtKMta3hOfFGTJ1eJYo5DXYeX_qM',
    'https://www.countdown.co.nz/shop/specials/frozen?promo_position=Special%20Hub%20Tiles&promo_creative=Tile&promo_name=FY2247%20-%20Freezer%20Specials&itemID=Freezer%20Specials'
];

for (const test of tests) {
    const link = TidyURL.clean(test);

    // New options added in 1.2.8
    TidyURL.allow_amp = false;
    TidyURL.allow_redirects = true;

    // All tests should pass before publishing
    if (link.info.reduction < 0) {
        console.log(link.url);
        throw Error('Reduction less than 0');
    }

    // If last, log params
    if (test === tests[tests.length - 1]) {
        console.log(new URL(test).searchParams);
    }

    console.log('Input: ' + link.info.original);
    console.log('Clean: ' + link.url);
    console.log('New Host: ' + link.info.is_new_host);
    console.log(`${link.info.reduction}% smaller (${link.info.difference} characters)\n\n`);
}
