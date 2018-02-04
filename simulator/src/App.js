import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import LedStrip from './ledstrip';

const NUMBER_OF_ARMS = 8;
const LIGHTS_PER_ARM = 31;
const CENTER_WIDTH_RATIO = 0.12;
const STRAND_LENGTH = 250;

// ====================================
//const TOTAL_LIGHTS = NUMBER_OF_ARMS * LIGHTS_PER_ARM;
const SIZE = (STRAND_LENGTH * 2) + (STRAND_LENGTH * CENTER_WIDTH_RATIO) + 50;
const CENTER_LOCATION = SIZE / 2;


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
            var x1 = CENTER_LOCATION;
            var y1 = CENTER_LOCATION;
            var angle = (360 / NUMBER_OF_ARMS) * i;
            var rads = angle / 180 * Math.PI;
            var sin = Math.sin(rads);
            var cos = Math.cos(rads);
            // offset from center
            x1 = x1 + ((STRAND_LENGTH * CENTER_WIDTH_RATIO) * sin);
            y1 = y1 - ((STRAND_LENGTH * CENTER_WIDTH_RATIO) * cos);
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
