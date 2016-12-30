/*
 * Overlays a "loading/spinner" effect on top of the display.
 */
var spinner = function(ledStrip, colorObject) {
	var ledStripLength = ledStrip.length;

    var r = colorObject.r;
    var g = colorObject.g;
    var b = colorObject.b;
    var a = colorObject.a || 0.6;

	var time = new Date().getTime();
	// each consumes 320 ms, and there are 8 steps total.
	var step =  Math.floor(time / 320) % 8 ;

	for (var i = 0; i < ledStripLength; i++) {
		var whichArm = Math.floor(i / 31);

        if (whichArm === step) {
            // highlight it!
            ledStrip.set(i, r, g, b, a);
        }
	}
};

module.exports.show = spinner;
