/*
 * This loader pings a Zapier Storage key every second to load new color settings
*/

const fetch = require('node-fetch');

var fetchSettings = function(cb, secretKey) {
    if (!secretKey) {
        cb(null, 'No secret key provided');
    }

    var request = 'https://store.zapier.com/api/records?secret=' + secretKey;

    fetch(request).then( function(result) {
        return result.json();
    })
    .then( function(json) {
        if (json) {
            cb(json);
        } else {
            cb(null, 'Unable to retrieve JSON from Zapier Storage. ' + result.text());
        }
    });
};

module.exports = fetchSettings;
