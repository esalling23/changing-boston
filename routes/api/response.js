'use strict';


var keystone = require('keystone'),
    async = require('async'),
    appRoot = require('app-root-path');
    
var Game = require(appRoot + '/lib/PromptManager'),
	GameSession = keystone.list('GameSession'),
    Session = require(appRoot + '/lib/SessionManager');

/**
 * Create a GameSession
 */
exports.create = function(req, res) {

    var data;
    var session;

    data = req.body;

    session = new GameSession.model();

    // Save this session to memory for faster retrieval (deleted when game ends)
    Session.Create('TEST', new Game(session));

    res.send('/create');
        
};

/**
 * Generate info for Game creation menu
 */
exports.generate = function(req, res) {

    // var TemplateLoader = require(appRoot + '/lib/TemplateLoader');
    const randomstring = require('randomstring'); 
    let gameCode;

    function generateCode() {

        return randomstring.
               generate({ length: 4, charset: 'alphabetic' }).toUpperCase();
    
    }

    gameCode = generateCode();

    // Check if there's already a game with the generated access code
    GameSession.model.findOne({accessCode: gameCode}, function (err, session) {

        // There is! A one in 15,000 probability! Make a new one
        if (session)
            gameCode = generateCode();

        console.log(gameCode);

        // // Create a prompt model with the submitted prompt
        
        // decksQuery.exec((err, decks) => {
            
        //     var Templates = new TemplateLoader();

        //     // Shuffle deck roles and only get 6
        //     _.each(decks, (deck, i) => {
        //         deck.roles = _.sample(deck.roles, 6);
        // //     });

        //     Templates.Load('partials/decider/decks', decks, function(html) {

        //         res.send({code: gameCode, html: html});

        //     });

        // });

    });

};
