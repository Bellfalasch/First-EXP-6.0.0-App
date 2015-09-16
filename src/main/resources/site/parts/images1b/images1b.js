var portal = require('/lib/xp/portal');
var thymeleaf = require('/lib/xp/thymeleaf');

// Handle the GET request
exports.get = function(req) {

	var model = {};

	// Find the current component from request
	var component = portal.getComponent();

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

    // Render the dynamic HTML with values from the model
    var body = thymeleaf.render(view, model);

    // Return the response object
    return {
        body: body
    };
};