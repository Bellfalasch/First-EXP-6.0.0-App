var portal = require('/lib/xp/portal');
var thymeleaf = require('/lib/xp/thymeleaf');

// Handle the GET request
exports.get = function(req) {

	var model = {};

	// Find the current component from request
	var component = portal.getComponent();

	var content = component.config;

	var imageID = null;

	// Get the true image URL (only the ID to it is stored in Enonic)
	if ( content.image ) {
		imageID = content.image;
	}

	model.image = imageID;
	model.header = content.heading;

    // Specify the view file to use
    var view = resolve('images.html');

    // Render the dynamic HTML with values from the model
    var body = thymeleaf.render(view, model);

    // Return the response object
    return {
        body: body
    };
};