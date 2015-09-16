/*
Here you can create your own site library and use (with require) on any page.
However this is not used since we use the Lib Util functionality included with our build.gradle-file.


exports.log = function (data) {
  log.info('Utilities log %s', JSON.stringify(data, null, 4));
};

exports.forceArray = function(data) {
    if (!Array.isArray(data)) {
        data = [data];
    }
    return data;
};
*/