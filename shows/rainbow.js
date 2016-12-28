var color = require('onecolor');

/*
Need: ledStrip, and it length
Base color (RGB)
Highlight color (RGB)
*/

var rainbow = function(ledStrip) {
	var ledStripLength = ledStrip.length;
	var time = new Date().getTime();
	var cycle =  (time / 100) % ledStripLength;

	for (var i = 0; i < ledStripLength; i++) {
        var step = (i + cycle) / ledStripLength;
        var hue = step;
        //step = step - Math.floor(step);
        var bg = color('#ff0000').hue(step, true);
        var r = Math.floor(bg.red()*255);
        var g = Math.floor(bg.green()*255);
        var b = Math.floor(bg.blue()*255);
        
        ledStrip.set(i, r, g, b, 0.6);
	}
	ledStrip.sync();
};

module.exports.rainbow = rainbow;
