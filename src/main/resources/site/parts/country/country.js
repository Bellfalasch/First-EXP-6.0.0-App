var portal = require('/lib/xp/portal');
var thymeleaf = require('/lib/xp/thymeleaf');
var UTIL = require('/lib/enonic/util/util'); // From Task

// Handle the GET request
exports.get = function(req) {

    // Get the country content and extract the needed data from the JSON
    var content = portal.getContent();

    UTIL.log(content); // From Task

    var name = content.displayName;
    var description = content.data.description;
    var population = content.data.population;

    // From Task: HTML
    var html = portal.processHtml({
        value: content.data.html
    });

    // Prepare the model object that will be passed to the view file
    var model = {
        name: name,
        description: description,
        population: population,
        data: content.data, // From Task: RadioButtons
        html: html // From Task: HTML
    };

    // Specify the view file to use
    var view = resolve('country.html');

    // Render the dynamic HTML with values from the model
    var body = thymeleaf.render(view, model);

    // Return the response object
    return {
        body: body
    };
};
