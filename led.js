var dotstar = require('dotstar')
var SPI = require('pi-spi');
 
spi = SPI.initialize('/dev/spidev0.0');
var ledStripLength = 243;
 
var ledStrip = new dotstar.Dotstar(spi, {
  length: ledStripLength
});
ledStrip.length = ledStripLength;

var allRed = function() {
	ledStrip.all(100, 0, 0 ); //red
	ledStrip.sync();
};

var allGreen = function() {
	ledStrip.all(0, 100, 0 );
	ledStrip.sync();
};

var allBlue = function() {
	ledStrip.all(0, 0, 100 );
	ledStrip.sync();
};

var allOff = function() {
	ledStrip.off();
};

/*
setTimeout(allRed, 500);
setTimeout(allGreen,1500);
setTimeout(allBlue, 2500);
setTimeout(allOff, 3500);
*/


var oldMarquee = function(r, g, b) {
	var sec = 1000.0 / new Date().getMilliseconds();
	for (var i = 0; i < ledStripLength; i++) {
		var alpha = (1 + Math.cos(sec + i)) / 2.0;
		if (alpha > 0.1) {
			ledStrip.set(i, r, g, b, alpha);
		} else {
			ledStrip.set(i, 200, 200, 200, 0.6);
		}
	}
	ledStrip.sync();
};

var marquee = require('./shows/marquee').marquee;
var starburst= require('./shows/starburst').starburst;
var rainbow = require('./shows/rainbow').rainbow;

var doShow = function() {
	//marquee(ledStrip, 200,20,0); // Zapier orangish
	//marquee(ledStrip, 200,10,10); // peppermint
	//everett(ledStrip);
	//starburst(ledStrip, 200, 0, 0);
    rainbow(ledStrip);
	setTimeout(doShow, 50);
};

doShow();

