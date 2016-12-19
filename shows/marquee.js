/*
Need: ledStrip, and it length
Base color (RGB)
Highlight color (RGB)
*/
var marquee = function(ledStrip, r, g, b) {
	var ledStripLength = ledStrip.length;
	var ms = new Date().getMilliseconds();
//console.log('ms = ' + ms);
	var step = Math.floor( ms / 100);
	for (var i = 0; i < ledStripLength; i++) {
		var alpha = ( (i+step) % 5) * 0.2;
//console.log('Index ' + i + ', step = ' + step + ', Alpha: ' + alpha);
		if (alpha > 0.1) {
			ledStrip.set(i, r, g, b, alpha);
		} else {
			ledStrip.set(i, 200, 200, 200, 0.6);
		}
	}
	ledStrip.sync();
};

module.exports.marquee= marquee;
