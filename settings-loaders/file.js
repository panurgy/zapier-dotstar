/*
 * This loader reads color settings from the local filesystem.
 */

const fs = require('fs');

var fetchSettings = function(cb, localSettingsFilename) {
    if (!localSettingsFilename) {
        cb(null, 'No filename provided');
        return;
    }

    fs.readFile(localSettingsFilename, 'utf8', function(err, data) {
        if (data) {
            cb(JSON.parse(data));
        } else {
            cb(null, 'Unable to retrieve JSON from file ' + localSettingsFilename);
        }
    });
};

module.exports = fetchSettings;
