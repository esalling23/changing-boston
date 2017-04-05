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
    Icon = keystone.list('Icon')
    _ = require('underscore');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    // Init locals
    locals.section = 'create';
    locals.promptId = 'TEST';

    view.on('init', function(next) {

        var queryPrompt = Prompt.model.findOne({}, {}, {
            sort: {
                'createdAt': -1
            }
        });
        var queryIcon = Icon.model.find({}, {}, {
            sort: {
                'createdAt': -1
            }
        });
        
        queryPrompt.exec(function(err, resultPrompt) {
            if (err) throw err;

            locals.prompt = resultPrompt;

            queryIcon.exec(function(err, resultIcon) {
                if (err) throw err;

                locals.icons = resultIcon;

                next();

            });

        });

    });

    // Render the view
    view.render('create');

};
