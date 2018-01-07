var shows = {};
shows.solid = require('./solid').show;
shows.marquee = require('./marquee').show;
shows.starburst= require('./starburst').show;
shows.rainbow = require('./rainbow').show;
shows.alternate = require('./alternate').show;
shows.spinner = require('./spinner').show;
shows.walking = require('./walking').show;
shows.ripple = require('./ripple').show;
shows.mainframe= require('./mainframe').show;

module.exports = shows;
