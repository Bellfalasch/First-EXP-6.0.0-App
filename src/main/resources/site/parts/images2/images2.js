var portal = require('/lib/xp/portal'); // Import the portal functions
var thymeleaf = require('/lib/xp/thymeleaf'); // Import the Thymeleaf rendering function
//var contentLib = require('/lib/xp/content');
var util = require('/lib/utilities'); // My own extension functions

// Handle the GET request
exports.get = function(req) {

	var model = {};

	// Find the current component from request
	var component = portal.getComponent();

	var config = component.config;

	var imageUrls = new Array();
	var imageKeys = new Array();
	var imageUrl = null;

	// Add util.forceArray to utilities
	imageKeys = config.image ? util.forceArray( config.image ) : null;

	if (imageKeys) {
		for (var i = 0; i < imageKeys.length; i++) {
			if ( imageKeys[i] ) {

				imageUrl = portal.imageUrl({
					id: imageKeys[i],
					scale: 'block(200,200)',
					format: 'jpg'
				});

				imageUrls.push(imageUrl);
			}
		}
	}

	model.imagelist = imageUrls.length > 0 ? imageUrls : null;

//	util.log(model);

    // Specify the view file to use
    var view = resolve('images2.html');

    // Return the response object
    return {
        body: thymeleaf.render(view, model)
    }
};