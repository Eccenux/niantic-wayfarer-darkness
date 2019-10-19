// ==UserScript==
// @name         OPR dark look and feel
// @namespace    pl.enux.opr
// @version      0.2.0
// @description  Dark skin for OPR aka Niantic Wayfarer (portal reviews)
// @author       Eccenux
// @match        https://wayfarer.nianticlabs.com/*
// @run-at       document-start
// @grant        GM_addStyle
// @updateURL    https://github.com/Eccenux/niantic-wayfarer-darkness/raw/master/niantic-wayfarer-darkness.meta.js
// @downloadURL  https://github.com/Eccenux/niantic-wayfarer-darkness/raw/master/niantic-wayfarer-darkness.user.js
// ==/UserScript==

/*
	Notes.

	Showing a loader:
	document.querySelector('.niantic-loader').parentNode.className=""
*/

/**
	Add CSS.
*/
function addCss() {

	// base CSS
	var cssText = /*css*/ `
:root {
	--happy-headers-color: #ecdcb5;
	--darkened-background: #ccc;
	--dark-background: #0f0f0f;
}
// Font friendly to other countries (not just US :-/)
.text-input.text-input, body, h3, html {
	font-family: Roboto,sans-serif;
}
// top header
.header {
	background: var(--darkened-background);
}
////
// main loader
.niantic-loader {
	background: var(--dark-background);
}
.niantic-loader__logo {
	filter: invert(0);
}
.niantic-loader__shadow {
	filter: blur(4px);
	background: #ccc;
	animation: shadow-on-dark 2.2s ease-in-out infinite;
}
@keyframes shadow-on-dark {
	from,
	to {
		opacity: .6;
		filter: blur(6px)
	}
	55% {
		opacity: .3;
		filter: blur(4px)
	}
}
`;

	// some pages -- make just a bit darker
	if (location.pathname.search(/^\/(help)$/) >= 0) {
		cssText += /*css*/ `
// general darkness
body,#gallery-info {
	background: var(--darkened-background);
	color: black;
}
`;
		// more important pages -- make dark
	} else {
		cssText += /*css*/ `
// general darkness
body,#gallery-info,.known-information-need-edit {
	background: var(--dark-background);
	color: whitesmoke;
}

// cookies dialog
ark-cookiebar {
	background: var(--darkened-background);
	color: black;
}

// most titles
h3 {
	color: var(--happy-headers-color);
}

// dialogs
.modal-dialog {
	color: black;
}

////
// profile
// nick
#chart-contain > h1 {
	color: var(--happy-headers-color);
}
#profile-stats {
	color: whitesmoke;
}

////
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

////
// nominations list
#nom-table-title--arrow::before {
	filter: invert();
}
#nom-options-button {
	filter: invert();
}
.nomination.--selected {
	background: #ddd;
}

////
// settings
.item-edit {
	filter: invert();
}
#SettingsController .settings-content .settings-item .item-header {
	color: var(--happy-headers-color);
}
#SettingsController .settings-content .settings-item .item-text {
	color: #ddd;
}
#SettingsController .settings-content .settings-item .item-value {
	color: #A37CD9;
}
// edit forms
.breadcrumb {
	background-color: inherit;
}
.dropdown #simple-dropdown {
	background: whitesmoke;
	color: black;
}
.text-input.text-input {
	background: whitesmoke;
	color: black;
}
`;
	}

	GM_addStyle(cssText.replace(/\/\/.+/g, ''));
}
addCss();