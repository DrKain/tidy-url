// ==UserScript==
// @name         Tidy URL
// @namespace    https://ksir.pw
// @version      1.3.1
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

// Set to false if you don't want page links to be cleaned
// If you encounter any problems please report the link on GitHub
// ---> https://github.com/DrKain/tidy-url/issues
const clean_pages = true;
// Time between each cleanup (in milliseconds)
const clean_interval = 3000;

(() => {
    // Enable/disable redirect and amp rules
    tidyurl.TidyURL.allow_redirects = true;
    tidyurl.TidyURL.allow_amp = false;

    const link = tidyurl.clean(window.location.href);

    // If the modified URL is different from the original
    if (link.url !== link.info.original) {
        if (link.info.is_new_host) window.location.href = link.url;
        else window.history.pushState('', '', link.url);
    }
})();

// Call when page has finished loading
window.addEventListener('load', () => {
    let ready = true;
    if (!clean_pages) return;

    const do_clean = () => {
        if (ready) {
            ready = false;
            const links = document.querySelectorAll('a');
            console.log('[tidy-url] Links: ', links.length);
            for (const link of links) {
                try {
                    // Make sure it's a valid URL
                    new URL(link.href);
                    // Run the cleaner
                    const cleaned = tidyurl.clean(link.href);
                    // If the new URL is shorter, apply it
                    if (cleaned.info.reduction > 0) {
                        console.log('[Tidy URL] Cleaned:', link.href);
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
    do_clean();
});
