var portal = require('/lib/xp/portal'); // Import the portal functions
var thymeleaf = require('/lib/xp/thymeleaf'); // Import the Thymeleaf rendering function
//var contentLib = require('/lib/xp/content');
var util = require('/lib/utilities'); // My own extension functions

// Handle the GET request
exports.get = function(req) {

	var model = {};

	// Find the current component from request
	var component = portal.getComponent();

//	util.log(component);

	var content = component.config;

	var imageUrl = null;

	// Get the true image URL (only the ID to it is stored in Enonic)
	if ( content.image ) {
		imageUrl = portal.imageUrl({
			id: content.image,
			quality: 90, // Default is 85
			scale: "block(200,200)"
		});
	}

	model.image = imageUrl;
	model.header = content.heading;

    // Specify the view file to use
    var view = resolve('images1b.html');

    // Return the response object
    return {
        body: thymeleaf.render(view, model)
    }
};