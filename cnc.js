var secretKey = process.env.SECRET_KEY;
if (! secretKey) {
    console.log("The 'SECRET_KEY' env var is not set, and will not be able to fetch settings from the remote/storage Command and Control");
}

var DEFAULT_BG_COLOR = { r: 200, g: 20, b: 0 };
var DEFAULT_FG_COLOR = { r: 200, g: 200, b: 200 };

var fetch = require('node-fetch');
var dotstar = require('dotstar');
var SPI = require('pi-spi');
 
spi = SPI.initialize('/dev/spidev0.0');
var ledStripLength = 251; // there's really 248, but 251 works more reliably
 
var ledStrip = new dotstar.Dotstar(spi, {
  length: ledStripLength
});
ledStrip.length = ledStripLength;

// monkey-patch the "set" method, so that we can "get" the info later
var ledInfo = [];
var realSetFunction = ledStrip.set;
var overrideSetFunction = function(pos, r, g, b, a) {
  ledInfo[pos] = {r:r, g:g, b:b, a:a};
  realSetFunction.apply(ledStrip, arguments);
};
ledStrip.set = overrideSetFunction;

ledStrip.get = function(pos) {
  return ledInfo[pos];
};


var shows = {};
shows.solid = require('./shows/solid').show;
shows.marquee = require('./shows/marquee').show;
shows.starburst= require('./shows/starburst').show;
shows.rainbow = require('./shows/rainbow').show;
shows.alternate = require('./shows/alternate').show;
shows.spinner = require('./shows/spinner').show;
shows.walking = require('./shows/walking').show;
shows.ripple = require('./shows/ripple').show;

var makeDefaultSettings = function() {

    return {
        bgcolor: { r: 200, g: 20, b: 0 },
        bgshow: 'solid',
        fgcolor: { r: 200, g: 200, b:200 },
        fgshow: 'starburst',
        defaultAlpha: 0.5
    };
};

// create the default settings, in case the CnC server can't be reached
var currentSettings = makeDefaultSettings();



// fetches the current JSON settings from the CNC server, and if successful,
//    submits itself to run again a second from now.
var fetchSettings = function() {
    if (!secretKey) {
        return;
    }

    var request = 'https://store.zapier.com/api/records?secret=' + secretKey;

    fetch(request).then( function(result) {
        return result.json();
    })
    .then( function(json) {
        if (json) {
            currentSettings = json;
            setTimeout(fetchSettings, 1000);
        } else {
            console.log("Unable to retrieve JSON from CnC server", result.text());
        }
    });
};

// Starts the fetch loop for settings from the CnC server
fetchSettings();

// Runs the "current" show settings, and then submits itself to run 
//   again after a "very short" period of time.
var doShow = function() {
    if (!shows[currentSettings.bgshow]) {
        currentSettings.bgshow = 'solid';
    }
    var bgcolor = currentSettings.bgcolor || DEFAULT_BG_COLOR;
    shows[currentSettings.bgshow](ledStrip, bgcolor);

    if (shows[currentSettings.fgshow]) {
        var fgcolor = currentSettings.fgcolor || DEFAULT_FG_COLOR;
        shows[currentSettings.fgshow](ledStrip, fgcolor);
    }

    ledStrip.sync();
	setTimeout(doShow, 50);
};

// start the show loop
doShow();

