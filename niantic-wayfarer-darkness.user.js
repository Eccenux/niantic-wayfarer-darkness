// ==UserScript==
// @name         OPR dark look and feel
// @namespace    pl.enux.opr
// @version      0.3.0
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

//
// Review grids media queries
//
var gridMedia = /*css*/ `
@media screen and (min-width: 1720px) {
	.card-area .card-row-container {
		grid-template-columns: repeat(5, auto);
		grid-template-areas:
		"photo desc support minis what"
		"dup   dup  map     map   comments"
		;
	}
}
@media screen and (min-width: 1340px) and (max-width: 1719px) {
	.card-area .card-row-container {
		grid-template-columns: repeat(4, auto);
		grid-template-areas:
			"photo desc support what"
			"minis minis minis  comments"
			"dup   dup  map     _"
		;

	}
	.three-card-parent {
		width: 1120px;
		grid-template-columns: repeat(3, auto);
	}
	#map-card {
		width: 320px;
	}	  
}
@media screen and (min-width: 0px) and (max-width: 1339px) {
	.card-area .card-row-container {
		grid-template-columns: calc(50vw - 30px) calc(50vw - 30px);
		grid-template-areas:
			"photo support"
			"desc  minis"
			"dup   map"
			"what  comments"
		;
	}
	.card--double-width, .card-style--double-width {
		width: 100%;
	}
}
@media screen and (min-width: 1025px) and (max-width: 1339px) {
	.card, .card-style {
		width: 100% !important;
	}
	.three-card-parent {
		width: 100%;
	}
	.card-area .card-row-container {
		grid-template-columns: calc(50vw - 30px - 90px) calc(50vw - 30px - 90px);
	}
}
`;

//
// Review grids layout
//
var reviewLayout = /*css*/ `
////
// main review grid
.card-area .card-row-container {
  display: grid;
  width: max-content;
  max-width: unset;
  overflow-y: auto;
  grid-gap: 15px;
  grid-template-columns: repeat(5, 1fr);
  grid-template-areas:
   "photo desc support minis what"
   "dup   dup  map     map   comments"
  ;
}

#three-card-container {
  grid-area: minis;
}
#map-card {
  grid-area: map;
}
#duplicates-card {
  grid-area: dup;
}
#photo-card {
  grid-area: photo;
}
#descriptionDiv {
  grid-area: desc;
}
#supporting-card {
  grid-area: support;
}
#what-is-it-card {
  grid-area: what;
}
#additional-comments-card {
  grid-area: comments;
}

////
// extra for grid

// scroll
.card-area {
	overflow-y: auto;
}  

// maps
.card--double-width, .card-style--double-width {
    width: 740px;
}

// reset margin
.card-area .card-row-container .card {
	margin: 0 !important;
}

// three-card (small cards)
.three-card-parent {
	height: auto;
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 15px;
	margin: 0 !important;
}
.small-card .card-header__description {
	font-size: 90%;
}
.small-card .card__header {
	margin-bottom: 0;
}

${gridMedia}
`

//
// base CSS
//
var baseCss = /*css*/ `
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
var darkenedColor = /*css*/ `
// general darkness
body,#gallery-info {
	background: var(--darkened-background);
	color: black;
}
`;
// more important pages -- make dark
var darkColors = /*css*/ `
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

//
// Final CSS construction
//
var cssText = baseCss;
if (location.pathname.search(/^\/(help)$/) >= 0) {
	cssText += darkenedColor;
} else {
	cssText += darkColors;
}
cssText += reviewLayout;

GM_addStyle(cssText.replace(/\/\/.+/g, ''));
