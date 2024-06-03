# [![Tidy-URL](text-logo.png)](#)

A Node Package & Userscript that removes tracking or garbage parameters from URLs making them shorter, cleaner and a lot nicer to read.

[![NPM](https://img.shields.io/npm/v/tidy-url)](https://www.npmjs.com/package/tidy-url)
[![NPM](https://img.shields.io/npm/dt/tidy-url)](https://www.npmjs.com/package/tidy-url)
[![NPM](https://img.shields.io/npm/types/tidy-url)](https://www.npmjs.com/package/tidy-url)

## Install:

You can use this automatically in the browser with the [userscript](https://github.com/DrKain/tidy-url/wiki/Userscript).

-   [Node Package Manager](https://github.com/DrKain/tidy-url/wiki/Node-Package) (NPM)
-   [Browser](https://github.com/DrKain/tidy-url/wiki/Userscript) (userscript)
-   [jsDelivr](https://github.com/DrKain/tidy-url/wiki/jsDelivr)

## NodeJS

```
npm install tidy-url
```

### Require

```js
import { TidyURL } from 'tidy-url';
// or
const { TidyURL } = require('tidy-url');
```

### Usage

Then pass it a URL and let the magic happen:

```js
const link = TidyURL.clean('https://open.spotify.com/track/1hhZQVLXpg10ySFQFxGbih?si=-k8RwDQwTCK923jxZuy07w&utm_source=copy-link');
console.log(link.url); // https://open.spotify.com/track/1hhZQVLXpg10ySFQFxGbih
```

### Validating

You can validate a URL using the `validate` function.

```js
TidyURL.validate('https://example.com'); // true
TidyURL.validate('cat'); // false
TidyURL.validate('google.com'); // false (protocol is required!)
```

### AMP & Redirects

By default, tidy-url will remove redirect parameters and AMP links if the rule supports it.  
You can disable this feature with `allowRedirects` and `allowAMP`.
Examples:

```ts
// These are the defaults.
TidyURL.config.setMany({
    allowAMP: false,
    allowRedirects: true
});

TidyURL.clean('https://www.google.com/amp/s/github.com');
TidyURL.clean('https://steamcommunity.com/linkfilter/?url=https://github.com');
// Result for both: https://github.com
```

_More info about AMP on [the wiki](https://github.com/DrKain/tidy-url/wiki/AMP-Links)_.

### Note

You will always receive a valid response, even if nothing was modified. For example:

```js
const link = TidyURL.clean('https://duckduckgo.com/this-is-fine');

link.url; // https://duckduckgo.com/this-is-fine
link.info.reduction; // 0 (percent)
```

### Supported Sites

You can view all custom supported sites [here](https://github.com/DrKain/tidy-url/wiki/Supported-Sites).  
However, the global rules will be enough to work with thousands of sites around the internet. You should be able to pass any URL for cleaning.  
Request direct support for a website [here](https://github.com/DrKain/tidy-url/issues/new?assignees=&labels=&template=add-website.md&title=Website%3A+example.com)

### Response

The response will always be an object with details of what was cleaned or modified in the URL.  
This can be used for debugging, testing or a simple way of letting users know they could have sent a shorter link.

```json
{
    "url": "https://open.spotify.com/track/1hhZQVLXpg10ySFQFxGbih",
    "info": {
        "original": "https://open.spotify.com/track/1hhZQVLXpg10ySFQFxGbih?si=-k8RwDQwTCK923jxZuy07w&utm_source=copy-link",
        "reduction": 47,
        "difference": 47,
        "replace": [],
        "removed": [
            {
                "key": "utm_source",
                "value": "copy-link"
            },
            {
                "key": "si",
                "value": "-k8RwDQwTCK923jxZuy07w"
            }
        ],
        "match": [
            {
                "rules": ["si", "utm_source", "context"],
                "replace": [],
                "redirect": "",
                "name": "spotify.com",
                "match": "/open.spotify.com/i"
            }
        ],
        "decoded": null,
        "isNewHost": false,
        "fullClean": true
    }
}
```

### Example

Turn these monstrosities:

```
https://poetsroad.bandcamp.com/?from=search&search_item_id=1141951669&search_item_type=b&search_match_part=%3F&search_page_id=1748155363&search_page_no=1&search_rank=1&search_sig=a9a9cbdfc454df7c2999f097dc8a216b

https://www.audible.com/pd/Project-Hail-Mary-Audiobook/B08G9PRS1K?plink=GZIIiCHG0Uo5V8ND&ref=a_hp_c9_adblp13nmpxxp13n-mpl-dt-c_1_2&pf_rd_p=164101a8-2aab-4c5e-91ee-1f39e10719e6&pf_rd_r=2Q5R6VH8HJAD48PSQRS4

https://www.amazon.com/Alexander-Theatre-Sessions-Poets-Fall/dp/B08NT852YT/ref=sr_1_1?dchild=1&keywords=Poets+of+the+fall&qid=1621684985&sr=8-1

https://open.spotify.com/track/1hhZQVLXpg10ySFQFxGbih?si=-k8RwDQwTCK923jxZuy07w&utm_source=copy-link

https://www.aliexpress.com/item/1005001913861188.html?spm=a2g0o.productlist.0.0.b1c55e86sFKsxH&algo_pvid=b4648621-2371-4d1e-9a9c-89b4d6c59395&algo_expid=b4648621-2371-4d1e-9a9c-89b4d6c59395-0&btsid=0b0a556816216865399393168e562d&ws_ab_test=searchweb0_0,searchweb201602_,searchweb201603_

https://www.google.com/search?q=cat&source=hp&ei=AwGpYKzyE7uW4-EPy_CnSA&iflsig=AINFCbYAAAAAYKkPE4rmSi0Im0sHgmOVb3DYosyq2B0B&oq=cat&gs_lcp=Cgdnd3Mtd2l6EAMyBQguEJMCMgIILjICCAAyAggAMgIILjICCAAyAggAMgIILjICCC4yAgguOggIABDqAhCPAToLCC4QxwEQowIQkwI6CAguEMcBEKMCUNgEWIQHYMwIaAFwAHgAgAHIAYgB2ASSAQMyLTOYAQCgAQGqAQdnd3Mtd2l6sAEK&sclient=gws-wiz&ved=0ahUKEwjs_9PdrN3wAhU7yzgGHUv4CQkQ4dUDCAY&uact=5

https://www.emjcd.com/links-i/?d=eyJzdXJmZXIiOiIxMDAzMDQ3Mjg5ODMzODAxMDI6VlBTbFlUN3JBeHpsIiwibGFzdENsaWNrTmFtZSI6IkxDTEsiLCJsYXN0Q2xpY2tWYWx1ZSI6ImNqbyF4aTU5LXZ0Zm1nOTkiLCJkZXN0aW5hdGlvblVybCI6Imh0dHBzOi8vd3d3LnZ1ZHUuY29tL2NvbnRlbnQvbW92aWVzL2RldGFpbHMvTW9vbmxpZ2h0LVNlYXNvbi0xLzEzMzEyMCIsInNpZCI6IltzdWJpZF92YWx1ZV0iLCJ0eXBlIjoiZGxnIiwicGlkIjo5MDExNjczLCJldmVudElkIjoiMGFjZGE1ZDdmNzNlMTFlYzgyYWM3NDliMGExYzBlMGUiLCJjalNlc3Npb24iOiIyZjBjNGNjYi1lNmVmLTQ0YzItYjIzYy02NzNjZjY2MTZlMTYiLCJsb3lhbHR5RXhwaXJhdGlvbiI6MCwicmVkaXJlY3RlZFRvTGl2ZXJhbXAiOmZhbHNlLCJjakNvbnNlbnRFbnVtIjoiTkVWRVJfQVNLRUQifQ%3D%3D

https://www.youtube.com/redirect?event=video_description&redir_token=QCFCLUhqbUVVVVc2Vm53OGdFMi15NU1vSzloWkZveGcyUXxBQ3Jtc0tsR143azQxRVpxZ3lUampXUEkyaTdpdy1reU1OVGcyb3pmOUhzU22Ldm5QZ0tueEMzMy1TQTA1Mm85SEpCUW14UHlq11ZCUVlhU3QzdW52U2Uyd01pbTVINDRjNlhf124ySEZqMHBJbnFEWDdiMTNUVQ&q=https%3A%2F%2Ftomscott.com%2F&v=k7fXbdRH9v4
```

Into these:

```
https://poetsroad.bandcamp.com/

https://www.audible.com/pd/Project-Hail-Mary-Audiobook/B08G9PRS1K

https://www.amazon.com/Alexander-Theatre-Sessions-Poets-Fall/dp/B08NT852YT

https://open.spotify.com/track/1hhZQVLXpg10ySFQFxGbih

https://www.aliexpress.com/item/1005001913861188.html

https://www.google.com/search?q=cat

https://www.vudu.com/content/movies/details/Moonlight-Season-1/133120

https://tomscott.com/
```

## 🤝 Contributing

Contributions, issues and feature requests are welcome and greatly appreciated!  
Feel free to check [issues page](https://github.com/DrKain/tidy-url/issues).
If you find a website that is not supported, please create an issue and I'll be more than happy to add it.

## 👤 Author

This project was made by **Kain (ksir.pw)**  
Feel free to contact me if you have any trouble with this package.

-   Website: [ksir.pw](https://ksir.pw)
-   Github: [@DrKain](https://github.com/DrKain)
-   Discord: drkain
