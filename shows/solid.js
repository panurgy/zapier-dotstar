/*
 * Uses the color values provided to set all of the LEDs to a solid color.
 */

var solid = function(ledStrip, colorObject) {
	var ledStripLength = ledStrip.length;

    var r = colorObject.r;
    var g = colorObject.g;
    var b = colorObject.b;
    var a = colorObject.a || 0.5;

	for (var i = 0; i < ledStripLength; i++) {
        ledStrip.set(i, r, g, b, a);
	}
};

module.exports.show = solid;
