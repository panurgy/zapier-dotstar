import React, { Component } from 'react';

const VIRTUAL_LED_RADIUS = 3;

class LedStrip extends Component {

    makeLed(i, cx, cy) {
        var ledIndex = this.props.ledIndex + i;
        var rgbaObject = this.props.ledArray[ledIndex];

        var fill = "black";
        if (rgbaObject) {
            fill = 'rgba(' + rgbaObject.r +
                ', ' + rgbaObject.g +
                ', ' + rgbaObject.b +
                ', ' + rgbaObject.a + ')';
        }
        return (
            <circle key={i} cx={cx} cy={cy}
                r={VIRTUAL_LED_RADIUS} 
                fill={fill} />
        );
    }

    makeVirtualLeds() {
        var x1 = Math.round(this.props.x1);
        var y1 = Math.round(this.props.y1);
        var x2 = Math.round(this.props.x2);
        var y2 = Math.round(this.props.y2);
        var xdelta = x2 - x1;
        var ydelta = y2 - y1;
        var ledCount = this.props.ledCount;
        var ledsPerSide = Math.floor(ledCount/2);
        var xstep = xdelta / ledsPerSide;
        var ystep = ydelta / ledsPerSide;
        
        var array = [];
        for (var i=0; i < ledsPerSide; i++) {
            var cx = xstep * i + x1;
            var cy = ystep * i + y1;

            var cx1, cx2, cy1, cy2;
            if (xdelta === 0) {
                // vertical line
                if (y1 > y2) {
                    // vertical line, that points "upwards"
                    cx1 = cx-5;
                    cx2 = cx+5;
                    cy1 = cy;
                    cy2 = cy;
                } else {
                    // vertical line, that points "downward"
                    cx1 = cx+5;
                    cx2 = cx-5;
                    cy1 = cy;
                    cy2 = cy;
                }
            }
            
            else if (ydelta === 0) {
                if (x1 < x2) {
                    // horizontal line, that points to the right
                    cx1 = cx;
                    cx2 = cx;
                    cy1 = cy-5;
                    cy2 = cy+5;
                } else {
                    // horizontal line, that points to the left
                    cx1 = cx;
                    cx2 = cx;
                    cy1 = cy+5;
                    cy2 = cy-5;
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

                // Note to self - this works for lines where the slope is 1,
                //   but things get a bit funky
                cx1 = cx + (xmod*reverseSlope*6);
                cx2 = cx - (xmod*reverseSlope*6);
                cy1 = cy - (ymod*reverseSlope*6);
                cy2 = cy + (ymod*reverseSlope*6);
            }

            //array.push(this.makeLed(i, cx, cy));
            
            array.push(this.makeLed(i, cx1, cy1));
            array.push(this.makeLed(ledCount-i-1, cx2, cy2));
        }
        if (ledCount % 2 === 1) {
            // add one on the end
            array.push(this.makeLed(ledsPerSide, x2, y2));
        }
        return array;
    };

    render() {
        return (
            <g>
                <line
                    x1={this.props.x1} y1={this.props.y1} 
                    x2={this.props.x2} y2={this.props.y2} 
                    strokeWidth="2" stroke="#cccccc"
                />
                {this.makeVirtualLeds()}
            </g>
        );
    }
}

export default LedStrip;
