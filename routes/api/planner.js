'use strict';


var keystone = require('keystone'),
    async = require('async'),
    appRoot = require('app-root-path');
    
var Game = require(appRoot + '/lib/PromptManager'),
	GameSession = keystone.list('GameSession'),
    Planner = keystone.list('Planner'),
    Session = require(appRoot + '/lib/SessionManager');


// Create a planner profile
exports.create = function(req, res) {

    var query = Planner.model.find({email:req.query.username});

    query.select('email password');

    query.exec(function (err, person) {

        // Does this email already exist?
        if (person) {
            console.log ("email in use - did you mean to sign in?");
            return;
        } else {
            
            new Planner.model({
                userName: req.body.username,
                email: req.body.email,
                pass: req.body.password
            }).save(function(err) {

                if (err)
                console.log(err);
              else 
                console.log ("success");

            });

        res.send('/planner/profile');

        }

    });

    // console.log ("dim");
};



exports.get = function(req, res) {

    var query = Planner.model.findOne({email:req.query.username});

    query.select('email password');

    query.exec(function (err, profile) {

        if (err) return handleError("we have not found your profile -- " + err);
      
        var data = {password:person.password, email:person.email};

        profile._.password.compare(req.query.password, function(err, result){

            if (result) {

                res.send('/planner/profile');

            } else {
                console.log("wrong password");
            }

      });
      
    });

};