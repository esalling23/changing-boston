/**
 * (Site name here) 
 * 
 * Prompt page Model
 * @module Prompt
 * @class Prompt
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Prompt model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Prompt = new keystone.List('Prompt', 
	{
		label: 'Prompts',
		singular: 'Prompt',
		track: true, 
		map: { name: 'prompt' },
		autokey: { path: 'prompt_key', from: 'prompt', unique: true }
	});

/**
 * Model Fields
 * @main Prompt
 */
Prompt.add({
	prompt: { type: String, label: "Prompt", initial: true, required: true }, 
	location: { type: Types.Location, label: "Location" },
	icons: {
		type: Types.Relationship, 
		ref: 'Icon', 
		label: 'Icons',
		many: true
	},
	responses: {
		type: Types.Relationship, 
		ref: 'Response', 
		label: 'Responses',
		many: true, 
		hidden: true,
		noedit: true
	},
	enabled: { type: Boolean, label: "Enabled" },	
	planner: {
		type: Types.Relationship, 
		ref: 'Planner', 
		label: 'Planner',
		noedit: true
	}
	promptId: { type: String, noedit: true, label: "This is the special code for this prompt" },
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});

// TO DO: Add after that adds ID of 4 random letters for session sockets

/**
 * Model Registration
 */
Prompt.defaultSort = '-createdAt';
Prompt.defaultColumns = 'name, updatedAt';
Prompt.register();
