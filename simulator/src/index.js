import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

var shows = {};
shows.solid = require('./../../shows/solid').show;
shows.marquee = require('./../../shows/marquee').show;
shows.starburst= require('./../../shows/starburst').show;
shows.rainbow = require('./../../shows/rainbow').show;

const NUM_OF_LEDS = 248;

var virtualLeds = {
  ledArray: new Array(NUM_OF_LEDS),
  length: NUM_OF_LEDS,

  // sets a virtual LED with the rgba values
  set: function(index, r, g, b, a) {
    if (!this.ledArray[index]) {
        this.ledArray[index] = {};
    }
    Object.assign(this.ledArray[index], {r:r, g:g, b:b, a:a});
  },

  sync: function() {
    // rerenders things with the current virtual LED settings
    ReactDOM.render(
        <App ledArray={this.ledArray} />,
        document.getElementById('root')
    );
  },

  all: function(r, g, b, a) {
    for (var i=0; i < this.ledArray.length; i++) {
        this.set(i, 0, 0, 0, 0);
    }
    this.sync();
  },

  off: function() {
    this.all(0, 0, 0, 0);
  }
};


var doShow = function() {
    // ## Pick a background option - solid color, or rainbow
	shows.solid(virtualLeds, {r: 255, g: 100, b: 0, a: 1} );
	//shows.rainbow(virtualLeds);

    // then pick a foreground/effect - starburst, or marquee
	shows.starburst(virtualLeds, {r: 200, g: 200, b: 200, a: 1} );
	//shows.marquee(virtualLeds, {r: 200, g: 200, b: 200, a: 1} );

    virtualLeds.sync();
	setTimeout(doShow, 50);
};

doShow();

