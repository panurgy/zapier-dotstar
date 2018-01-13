/**
 * Poorly named file which provides a mapping between the display's
 * LEDs, and a two-dimensional coordinate plane (x,y)
 *
 * Most of this code was borrrowed from the simulator, and made
 * "more generic" so that it could work with the main (huge)
 * Illuminated Zapier, or the Zapier Minis.  Although, the bigger
 * problem there is that the Illuminated Zapier has two rows of
 * LEDs on each arm (out and back), whereas the Minis have a 
 * single strip (which connects end to end)
 */


// The number of "virtual pixels" to use for the arms.  Since each
//   arm has two LED strips, this is the "width" between them.
//   Hint: an odd number works best.
var VIRTUAL_ARM_WIDTH = 3;

/**
 * Given an x-y coordinate plane of some width and height, determine
 * the approximate location of each LED within that coordinate plane.
 *
 * NOTE: This assumes First Quadrant (the origin is the bottom-left corner)
 */
function mapGeometry(ledsPerArm, coordinateWidth, coordinateHeight) {
    // find the center of the coordinate plane
    halfWidth = coordinateWidth / 2.0;
    halfHeight = coordinateHeight / 2.0;
    // the virtual length of the arms is the smaller
    //    of the halfWidth or halfHeight
    armLength = Math.min(halfWidth, halfHeight)

    NUMBER_OF_ARMS = 8;
    LEDS_PER_ARM = 31;

    // This will be the super important array of all the LED's
    //    x,y coordinates within the coordinate plane.  Each element
    //    is an object like { 0: x:50, y: 50, 1: x:50, y:49, ... }
    ledCoordinates = {};

    for (var i=0; i < NUMBER_OF_ARMS; i++) {
    
        var angle = (360/NUMBER_OF_ARMS) * i;
        var rads = angle/180 * Math.PI;
        var sin = Math.sin(rads);
        var cos = Math.cos(rads);

        var x1 = halfWidth;
        var y1 = halfHeight
        var x2 = x1 + (armLength * sin);
        var y2 = y1 - (armLength * cos);
        
        calculateCoordinates(ledCoordinates, LEDS_PER_ARM*i, LEDS_PER_ARM, x1, y1, x2, y2)
    }

    return ledCoordinates;
}

function calculateCoordinates(ledCoordinates, ledOffset, ledCount, x1, y1, x2, y2) {

    var x1 = Math.round(x1);
    var y1 = Math.round(y1);
    var x2 = Math.round(x2);
    var y2 = Math.round(y2);
    var xdelta = x2 - x1;
    var ydelta = y2 - y1;
    var ledsPerSide = Math.floor(ledCount/2);
    var xstep = xdelta / ledsPerSide;
    var ystep = ydelta / ledsPerSide;
        
    for (var i=0; i < ledsPerSide; i++) {
        var cx = xstep * i + x1;
        var cy = ystep * i + y1;


        var cx1, cx2, cy1, cy2;
        if (xdelta === 0) {
            // vertical line
            if (y1 > y2) {
                // vertical line, that points "upwards"
                cx1 = cx-VIRTUAL_ARM_WIDTH;
                cx2 = cx+VIRTUAL_ARM_WIDTH;
                cy1 = cy;
                cy2 = cy;
            } else {
                // vertical line, that points "downward"
                cx1 = cx+VIRTUAL_ARM_WIDTH;
                cx2 = cx-VIRTUAL_ARM_WIDTH;
                cy1 = cy;
                cy2 = cy;
            }
        }
        
        else if (ydelta === 0) {
            if (x1 < x2) {
                // horizontal line, that points to the right
                cx1 = cx;
                cx2 = cx;
                cy1 = cy-VIRTUAL_ARM_WIDTH;
                cy2 = cy+VIRTUAL_ARM_WIDTH;
            } else {
                // horizontal line, that points to the left
                cx1 = cx;
                cx2 = cx;
                cy1 = cy+VIRTUAL_ARM_WIDTH;
                cy2 = cy-VIRTUAL_ARM_WIDTH;
            }
        }

        else {
            // use the slope to compute the coordinates
            var slope = ydelta / xdelta;
            var reverseSlope = 1/slope;

            cx = x1 + (xstep * i);
            cy = y1 + (ystep * i);

            // use the slope to compute the coordinates
            var xmod = xdelta / Math.abs(xdelta);
            var ymod = ydelta / Math.abs(ydelta);

            cx1 = cx + (xmod*reverseSlope*VIRTUAL_ARM_WIDTH);
            cx2 = cx - (xmod*reverseSlope*VIRTUAL_ARM_WIDTH);
            cy1 = cy - (ymod*reverseSlope*VIRTUAL_ARM_WIDTH);
            cy2 = cy + (ymod*reverseSlope*VIRTUAL_ARM_WIDTH);
        }

        ledCoordinates[i+ledOffset] = {x: Math.round(cx1), y: Math.round(cy1)};
        ledCoordinates[ledCount-i-1+ledOffset] = {x: Math.round(cx2), y: Math.round(cy2)};
    }
    if (ledCount % 2 === 1) {
        // add one on the end
        ledCoordinates[ledsPerSide+ledOffset] = {x: Math.round(x2), y: Math.round(y2)};
    }
    return ledCoordinates;

}

module.exports = {
    mapGeometry: mapGeometry
}

// Useful for testing...
//console.log(mapGeometry(31, 100, 100));
