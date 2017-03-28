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
		map: { name: 'prompt_one' },
		autokey: { path: 'prompt_key', from: 'name', unique: true }
	});

/**
 * Model Fields
 * @main Prompt
 */
Prompt.add({
	prompt_one: { type: String, label: "First Prompt (Primer)", initial: true, required: true }, 
	prompt_two: { type: String, label: "Second Prompt (Engagement)"}, 
	enabled: { type: Boolean, label: "Enabled" },	
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});

/**
 * Model Registration
 */
Prompt.defaultSort = '-createdAt';
Prompt.defaultColumns = 'name, updatedAt';
Prompt.register();
