var bespoke = require('bespoke');
var classes = require('bespoke-classes');
var keys = require('bespoke-keys');
var touch = require('bespoke-touch');
var scale = require('bespoke-scale');
var hash = require('bespoke-hash');
var bullets = require('bespoke-bullets');

<% if (hasCode) { %>var prism = require('prism'); <% } %>

var deck = bespoke.from('#deck', [
    classes(),
    keys(),
    touch(),
    scale(),
    hash(),
    bullets('.bullet, .bullets li')
]);
