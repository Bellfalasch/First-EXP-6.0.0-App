var portal = require('/lib/xp/portal'); // Import the portal functions
var thymeleaf = require('/lib/xp/thymeleaf'); // Import the Thymeleaf rendering function

// Handle the GET request
exports.get = function(req) {

	var model = {};

	// Find the current component from request
	var component = portal.getComponent();

	var config = component.config;

	var imageUrls = new Array();
	var imageKeys = new Array();

	imageKeys = config.image ? util.forceArray( config.image ) : null;

	if (imageKeys) {
		for (var i = 0; i < imageKeys.length; i++) {
			if ( imageKeys[i] ) {

				var images = {}; // Temp object used to store our two image sizes

				images.src = portal.imageUrl({
					id: imageKeys[i],
					scale: 'block(200,200)',
					format: 'jpg'
				});

				images.href = portal.imageUrl({
					id: imageKeys[i],
					scale: 'width(1024)',
					format: 'jpg'
				});

				imageUrls.push(images);
			}
		}
	}

	model.imagelist = imageUrls.length > 0 ? imageUrls : null;

    // Specify the view file to use
    var view = resolve('images3.html');

    // Render the dynamic HTML with values from the model
    var body = thymeleaf.render(view, model);

    // Return the response object
    return {
        body: body
    };
};