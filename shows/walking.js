var SPEED = 50;

/*
 * Overlays a "loading/spinner" effect on top of the display.
 */
var spiral = function(ledStrip, colorObject) {
	var ledStripLength = ledStrip.length;

    var r = colorObject.r;
    var g = colorObject.g;
    var b = colorObject.b;
    var a = colorObject.a || 0.6;

	var time = new Date().getTime();
    var walkingLeaf =  Math.floor(time / SPEED) % ledStripLength;

	for (var i = 0; i < ledStripLength; i++) {
        if (i === walkingLeaf) {
            ledStrip.set(i, r, g, b, a);
        }
	}
};

module.exports.show = spiral;
