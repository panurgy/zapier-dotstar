/*
 * Overlays a "marquee" effect on top of the display
 */

var marquee = function(ledStrip, currentSettings) {
	var ledStripLength = ledStrip.length;

    var r = currentSettings.fgcolor.r;
    var g = currentSettings.fgcolor.g;
    var b = currentSettings.fgcolor.b;
    var a = currentSettings.defaultAlpha || 0.5;
    a += 0.1; // just a tad brighter

	var ms = new Date().getMilliseconds();
	var step = Math.floor( ms / 100);
	for (var i = 0; i < ledStripLength; i++) {
		if ( (i+step) % 5 === 0) {
			ledStrip.set(i, r, g, b, a);
		}
	}
};

module.exports.show = marquee;
