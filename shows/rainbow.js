var color = require('onecolor');

/*
 * Produces a "moving rainbow" color show on the entire display
 */

var precomputed = {}; // 'i-cycle-ledStripLength': [r, g, b]
var precompute = function(i, cycle, ledStripLength) {
  var step = Math.abs(1.0 - (i + cycle)) / ledStripLength;
  var key = '' + Math.round(step * 1000) / 1000; // rounded step as key
  if (!precomputed[key]) {
    var bg = color('#ff0000').hue(step, true);
    var r = Math.floor(bg.red() * 255);
    var g = Math.floor(bg.green() * 255);
    var b = Math.floor(bg.blue() * 255);
    precomputed[key] = [r, g, b];
  }
  return precomputed[key];
};

var rainbow = function(ledStrip) {
  var ledStripLength = ledStrip.length;
  var time = new Date().getTime();
  var cycle = Math.floor((time / 45) % ledStripLength);
  for (var i = 0; i < ledStripLength; i++) {
    var values = precompute(i, cycle, ledStripLength);
    ledStrip.set(i, values[0], values[1], values[2], 0.6);
  }

  ledStrip.sync();
};

module.exports.show = rainbow;
