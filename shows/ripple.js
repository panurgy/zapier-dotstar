var _ = require('lodash');
var fastCos = _.memoize(Math.cos);

/*
 * Overlays a "ripple" efffect on top of the display, 
 * which is performed only using the alpha values
 */

var DEFAULT_LED = {r:0, g:0, b:0, a:0};

var ripple = function(ledStrip, colorObject) {
    var ledStripLength = ledStrip.length;


    var time = new Date().getTime();
    // each consumes 100 ms, and there are 22 steps - because the
    //    visual aesthetics are nicer when the ripple passes beyond
    //    the length of the arms
    var step =  Math.floor(time / 100)  % 22; // not 16;

    for (var i = 0; i < ledStripLength; i++) {
        // figure out where this LED is on the current arm
        var positionOnArm = i % 31;

        // now figure out how far away from the center this LED is
        var distanceFromCenter = positionOnArm;
        if (distanceFromCenter > 15) {
          // it's on the "other side" of the arm
          distanceFromCenter = 30 - distanceFromCenter;
        }

        var distanceFromStep = Math.abs(step - distanceFromCenter);
        var coarseBrightness = 15 - distanceFromStep;

        var distanceInRadians = coarseBrightness / 16.0 * (Math.PI/2);
        // if distanceFromStep is 0, then alpha sohuld be 1.0  (really bright)
        // as the "distanceFromStep" gets larger, the alpha should get smaller (closer to 0.0)

        var alpha = fastCos(distanceInRadians);

        if (alpha < 0.3) {
          alpha = 0.3;
        }

        var led = ledStrip.get(i) || DEFAULT_LED;
        ledStrip.set(i, led.r, led.g, led.b, alpha);
    }
};

module.exports.show = ripple;
