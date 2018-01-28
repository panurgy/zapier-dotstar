var crypto = require('crypto');

var reverse = function(s) {
    // super lame, cheap, and buggy way to reverse a string
    return s.split('').reverse().join('');
};

// given a 32 char base 16 hash (string), render them onto the LED strip
var renderHash = function(hash, ledStrip, alpha) {
    // So we're given a 32-char hash, like this:
    // 01 23 45 67 89 ab cd ef 01 23 45 67 89 ab cd ef 
    // Let's divvy that up into a "offset", a "quantity", and then RBG
    var firstBytes = hash.substring(0,2);
    var position = Number.parseInt(firstBytes, 16);

	for (var i = 0; i <= 14 && (position + i < ledStrip.length); i++) {
        var offset = i*2;
        var r = Number.parseInt(hash.substring(offset, offset+2), 16);
        offset += 2;
        var g = Number.parseInt(hash.substring(offset, offset+2), 16);
        offset += 2;
        var b = Number.parseInt(hash.substring(offset, offset+2), 16);
        ledStrip.set(position + i, r, g, b, alpha);
    }
};

/*
 * Displays something like an old-skool sci-fi mainframe
 */
var mainframe = function(ledStrip, colorObject) {
	var ledStripLength = ledStrip.length;

    var r = colorObject.r;
    var g = colorObject.g;
    var b = colorObject.b;
    var a = colorObject.a || 0.6;

	var time = new Date().getTime();
    var seed = Math.floor(time / 2500);
    var hash1 = crypto.createHash('md5').update(''+seed).digest("hex");
    var hash2 = reverse(hash1)
    var hash3 = crypto.createHash('md5').update(reverse(''+seed)).digest("hex");
    var hash4 = reverse(hash3);

    renderHash(hash1, ledStrip, a);
    renderHash(hash2, ledStrip, a);
    renderHash(hash3, ledStrip, a);
    renderHash(hash4, ledStrip, a);
    
};

module.exports.show = mainframe;
