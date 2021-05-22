## ♡ Kain's URL Cleaner

Removes tracking or garbage parameters from URLs making them shorter, cleaner and a lot nicer to read.  
This is a personal userscript I made to remove garbage parameters from URLs I visit.

### Install

1. Install Tampermonkey for [Chrome, Microsoft Edge, Safari, Opera Next or Firefox](https://www.tampermonkey.net/)
2. Click [this link](https://github.com/DrKain/url-cleaner/raw/main/cleaner.user.js)
3. Done

### How it works

Simply reads each [URL Parameter](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) and deletes them if they're in the list of bad parameters. Regex is used to match the host and the page will only redirect if one or more search parameter has been deleted.  
Some parameters are useful and required by websites to function so this helps avoid accidentally breaking pages.
In some cases the URL itself needs to be modified.

### Example

Turn these monstrosities:

```
https://poetsroad.bandcamp.com/?from=search&search_item_id=1141951669&search_item_type=b&search_match_part=%3F&search_page_id=1748155363&search_page_no=1&search_rank=1&search_sig=a9a9cbdfc454df7c2999f097dc8a216b

https://www.audible.com/pd/Project-Hail-Mary-Audiobook/B08G9PRS1K?plink=GZIIiCHG0Uo5V8ND&ref=a_hp_c9_adblp13nmpxxp13n-mpl-dt-c_1_2&pf_rd_p=164101a8-2aab-4c5e-91ee-1f39e10719e6&pf_rd_r=2Q5R6VH8HJAD48PSQRS4

https://www.amazon.com/Alexander-Theatre-Sessions-Poets-Fall/dp/B08NT852YT/ref=sr_1_1?dchild=1&keywords=Poets+of+the+fall&qid=1621684985&sr=8-1

https://open.spotify.com/track/1hhZQVLXpg10ySFQFxGbih?si=-k8RwDQwTCK923jxZuy07w&utm_source=copy-link
```

Into these:

```
https://poetsroad.bandcamp.com/

https://www.audible.com/pd/Project-Hail-Mary-Audiobook/B08G9PRS1K

https://www.amazon.com/Alexander-Theatre-Sessions-Poets-Fall/dp/B08NT852YT

https://open.spotify.com/track/1hhZQVLXpg10ySFQFxGbih
```

### Contributing

Want to help? Feel free to create a PR adding a new website or parameter to remove.
