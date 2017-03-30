/**
 * (Site name here)
 * Developed by Engagement Lab, 2016
 * ==============
 * Index page view controller.
 *
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 *
 * @class Index
 * @author 
 *
 * ==========
 */
var keystone = require('keystone'),
    Prompt = keystone.list('Prompt'),
    _ = require('underscore');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    // Init locals
    locals.section = 'present';

    view.on('init', function(next) {

        var queryPrompt = Prompt.model.findOne({}, {}, {
            sort: {
                'createdAt': -1
            }
        })
        .populate('responses');
        
        queryPrompt.exec(function(err, resultPrompt) {
            if (err) throw err;

            locals.prompt = resultPrompt;

            next();

        });

    });

    // Render the view
    view.render('present');

};
