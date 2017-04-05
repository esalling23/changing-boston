'use strict';


var keystone = require('keystone'),
    async = require('async'),
    appRoot = require('app-root-path');
    
var Game = require(appRoot + '/lib/PromptManager'),
		Response = keystone.list('Response'),
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
