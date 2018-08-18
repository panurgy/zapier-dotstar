var crypto = require('crypto');

/*
 * Shows a blip or dot/star occasionally
 */
var blip = function(ledStrip, colorObject) {
    var ledStripLength = ledStrip.length;

    var r = colorObject.r;
    var g = colorObject.g;
    var b = colorObject.b;
    var a = 1.0

    var time = new Date().getTime();
    var seed = Math.floor(time / 250) % ledStripLength;
    var hash = crypto.createHash('md5').update(''+seed).digest("hex");
    var index = Number.parseInt(hash, 16) % ledStripLength;
    ledStrip.set(index, r, g, b, a)
    return ledStrip;    
};

module.exports.show = blip;
