/*
 * Overlays a "marquee" effect on top of the display
 */

var marquee = function(ledStrip, colorObject) {
	var ledStripLength = ledStrip.length;

    var r = colorObject.r;
    var g = colorObject.g;
    var b = colorObject.b;
    var a = colorObject.a || 0.6;

	var ms = new Date().getMilliseconds();
	var step = Math.floor( ms / 100);
	for (var i = 0; i < ledStripLength; i++) {
		if ( (i+step) % 5 === 0) {
			ledStrip.set(i, r, g, b, a);
		}
	}
};

module.exports.show = marquee;
