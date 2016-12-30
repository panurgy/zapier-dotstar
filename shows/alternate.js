/*
 * Changes every-other LED to a specified color.
 */

var alternate = function(ledStrip, colorObject) {
	var ledStripLength = ledStrip.length;

    var r = colorObject.r;
    var g = colorObject.g;
    var b = colorObject.b;
    var a = colorObject.a || 0.6;

	var ms = new Date().getMilliseconds();
	var step = Math.floor( ms / 300) % 2;
	for (var i = 0; i < ledStripLength; i++) {
		if ( i % 2 === step % 2) {
			ledStrip.set(i, r, g, b, a);
		}
	}
};

module.exports.show = alternate;
