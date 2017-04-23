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
      // var TemplateLoader = require('./TemplateLoader');
      // this.Templates = new TemplateLoader();

      this.keystone = require('keystone');
      
    }

    
	  Response(socket, data) {

      console.log(data, " data");

      this.socket = socket;

      var Response = this.keystone.list('Response');
      var Prompt = this.keystone.list('Prompt').model;

      Prompt.findOne({ promptId: data.room }).exec((err, prompt) => {

        // Create response item
        new Response.model({
          name: data.creator,
          type: data.type,
          response: data.response, 
          creator: data.creator,
        }).save((err, response) => {

          prompt.responses.push(response);
          prompt.save((err, newprompt) => {
            this.socket.to(data.room).emit('response:update', response );
          });
          
        });

        
      });
      

	  }

}

module.exports = Common;