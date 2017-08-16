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
		// track: true, 
		map: { name: 'prompt' },
		autokey: { path: 'prompt_key', from: 'prompt', unique: true }
	});

/**
 * Model Fields
 * @main Prompt
 */
Prompt.add({
	prompt: { type: String, label: "Prompt", note: 'This is the primary prompt', initial: true, required: true }, 
	location: { type: Types.Location, label: "Location" },
	promptAlt: { type: Types.TextArray, label: "Alternate Prompts", note: 'Generally for different languages' },
	altLang: { type: Types.TextArray, label: "Alternate Prompt Languages", note: 'There should be one language per prompt' },
	description: { type: Types.Markdown, label: 'Background Context', required: true, initial: true },
	icons: {
		type: Types.Relationship, 
		ref: 'Icon', 
		label: 'Icons',
		many: true, 
	},
	responses: {
		type: Types.Relationship, 
		ref: 'Response', 
		label: 'Responses',
		many: true, 
		noedit: true
	},
	enabled: { type: Boolean, label: "Live" },	
	archived: { type: Boolean, label: "Archived", dependsOn: {enabled: false}},	
	planner: {
		type: Types.Relationship, 
		ref: 'Planner', 
		label: 'Planner',
		many: false,
		noedit: true
	},
	demoSurvey: { type: Types.Textarea, label: 'Demographics Survey Embed Link' },
	promptId: { type: String, label: "This is the special room code for this prompt" },
	created: { type: Date, default: Date.now, noedit: true, hidden: true }
});

// TO DO: Add after that adds ID of 4 random letters for session sockets

Prompt.schema.pre('save', function(next) {

    // Save state for post hook
	if (this.promptAlt.length > 0 && (this.altLang.length < this.promptAlt.length)) {
        var err = new Error('You cannot have more prompts than languages.');
        next(err);
    }

    next();

});
/**
 * Model Registration
 */
Prompt.defaultSort = '-createdAt';
Prompt.defaultColumns = 'prompt, enabled, archived, updatedAt';
Prompt.register();
