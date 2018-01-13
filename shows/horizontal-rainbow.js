var color = require('onecolor');
var mapGeometry = require('../ledmapper').mapGeometry;
var _ = require('lodash')

/*
 * Produces a "moving rainbow" color show on the entire display
 */

IMAGE_LENGTH = 32; // we only need 32 horizontal rows of color
PRECOMPUTED_ROWS = [];

// precalculate the colors to be displayed
for (var i=0; i < IMAGE_LENGTH; i++) { 
  var step = Math.abs(1.0 - i) / IMAGE_LENGTH;
  var bg = color('#ff0000').hue(step, true);
  var r = Math.floor(bg.red() * 255);
  var g = Math.floor(bg.green() * 255);
  var b = Math.floor(bg.blue() * 255);
  //console.log('r', r, 'g', g, 'b', b)
  PRECOMPUTED_ROWS[i] = r << 16 | g << 8 | b;
}

// then calculate where the f*ck the LEDs are in that virutal 
//    coordinate plane
LED_ARRAY = mapGeometry(31, IMAGE_LENGTH, IMAGE_LENGTH)

// This is the REALLY important part - the LEDs sorted by y-coordinate.
LEDS_PER_Y_COORDINATE = {}

_.each(LED_ARRAY, function(entry, index) {
    var entry = LED_ARRAY[index];
    var y = entry.y;
    if (!LEDS_PER_Y_COORDINATE[y]) {
        LEDS_PER_Y_COORDINATE[y] = [];
    }
    LEDS_PER_Y_COORDINATE[y].push(index);
});

var horizontal_rainbow = function(ledStrip) {
  // ideally, we would build the LED_ARRAY based on the ledStrip info,
  //    but this isn't a perfect world....

  var time = new Date().getTime();
  var cycle = Math.floor((time / 45) % PRECOMPUTED_ROWS.length);
  for (var i = 0; i < PRECOMPUTED_ROWS.length; i++) {
    var offset = i + cycle;
    if (offset >= PRECOMPUTED_ROWS.length) {
        offset -= PRECOMPUTED_ROWS.length;
    }
    var value = PRECOMPUTED_ROWS[offset];

    // defense for a rounding error on the bottom-most LED
    if (value === undefined) value = 0xffffff;

    var r = (value & 0xff0000) >> 16;
    var g = (value & 0xff00) >> 8;
    var b = (value & 0xff);

    // grab all of the LEDs at this y-coordinate
    leds = LEDS_PER_Y_COORDINATE[i];
    if (leds) {
        // go through all of the LEDs at this y-coordinate
        //    and set them to this color
        _.each(leds, function(index) {
            ledStrip.set(index, r, g, b, 0.6);
        })
     }
  }

  ledStrip.sync();
};

module.exports.show = horizontal_rainbow;


//var dummy = {
//    set: function(index,r, g, b, a) {
//        console.log("Setting LED " + index +": " + r +', ' + g + ', ' + b);
//    },
//    sync: function(){}
//}
//horizontal_rainbow(dummy);
