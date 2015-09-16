var portal = require('/lib/xp/portal'); // Import the portal functions
var thymeleaf = require('/lib/xp/thymeleaf'); // Import the Thymeleaf rendering function
var UTIL = require('/lib/util/js/util.js');

// Handle the GET request
exports.get = function(req) {

	var model = {};

	// Find the current component from request
	var component = portal.getComponent();

	// Find a config variable for the component
	var config = component.config;

	model.config = config;

	UTIL.log(config);

    // Specify the view file to use
    var view = resolve('news-ticker2.html');

    // Render the dynamic HTML with values from the model
    var body = thymeleaf.render(view, model);

    // Return the response object
    return {
        body: body
    };
};