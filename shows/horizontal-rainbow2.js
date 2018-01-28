var color = require('onecolor');
var mapGeometry = require('../ledmapper').mapGeometry;
var _ = require('lodash')

/*
 * Produces a "moving rainbow" color show on the entire display
 */
LEDS_PER_ARM = 31;

RED = { r: 200, g: 0, b: 0 };
ORANGE = { r: 200, g: 20, b: 0 };
YELLOW = { r: 200, g: 200, b: 0 };
GREEN = { r: 0, g: 200, b: 0 };
CYAN = { r: 0, g: 200, b: 200 };
BLUE = { r: 0, g: 0, b: 200 };
VIOLET = { r: 200, g: 0, b: 200 };

PRECOMPUTED_ROWS2 = [
    RED,
    RED,
    RED,
    RED,

    ORANGE,
    ORANGE,
    ORANGE,
    ORANGE,

    YELLOW,
    YELLOW,
    YELLOW,
    YELLOW,

    GREEN,
    GREEN,
    GREEN,
    GREEN,

    CYAN,
    CYAN,
    CYAN,
    CYAN,

    BLUE,
    BLUE,
    BLUE,
    BLUE,

    VIOLET,
    VIOLET,
    VIOLET,
    VIOLET,
];

IMAGE_LENGTH = PRECOMPUTED_ROWS2.length;

// then calculate where the f*ck the LEDs are in that virutal 
//    coordinate plane
LED_ARRAY = mapGeometry(LEDS_PER_ARM, IMAGE_LENGTH, IMAGE_LENGTH)

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

var horizontal_rainbow2 = function(ledStrip, color) {
  // ideally, we would build the LED_ARRAY based on the ledStrip info,
  //    but this isn't a perfect world....

  var time = new Date().getTime();
  var cycle = Math.floor((time / 200) % PRECOMPUTED_ROWS2.length);
  for (var i = 0; i < PRECOMPUTED_ROWS2.length; i++) {
    var offset = i + cycle;
    if (offset >= PRECOMPUTED_ROWS2.length) {
        offset -= PRECOMPUTED_ROWS2.length;
    }
    var value = PRECOMPUTED_ROWS2[offset];

    // defense for a rounding error on the bottom-most LED
    if (value === undefined) value = {r: 255, g: 255, b: 255} 

    var r = value.r;
    var g = value.g;
    var b = value.b;
    var a = color.a || 0.6;

    // grab all of the LEDs at this y-coordinate
    leds = LEDS_PER_Y_COORDINATE[i];
    if (leds) {
        // go through all of the LEDs at this y-coordinate
        //    and set them to this color
        _.each(leds, function(index) {
            ledStrip.set(index, r, g, b, a);
        })
     }
  }

  ledStrip.sync();
};

module.exports.show = horizontal_rainbow2;


//var dummy = {
//    set: function(index,r, g, b, a) {
//        console.log("Setting LED " + index +": " + r +', ' + g + ', ' + b);
//    },
//    sync: function(){}
//}
//horizontal_rainbow2(dummy);
