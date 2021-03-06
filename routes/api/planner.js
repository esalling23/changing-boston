'use strict';


var keystone = require('keystone'),
    async = require('async'),
    appRoot = require('app-root-path');
    
var Game = require(appRoot + '/lib/PromptManager'),
	GameSession = keystone.list('PlanSession'),
    Planner = keystone.list('Planner'),
    Session = require(appRoot + '/lib/SessionManager');


// Create a planner profile
exports.create = function(req, res) {

    // Check if this user already has a profile
    var query = Planner.model.findOne({ email:req.query.email });
    query.exec(function (err, profile) {

        // Does this email already exist?
        if (profile) {
            console.log ("email in use - did you mean to sign in?");
            return;
        } else {
            
            new Planner.model({
                name: req.query.name,
                email: req.query.email,
                password: req.query.password
            }).save(function(err, newprofile) {

                if (err)
                    res.send({
                        error_code: "cannot_create",
                        msg: 'Sorry, we cannot create your profile at this time.'
                    });
                else {

                    res.send('planner/profile/' + newprofile.id);
                    console.log('success')
                }

            });

            

        }

    });

    // console.log ("dim");
};



exports.get = function(req, res) {

    var query = Planner.model.findOne({email:req.query.email});

    query.select('email password');

    query.exec(function (err, profile) {

        if (err) res.send({ error_code: "no_profile", msg: 'Sorry, we cannot find that profile.' });;
      
        var data = profile.id;

        profile._.password.compare(req.query.password, function(err, result){

            if (result) {
                res.send('/planner/profile/' + data);

            } else {
                res.send({
                    error_code: "wrong_password",
                    msg: 'Sorry, wrong password.'
                });
            }

      });
      
    });

};