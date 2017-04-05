'use strict';

class Common {

    constructor() {

      var Templates,
      keystone,
      gameSocket, 

      comments;

    }

	  Initialize(session) {

	  	console.log("initialize");

      // Init template loader with current game type - Credit to JR
      // var TemplateLoader = require('./TemplateLoader');
      // this.Templates = new TemplateLoader();

      this.keystone = require('keystone');
      
    }

    
	  SendResponse(socket, prompt, response) {

      this.gameSocket = socket;

      var queryPrompt = promptModel.findOne({ key: prompt });

      let responseGroup = 0;

      // Update this prompt with this response
      queryPrompt.exec((err, article) => {

        responseGroup = article.responses.length();


      });

      // Check that this prompt is "live"

          // To do



      var Response = keystone.model('Response')

      // Create response item
      var newResponse = new Response.model({
           name: response,
           type: 'Text',
           text: response
      });

      newResponse.save(function(err) {
          // post has been saved   
          console.log()   
      });
      // keystone.createItems({
      //   this.Response: [{
      //    
      //   }]
      // }), function(err, stats) {
      //   stats && console.log(stats.message);
      //   done(err);
      // });;



      

      // Update this prompt with this response
      queryPrompt.exec((err, article) => {

          article.twisted = score + 1;
      //     article.save();

          this.gameSocket.emit('response:update', { response: response });

      });

      

	  }

}

module.exports = Common;