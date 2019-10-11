// ==UserScript==
// @name         OPR dark look and feel
// @namespace    pl.enux.opr
// @version      0.0.1
// @description  Dark skin for OPR aka Niantic Wayfarer (portal reviews)
// @author       Eccenux
// @match        https://wayfarer.nianticlabs.com/*
// @run-at       document-start
// @grant        GM_addStyle
// ==/UserScript==

/**
	Add CSS.
*/
function addCss() {

    // base CSS
    var cssText = `
:root {
  --happy-headers-color: #ecdcb5;
  --darkened-background: #ccc;
}
// Font friendly to other countries (not just US :-/)
.text-input.text-input, body, h3, html {
  font-family: Roboto,sans-serif;
}
// header and loader
.header,
.niantic-loader {
  background: var(--darkened-background);
}
`;

    // most pages -- make a bit darker
    if (location.pathname.search(/^\/(review|profile)?$/) < 0) {
        cssText += `
// general darkness
body,#gallery-info {
  background: var(--darkened-background);
  color: black;
}
`;
    // more important pages -- make dark
    } else {
        cssText += `
// general darkness
body,#gallery-info {
  background: #0f0f0f;
  color: whitesmoke;
}

// most titles
h3 {
  color: var(--happy-headers-color);
}

// dialogs
.modal-dialog {
  color: black;
}

// nick on profile
#chart-contain > h1 {
  color: var(--happy-headers-color);
}
#profile-stats {
  color: whitesmoke;
}

// review cards
.card {
  background: var(--darkened-background);
  color: black;
}
.supporting-statement-central-field,
.supporting-central-field {
  background: var(--darkened-background);
}
// review location change
.known-information-card {
  overflow-y: auto;
}

`;
}

    GM_addStyle(cssText.replace(/\/\/.+/g, ''));
}
addCss();
