'use strict';

/**
 * Emerging Citizens
 * Developed by Engagement Lab, 2016
 * ==============
 * Prompt manager.
 *
 * @class lib
 * @static
 * @author Johnny Richardson
 *
 * ==========
 */

var PromptManager = function(session) {
	
	var Prompt;
	
	var Lib = require('./Common');
	Prompt = new Lib();

	Prompt.Initialize(session);

	return Prompt;

};

module.exports = PromptManager;