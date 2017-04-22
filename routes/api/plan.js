'use strict';


var keystone = require('keystone'),
    async = require('async'),
    appRoot = require('app-root-path');
    
var Game = require(appRoot + '/lib/PromptManager'),
    TemplateLoader = require(appRoot + '/lib/TemplateLoader'),
    Templates = new TemplateLoader(),
	GameSession = keystone.list('GameSession'),
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

        console.log(gameCode);

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
                    }

                    Templates.Load('partials/plan', data, function(html) {

                        locals.section = 'new-plan';

                        res.send({data: data, eventData: html});

                    }); 
                    console.log('success')

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

    console.log("getting");    

    // Find their selected prompt/plan
    Prompt.model.findOne({promptId: req.query.promptId}, function (err, session) {

        console.log(session);

        session.prompt = req.query.prompt;

        session.save(function(err, updated){

            Icon.model.find({}, function (err, icon) {

                let data = {
                    prompt: session.prompt,
                    promptId: session.promptId, 
                    selectedIcons: session.icons,
                    icons: icon
                }

                Templates.Load('partials/plan', data, function(html) {

                    locals.section = 'plan';

                    res.send({data: data, eventData: html});

                }); 
            });

        })

    });

};


/**
 * Update a prompt ( save )
 */
exports.get = function(req, res) {

    var locals = res.locals;

    console.log("getting");    

    // Find their selected prompt/plan
    Prompt.model.findOne({promptId: req.query.promptId}, function (err, session) {

        console.log(session);

        Icon.model.find({}, function (err, icon) {

            let data = {
                prompt: req.query.text,
                promptId: gameCode, 
                icons: req.query.icons
            }

            Templates.Load('partials/plan', data, function(html) {

                locals.section = 'plan';

                res.send({data: data, eventData: html});

            }); 
            console.log('success')

        });
        

    });

};

/**
 * Launch a prompt ( Go Live )
 */
exports.launch = function(req, res) {

    var locals = res.locals;

    console.log('launching')

    // // var TemplateLoader = require(appRoot + '/lib/TemplateLoader');
    // const randomstring = require('randomstring'); 
    // let gameCode;

    // function generateCode() {

    //     return randomstring.
    //         generate({ length: 4, charset: 'alphabetic' }).toUpperCase();
    
    // }

    // gameCode = generateCode();

    // // Check if there's already a game with the generated access code
    // GameSession.model.findOne({accessCode: gameCode}, function (err, session) {

    //     // There is! A one in 15,000 probability! Make a new one
    //     if (session)
    //         gameCode = generateCode();

    //     console.log(gameCode);

    //     // Create a prompt model with the submitted prompt and user id
    //     new Prompt.model({
    //         prompt: req.query.text,
    //         promptId: gameCode,
    //         planner: req.query.id
    //     }).save(function(err, newprofile) {

    //         if (err)
    //             console.log(err);
    //         else {

    //             res.send('planner/profile/' + newprofile.id);
    //             console.log('success')
    //         }

    //     });
        

    // });

};