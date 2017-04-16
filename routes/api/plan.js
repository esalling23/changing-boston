'use strict';


var keystone = require('keystone'),
    async = require('async'),
    appRoot = require('app-root-path');
    
var Game = require(appRoot + '/lib/PromptManager'),
	GameSession = keystone.list('GameSession'),
    Session = require(appRoot + '/lib/SessionManager');

/**
 * Start a PromptSession
 */
exports.start = function(req, res) {

    var data;
    var session;

    data = req.body;

    session = new GameSession.model();

    // Save this session to memory for faster retrieval (deleted when prompt event ends)
    Session.Create(data.code, new Game(session));

    res.send('/create');
        
};
