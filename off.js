var dotstar = require('dotstar')
var SPI = require('pi-spi');
 
spi = SPI.initialize('/dev/spidev0.0');
var ledStripLength = 253;
 
var ledStrip = new dotstar.Dotstar(spi, {
  length: ledStripLength
});


var allOff = function() {
	ledStrip.off();
};

allOff();
