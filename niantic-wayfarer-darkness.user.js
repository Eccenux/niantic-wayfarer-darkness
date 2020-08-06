// ==UserScript==
// @name         OPR dark look and feel
// @namespace    pl.enux.opr
// @version      1.0.1
// @description  [1.0.1] Dark skin for OPR aka Niantic Wayfarer (portal reviews)
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
	--sidebar-background: #252525;
}
// Font friendly to other countries (not just US :-/)
.text-input.text-input, body, h3, html {
	font-family: Roboto,sans-serif;
}
// top header
.header {
	background: var(--sidebar-background);
}
.niantic-wayfarer-logo > img {
	filter: invert() hue-rotate(180deg) brightness(1.2) saturate(80%);
}
// menu (mobile)
.header .hamburger::before {
	filter: invert(1);
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

////
// Login screen
.login-button {
	width: auto;
	display: grid;
	grid-template-columns: 45px 1fr;
	align-items: center;
	min-height: 40px;
	height: auto;
}
  
.login-span-text {
	position: static;
	text-align: left;
	transform: none;
	width: 250px;
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
body,#gallery-info,.known-information-need-edit,.container {
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
.known-information-card .known-information-map-icon::before {
	filter: invert();
}
  
////
// nominations list
#nom-table-title--arrow::before {
	filter: invert() contrast(4);
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
// bar for on/off switch
.switch-label::before {
	//background-color: rgba(0,0,0,.17);
	background-color: rgba(255,255,255,.5);
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
// material checkbox
.consent-confirm {
	filter: invert() contrast(90%);
}
.consent-confirm label {
	filter: invert();
}
`;
	}

	GM_addStyle(cssText.replace(/\/\/.+/g, ''));
}
addCss();