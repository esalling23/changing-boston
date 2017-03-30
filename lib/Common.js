'use strict';

class Common {

    constructor() {

      var Templates,
      keystone,
      comments;

    }

	  Initialize(session) {

	  	console.log("initialize");

      // Init template loader with current game type - Credit to JR
      var TemplateLoader = require('./TemplateLoader');
      this.Templates = new TemplateLoader();

      this.keystone = require('keystone');
      
    }

    
	  SendResponse(socket, response) {

      this.gameSocket = socket;

      console.log(response, " well shit here we go back here ");

      socket.emit('response:update', { response: response })

	  }

}

module.exports = Common;