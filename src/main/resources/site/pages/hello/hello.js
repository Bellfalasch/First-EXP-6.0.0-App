var portal = require('/lib/xp/portal'); // Import the portal functions
var thymeleaf = require('/lib/xp/thymeleaf'); // Import the thymeleaf render function
var contentLib = require('/lib/xp/content'); // Import the content service functions

var UTIL = require('/lib/enonic/util/util'); // Nice to have functionality, included in gradle.build

// Handle the GET request
exports.get = function(req) {
    var model = {};

    model.site = portal.getSite();

    model.menuItems = UTIL.menu.get(2);

    // START MENUITEM CODE - the manual way
/*
    var subMenus = [];
    var siteContent = model.site; // portal.getSite() needs to be called already

    var children = contentLib.getChildren({
        key: siteContent._id,
        count: 100
    });

    util.log(children);

    children.contents.forEach( function(child) {
        if (child.data) {
        	if (child.data.menuItem) {
	        	if (child.data.menuItem === true) {
	            	subMenus.push(child);
	            }
            }
        }
    });

    model.menuItems = subMenus;
*/
    // END MENUITEM CODE


    model.content = portal.getContent();

    // Get all the country contents
    var result = contentLib.query({
        start: 0,
        count: 100,
        contentTypes: [
            app.name + ':country'
        ]
    });

    UTIL.log(result); // From Task

    var contents = result.hits;
    var countries = new Array();

    // Loop through the contents and extract the needed data
    for(var i = 0; i < contents.length; i++) {

        var country = {};
        country.name = contents[i].displayName;
        country.contentUrl = portal.pageUrl({
            id: contents[i]._id
        });
        countries.push(country);
    }

    // Add the country data to the model
    model.countries = countries;

    // Specify the view file to use
    var view = resolve('hello.html');

    // Compile HTML from the view with dynamic data from the model
    var body = thymeleaf.render(view, model);

    // Return the response object
    return {
        body: body
    }

};
