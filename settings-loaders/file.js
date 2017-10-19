
/* This fetch method reads from the local filesystem
*/

const fs = require('fs');

var fetchSettings = function(cb, localSettingsFilename) {
    if (!localSettingsFilename) {
        cb();
    }

    fs.readFile(localSettingsFilename, 'utf8', function(err, data) {
        if (data) {
            cb(JSON.parse(data));
            setTimeout(fetchSettings, 1000, cb, localSettingsFilename);
        } else {
            console.log('Unable to retrieve JSON from file ' + localSettingsFilename);
        }
    });
};

module.exports = fetchSettings;
