// ==UserScript==
// @name         Tidy URL
// @namespace    https://ksir.pw
// @version      1.15.1
// @description  Cleans/removes garbage or tracking parameters from URLs
// @author       Kain (ksir.pw)
// @include      *
// @icon         data:image/gif;base64,R0lGODlhEAAQAMIDAAAAAIAAAP8AAP///////////////////yH5BAEKAAQALAAAAAAQABAAAAMuSLrc/jA+QBUFM2iqA2ZAMAiCNpafFZAs64Fr66aqjGbtC4WkHoU+SUVCLBohCQA7
// @updateURL    https://github.com/DrKain/tidy-url/raw/main/data/tidy.user.js
// @downloadURL  https://github.com/DrKain/tidy-url/raw/main/data/tidy.user.js
// @require      https://github.com/DrKain/tidy-url/raw/main/lib/tidyurl.min.js
// @homepage     https://github.com/DrKain/tidy-url/
// @supportURL   https://github.com/DrKain/tidy-url/issues
// @grant        none
// @run-at       document-start
// ==/UserScript==

// Use a fresh instance of TidyURL
const _tidy = new tidyurl.TidyCleaner();

_tidy.config.setMany({
    // Don't log invalid links
    silent: false,
    // Enable/disable redirect and amp rules
    allowAMP: false,
    allowCustomHandlers: true,
    allowRedirects: true
});

// Set to false if you don't want page links to be cleaned
// If you encounter any problems please report the link on GitHub
// ---> https://github.com/DrKain/tidy-url/issues
const clean_pages = true;
// Used for optimization when there's too many links on a page
const use_optimization = true;
// Number of links on the page before using optimization
const opti_threshold = 100;
const opti_dataname = 'tidyurl';
// Time between each cleanup (in milliseconds)
const clean_interval = 1000;

const log = (msg) => console.log(`[tidy-url] ${msg}`);

(() => {
    const link = _tidy.clean(window.location.href);

    // If the modified URL is different from the original
    if (link.url !== link.info.original) {
        if (link.info.isNewHost) window.location.href = link.url;
        else window.history.pushState('', '', link.url);
    }
})();

(() => {
    let ready = true;
    let last_count = 0;
    let selector = 'a';

    if (!clean_pages) return;

    const do_clean = () => {
        if (ready) {
            ready = false;

            if (use_optimization && last_count >= opti_threshold) {
                selector = `a:not([data-${opti_dataname}])`;
            }

            const links = document.querySelectorAll(selector);
            last_count = links.length;

            // if (links.length > 0) log('Processing ' + links.length + ' links');
            for (const link of links) {
                // Don't clean links that have already been cleaned
                // This is to prevent slowing down pages when there are a lot of links
                // For example, endless scroll on reddit
                if (use_optimization && selector !== 'a') {
                    link.setAttribute(`data-${opti_dataname}`, '1');
                }
                try {
                    // Make sure it's a valid URL
                    new URL(link.href);
                    // Run the cleaner
                    const cleaned = _tidy.clean(link.href);
                    // If the new URL is shorter, apply it
                    if (cleaned.info.reduction > 0) {
                        log('Cleaned: ' + link.href);
                        link.setAttribute('href', cleaned.url);
                    }
                } catch (error) {
                    // Ignore invalid URLs
                }
            }
            setTimeout(() => (ready = true), clean_interval);
        }
    };

    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    const observer = new MutationObserver(do_clean);
    observer.observe(document, { childList: true, subtree: true });
    window.addEventListener('load', () => setInterval(do_clean, clean_interval));
    do_clean();
})();
