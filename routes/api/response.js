'use strict';


var keystone = require('keystone'),
    async = require('async'),
    appRoot = require('app-root-path');
    
var GameSession = keystone.list('PlanSession'),
    Prompt = keystone.list('Prompt'),
    TemplateLoader = require(appRoot + '/lib/TemplateLoader'),
    Templates = new TemplateLoader(),
    Session = require(appRoot + '/lib/SessionManager');

/**
 * Create a GameSession
 */
exports.create = function(req, res) {

    var data;
    var session;

    data = req.body;

    

    res.send('/create');
        
};

/**
 * Get a prompt
 */
exports.get = function(req, res) {

    // Find their selected prompt/plan
    var query = Prompt.model.findOne({promptId: req.query.plan},{},{})
    .populate('icons');
    query.exec(function (err, session) {

        console.log(session);

        let data = {
            prompt: session.prompt,
            promptId: session.promptId, 
            icons: session.icons
        }

        Templates.Load('partials/input', data, function(html) {

            res.send({data: data, eventData: html});

        }); 
    });

};
