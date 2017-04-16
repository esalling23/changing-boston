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
    GameSession = keystone.list('GameSession'),
    appRoot = require('app-root-path'),
    // Session = require('learning-games-core').SessionManager,
    _ = require('underscore');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals, 
        promptCode;
    // Init locals
    locals.section = 'group';
    locals.prompt_not_found = false;

    if(Session.Get(accessCode)) {
        if(!data.name || data.name.length === 0) {
           res.send({error_code: 'no_username', msg: 'You need to enter a username!'});
           return;
        }
    }

    PromptSession.model.findOne({ accessCode: accessCode }, function (err, prompt) {

        if(!prompt || !Session.Get(accessCode)) {
            locals.prompt_not_found = true;
            res.send({error_code: 'prompt_not_found', msg: 'Prompt for room code "' + accessCode + '" not found.'});

            return;
        }
        else
            locals.prompt = prompt;
            
        res.send({code: prompt.accessCode});

    });

};
