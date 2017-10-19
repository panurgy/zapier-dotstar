const ledStrip = require('./strip');
const settingsLoaders = require('./settings-loaders');

var SIMPLE_TIMER_LOOP = true;
if (process.env.SIMPLE_TIMER_LOOP == '0') {
  SIMPLE_TIMER_LOOP = false;
}

const DEFAULT_BG_COLOR = { r: 200, g: 20, b: 0, a: 0.5 };
const DEFAULT_FG_COLOR = { r: 200, g: 200, b: 200, a: 0.5 };

// monkey-patch the "set" method so that we can "get" the info later
var ledInfo = [];
var realSetFunction = ledStrip.set;
var overrideSetFunction = function(pos, r, g, b, a) {
  ledInfo[pos] = {r:r, g:g, b:b, a:a};
  realSetFunction.apply(ledStrip, arguments);
};
ledStrip.set = overrideSetFunction;

ledStrip.get = function(pos) {
  return ledInfo[pos];
};

var shows = {};
shows.solid = require('./shows/solid').show;
shows.marquee = require('./shows/marquee').show;
shows.starburst= require('./shows/starburst').show;
shows.rainbow = require('./shows/rainbow').show;
shows.alternate = require('./shows/alternate').show;
shows.spinner = require('./shows/spinner').show;
shows.walking = require('./shows/walking').show;
shows.ripple = require('./shows/ripple').show;
shows.mainframe= require('./shows/mainframe').show;

var currentSettings = {
    bgcolor: DEFAULT_BG_COLOR,
    bgshow: 'solid',
    fgcolor: DEFAULT_FG_COLOR,
    fgshow: 'starburst',
};
var fetchSettings;
var fetchSettingsCallback = function(newSettings) {
    if (newSettings) {
        currentSettings = newSettings;
    }
};

// Determine how we will get the show settings
var secretKey = process.env.SECRET_KEY;
var localSettings = process.env.SHOW_SETTINGS_FILE;
if (secretKey) {
    console.log('SECRET_KEY set, will attempt to load settings from Command and Control server...');
    fetchSettings = function() { settingsLoaders.storage(fetchSettingsCallback, secretKey); }
} else if (localSettings) {
    console.log('SHOW_SETTINGS_FILE set, will load from the provided file...');
    fetchSettings = function() { settingsLoaders.file(fetchSettingsCallback, localSettings); };
} else {
    console.log("The 'SECRET_KEY' or 'SHOW_SETTINGS' env var is not set, falling back to default show settings...");
    fetchSettings = function() {};
}

// Starts the fetch loop for settings
fetchSettings();

// Runs the "current" show settings, and then submits itself to run 
//   again after a "very short" period of time.
var doShow = function() {
    // make a note of when we started
    var startTime = new Date().getTime();

    if (!shows[currentSettings.bgshow]) {
        currentSettings.bgshow = 'solid';
    }
    var bgcolor = currentSettings.bgcolor || DEFAULT_BG_COLOR;
    shows[currentSettings.bgshow](ledStrip, bgcolor);

    if (shows[currentSettings.fgshow]) {
        var fgcolor = currentSettings.fgcolor || DEFAULT_FG_COLOR;
        shows[currentSettings.fgshow](ledStrip, fgcolor);
    }

    ledStrip.sync();

    if (SIMPLE_TIMER_LOOP) {
      setTimeout(doShow, 50);
    } else {
      // see what time it is now
      var endTime = new Date().getTime();
      var elapsedTime = endTime - startTime;

      // ideally, we want the "next run" to be 50ms from the start time
      var nextRun = 50 - (elapsedTime);

      // but if this loop took "too long" then just use zero
      nextRun = Math.max(0, nextRun);
      setTimeout(doShow, nextRun);
    }
};

// start the show loop
doShow();
