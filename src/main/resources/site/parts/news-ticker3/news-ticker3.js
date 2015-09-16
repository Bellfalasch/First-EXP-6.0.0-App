var portal = require('/lib/xp/portal');
var thymeleaf = require('/lib/xp/thymeleaf');
var contentLib = require('/lib/xp/content');
var UTIL = require('/lib/util/js/util.js');

// Handle the GET request
exports.get = function(req) {

	var model = {};

	var result = contentLib.getChildren({
	    key: '/hello-world/newsticker',
	    start: 0,
	    count: 5,
	    sort: '_modifiedTime ASC'
	});

	model.content = result;

	UTIL.log(result);

    // Specify the view file to use
    var view = resolve('news-ticker3.html');

    // Render the dynamic HTML with values from the model
    var body = thymeleaf.render(view, model);

    // Return the response object
    return {
        body: body
    };
};