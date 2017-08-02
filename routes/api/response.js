'use strict';


var keystone = require('keystone'),
    async = require('async'),
    appRoot = require('app-root-path');
    
var GameSession = keystone.list('PlanSession'),
    Prompt = keystone.list('Prompt'),
    Icon = keystone.list('Icon'),
    Response = keystone.list('Response'),
    Comment = keystone.list('Comment'),
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
    var query = Prompt.model.findOne({ promptId: req.query.plan },{},{})
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

// Add Responses to Prompts
exports.respond = function(req, res) {

    Prompt.model.findOne({ promptId: req.query.plan }).populate('icons').exec((err, prompt) => {

        // var Icon = this.keystone.list('Icon').model;
        Icon.model.findOne({ '_id': req.query.response }).exec((err, icon) => {

          if (icon) {

            var response = {
              name: req.query.creator,
              type: req.query.type,
              iconKey: req.query.response, 
              iconUrl: icon.icon.url, 
              creator: req.query.creator,
            }

          } else {

            var response = {
              name: req.query.creator,
              type: req.query.type,
              response: req.query.response, 
              creator: req.query.creator,
            }

          }

          // Create response item
          new Response.model(response).save((err, response) => {

            if (response.comments)
                response.commentCnt = this.comments.length();
            else 
              response.commentCnt = 0;

              response.save();

            prompt.responses.push(response);
            prompt.save((err, newprompt) => {

                var responseData = {
                  response: response, 
                  id: newprompt.promptId
                }
                
                Templates.Load('partials/response', responseData, (html) => {
                  // Send the new response 
                  res.send({ html: html, data: responseData });

                });
                

            });
            
          });

        });

    });

};

// Add Comments and Likes to Responses
exports.update = function(req, res) {

    Response.model.findOne({ '_id': req.query.response })
    .populate('comments')
    .exec(function(err, response){

        if (req.query.like) {
            response.likes += parseFloat(req.query.like);
            response.save();
        }

        if (req.query.comment) {

          var commentData = {
            name: "Comment-" + req.query.creator,
            comment: req.query.comment,
            creator: req.query.creator
          }

          // Create comment item
          new Comment.model(commentData).save((err, comment) => {

            // comment.origin = response;
            comment.save();

            response.comments.push(comment);
            response.save((err, newresponse) => {

                var responseData = {
                  comment: comment,
                  commentCnt: newresponse.commentCnt, 
                  likes: newresponse.likes
                }
                
                // Templates.Load('partials/comment', responseData, (html) => {
                  // Send the new response 
                  res.send({ data: responseData });

                // });
                

            });
            
          });
        } else {

          var responseData = {
            commentCnt: response.commentCnt, 
            likes: response.likes
          }
          res.send({ data: responseData });

        }

    })


};

// Get Comments for Response Archives
exports.comments = function(req, res) {

    Response.model.findOne({ '_id': req.query.response })
    .populate('comments')
    .exec(function(err, response){

      var responseData = {
        comment: response.comments
      }
      
      Templates.Load('partials/commentFeed', responseData, (html) => {
        // Send the new response 
        res.send({ html: html, data: responseData });

      });

    });
};
