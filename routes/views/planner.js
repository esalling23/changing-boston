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
    Planner = keystone.list('Planner'),
    GameSession = keystone.list('GameSession'),
    appRoot = require('app-root-path'),
    // Session = require('learning-games-core').SessionManager,
    _ = require('underscore');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;        
    // Init locals
    locals.section = 'profile';

    view.on('init', function(next) {

        var queryProfile = Planner.model.findOne({ '_id': req.params.id }, {}, {});

        var queryPrompt = Prompt.model.find({}, {}, {
            sort: {
                'createdAt': -1
            }
        })
        .populate('responses planner icons');
        
        queryPrompt.exec(function(err, resultPrompt) {
            if (err) throw err;

            _.each(resultPrompt, function(prompt){
                if (!prompt.planner){
                    return;
                }
                else if (prompt.planner.id == req.params.id) {
                    console.log("this plan was made by this fucker")
                    locals.plans = resultPrompt;
                }
                
            });
            queryProfile.exec(function(err, resultPlanner) {

                locals.planner = resultPlanner;

                next();

            });
        });
    });

    // Render the view
    view.render('planner');

};
