const dotstar = require('dotstar');
const SPI = require('pi-spi');

module.exports = function() {
    // Setup the device
    var spi = SPI.initialize('/dev/spidev0.0');
    var ledStripLength = 251; // there's really 248, but 251 works more reliably
     
    var ledStrip = new dotstar.Dotstar(spi, {
      length: ledStripLength
    });
    return ledStrip;
}();
