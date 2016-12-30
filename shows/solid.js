/*
 * Uses the current bg setting to set all of the LEDs to a solid color.
 */

var solid = function(ledStrip, currentSettings) {
	var ledStripLength = ledStrip.length;

    var r = currentSettings.bgcolor.r;
    var g = currentSettings.bgcolor.g;
    var b = currentSettings.bgcolor.b;
    var a = currentSettings.defaultAlpha || 0.5;

	for (var i = 0; i < ledStripLength; i++) {
        ledStrip.set(i, r, g, b, a);
	}
};

module.exports.show = solid;
