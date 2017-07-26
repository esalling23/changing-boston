'use strict';


var keystone = require('keystone'),
    async = require('async'),
    appRoot = require('app-root-path');
    
var Plan = require(appRoot + '/lib/PromptManager'),
    TemplateLoader = require(appRoot + '/lib/TemplateLoader'),
    Templates = new TemplateLoader(),
	PlanSession = keystone.list('PlanSession'),
    Prompt = keystone.list('Prompt'),
    Icon= keystone.list('Icon'),
    Session = require(appRoot + '/lib/SessionManager');

/**
 * Start a new prompt
 */
exports.generate = function(req, res) {

    var locals = res.locals;

    console.log('generating');

    const randomstring = require('randomstring'); 

    let gameCode;

    function generateCode() {
        return randomstring.
            generate({ length: 4, charset: 'alphabetic' }).toUpperCase();
    }
    gameCode = generateCode();

    // Check if there's already a game with the generated access code
    Prompt.model.findOne({promptId: gameCode}, function (err, session) {

        // There is! A one in 15,000 probability! Make a new one
        if (session)
            gameCode = generateCode();

        // Create a prompt model with the submitted prompt and user id
        new Prompt.model({
            prompt: req.query.text,
            promptId: gameCode,
            planner: req.query.planner.replace('planner-profile-','')
        }).save(function(err, newprofile) {

            if (err)
                console.log(err);
            else {

                Icon.model.find({}, function (err, icon) {

                    let data = {
                        prompt: req.query.text,
                        promptId: gameCode, 
                        icons: icon
                    };

                    Templates.Load('partials/plan', data, function(html) {

                        locals.section = 'new-plan';

                        res.send({data: data, eventData: html});

                    }); 

                });

            }

        });

    });
};

/**
 * Continue an old prompt
 */
exports.get = function(req, res) {

    var locals = res.locals;

    // Find their selected prompt/plan
    Prompt.model.findOne({promptId: req.query.plan}, function (err, session) {

        Icon.model.find({}, function (err, icon) {

            _.each(session.icons, function(i){
                if (i.key == icon.key)
                    icon.selected = true;
            });

            let data = {
                prompt: session.prompt,
                promptId: session.promptId, 
                icons: icon
            }

            Templates.Load('partials/plan', data, function(html) {

                locals.section = 'respond';

                res.send({data: data, eventData: html});

            }); 
        });

    });

};


/**
 * Update a prompt ( save )
 */
exports.update = function(req, res) {

    var locals = res.locals;

    // Find their selected prompt/plan
    Prompt.model.findOne({promptId: req.query.plan}, function (err, session) {

        session.prompt = req.query.text;
        session.icons = req.query.icons;

        session.save();

        res.send({data: session});

    });

};

/**
 * Launch a prompt ( Go Live )
 */
exports.launch = function(req, res) {

    var locals = res.locals;
    var session = new PlanSession.model();

    // Save this session to memory for faster retrieval (deleted when game ends)
    Session.Create(req.query.plan, new Plan(session));

    // Locate the prompt
    Prompt.model.findOne({ promptId: req.query.plan }, function (err, session) {

        if (!session) {
            console.log("uhmmmmm there's no prompt to launch");
            return;
        }

        session.enabled = true;
        session.save();

        res.send('/plan/' + session.promptId);
        

    });

};

// Updating API's for responses

exports.reload = function(req, res) {

    console.log('reloading', req);

    // Locate the prompt
    Prompt.model.findOne({ promptId: req.query.plan }, function (err, session) {

        if (!session) {
            console.log("uhmmmmm there's no prompt here");
            return;
        }

        let data = {
            prompt: session.prompt,
            promptId: session.promptId, 
            responses: session.responses
        };

        Templates.Load('partials/responseGroup', data, function(html) {

            res.send({data: data, eventData: html});

        });

    });

};