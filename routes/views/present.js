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
    appRoot = require('app-root-path'),
    Prompt = keystone.list('Prompt'),
    PlanSession = keystone.list('PlanSession'),
    Plan = require(appRoot + '/lib/PromptManager'),
    Session = require(appRoot + '/lib/SessionManager')
    _ = require('underscore');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals,
        session = new PlanSession.model();

    // var recent = function(val) {
    //     return val.filter(function(item) {
    //         return ;
    //     });
    // };

    // var popular = function(val, opt) {
    //     return val.filter(function(item) {
    //         return opt.indexOf(item.form.key) >= 0;
    //     });
    // };

    // Init locals
    locals.section = 'present';

    // Save this session to memory for faster retrieval (deleted when game ends)
    Session.Create(req.params.promptId, new Plan(session));

    view.on('init', function(next) {

        var queryPrompt = Prompt.model.findOne({ promptId: req.params.promptId }, {}, {})
        .populate('responses');
        
        queryPrompt.exec(function(err, resultPrompt) {
            if (err) throw err;

            locals.responses = resultPrompt.responses.sort('-created');

            locals.prompt = resultPrompt;

            next();

        });

    });

    // Render the view
    view.render('group/live');

};
