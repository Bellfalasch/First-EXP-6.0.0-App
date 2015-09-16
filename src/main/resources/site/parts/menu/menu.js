var portal = require('/lib/xp/portal');
var thymeleaf = require('/lib/xp/thymeleaf');
var contentLib = require('/lib/xp/content');

var UTIL = require('/lib/enonic/util/util');
var MENU = require('/lib/enonic/menu/menu');

// Handle the GET request
exports.get = function(req) {
    var model = {};

    model.menuItems = MENU.getMenuTree(2);

//    UTIL.log(model.menuItems);

    // START MENUITEM CODE - the manual way, for reference
/*
    model.site = portal.getSite();

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

    // Specify the view file to use
    var view = resolve('menu.html');

    // Compile HTML from the view with dynamic data from the model
    var body = thymeleaf.render(view, model);

    // Return the response object
    return {
        body: body
    }

};
