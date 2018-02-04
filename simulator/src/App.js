import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import LedStrip from './ledstrip';

const NUMBER_OF_ARMS = 8;
const LIGHTS_PER_ARM = 31;
const CENTER_WIDTH = 30;
const STRAND_LENGTH = 250;

// ====================================
//const TOTAL_LIGHTS = NUMBER_OF_ARMS * LIGHTS_PER_ARM;
const SIZE = STRAND_LENGTH * 2 + 20;
const HALF_SIZE = SIZE / 2;



class App extends Component {

    makeAnLedStrip(key, x1, x2, y1, y2) {
        return (
            <LedStrip key={key}
                x1={x1} y1={y1}
                x2={x2} y2={y2}
                ledIndex={key * LIGHTS_PER_ARM}
                ledCount={LIGHTS_PER_ARM}
                ledArray={this.props.ledArray}
            />
        );
    }

    makeLedstrips() {
        var array = [];
        for (var i=0; i < NUMBER_OF_ARMS; i++) {
            var x1 = HALF_SIZE;
            var y1 = HALF_SIZE;
            var angle = (360 / NUMBER_OF_ARMS) * i;
            var rads = angle / 180 * Math.PI;
            var sin = Math.sin(rads);
            var cos = Math.cos(rads);
            // offset from center
            x1 = x1 + (CENTER_WIDTH * sin);
            y1 = y1 - (CENTER_WIDTH * cos);
            var x2 = x1 + (STRAND_LENGTH * sin);
            var y2 = y1 - (STRAND_LENGTH * cos);
            array.push(this.makeAnLedStrip(i, x1, x2, y1, y2));
        }
        return array;
    };

  render() {
    return (
        <div className="App">
            <div className="App-header">
                <h2>Zapier DotStar LED array simulator</h2>
            </div>
            <svg width={SIZE} height={SIZE}>
                {this.makeLedstrips()}
            </svg>
        </div>
    );
  }

}

export default App;
