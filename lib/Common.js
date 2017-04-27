'use strict';

class Common {

    constructor() {

      var Templates,
      keystone,
      socket, 
      response,

      comments;

    }

	  Initialize(session) {

	  	console.log("initialize");

      // Init template loader with current game type - Credit to JR
      var TemplateLoader = require('./TemplateLoader');
      this.Templates = new TemplateLoader();

      this.keystone = require('keystone');
      
    }

    
	  Response(socket, data) {

      console.log(data, " data");

      this.socket = socket;

      let code = data.room;

      var Response = this.keystone.list('Response');
      var Prompt = this.keystone.list('Prompt').model;

      Prompt.findOne({ promptId: code }).populate('icons').exec((err, prompt) => {

        var Icon = this.keystone.list('Icon').model;
        Icon.findOne({ '_id': data.response }).exec((err, icon) => {

          if (icon) {

            var response = {
              name: data.creator,
              type: data.type,
              iconKey: data.response, 
              iconUrl: icon.icon.url, 
              creator: data.creator,
            }

          } else {

            var response = {
              name: data.creator,
              type: data.type,
              response: data.response, 
              creator: data.creator,
            }

          }

          // Create response item
          new Response.model(response).save((err, response) => {

            console.log(response, "RESPONSE")

            prompt.responses.push(response);
            prompt.save((err, newprompt) => {

                var responseData = {
                  response: response
                }

                let path = 'partials/response';
                
                this.Templates.Load(path, responseData, (html) => {
                  console.log(html, code)
                  // Send the new response 
                  this.socket.to(code).emit('response:update', { html: html, data: responseData } );

                });
                

            });
            
          });

        });

      });
      

	  }

}

module.exports = Common;