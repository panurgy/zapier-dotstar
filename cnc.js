var secretKey = process.env.SECRET_KEY
if (! secretKey) {
    console.log("The 'secretKey' env var is not set, and will not be able to fetch settings from the remote/storage Command and Control");
}

var fetch = require('node-fetch');
var dotstar = require('dotstar')
var SPI = require('pi-spi');
 
spi = SPI.initialize('/dev/spidev0.0');
var ledStripLength = 248;
 
var ledStrip = new dotstar.Dotstar(spi, {
  length: ledStripLength
});
ledStrip.length = ledStripLength;

shows = {};
shows.solid = require('./shows/solid').show;

//var marquee = require('./shows/marquee').marquee;
//var starburst= require('./shows/starburst').starburst;
//var rainbow = require('./shows/rainbow').rainbow;

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
    shows[currentSettings.bgshow](ledStrip, currentSettings);

    ledStrip.sync();
	setTimeout(doShow, 50);
};

// start the show loop
doShow();

