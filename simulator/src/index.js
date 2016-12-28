import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

//import show from '../../shows/starburst';
//import show from '../../shows/marquee';
import show from '../../shows/rainbow';

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
	//show.starburst(virtualLeds, 200, 0, 0);
	//show.marquee(virtualLeds, 200, 0, 0);
    show.rainbow(virtualLeds);
	setTimeout(doShow, 50);
};

doShow();

