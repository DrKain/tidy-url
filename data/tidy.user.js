// ==UserScript==
// @name         Tidy URL
// @namespace    https://ksir.pw
// @version      1.2.1
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

(() => {
    const link = tidyurl.clean(window.location.href);
    if (link.url !== link.info.original) window.history.pushState('', '', link.url);
})();
