/* This fetch method pings the CnC server every second to load new settings
*/

const fetch = require('node-fetch');

var fetchSettings = function(cb, secretKey) {
    if (!secretKey) {
        cb();
    }

    var request = 'https://store.zapier.com/api/records?secret=' + secretKey;

    fetch(request).then( function(result) {
        return result.json();
    })
    .then( function(json) {
        if (json) {
            cb(json);
            setTimeout(fetchSettings, 1000, cb, secretKey);
        } else {
            console.log("Unable to retrieve JSON from CnC server", result.text());
        }
    });
};

module.exports = fetchSettings;
