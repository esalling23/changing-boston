/**
 * (Site name here) 
 * 
 * Response page Model
 * @module Response
 * @class Response
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Response model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Response = new keystone.List('Response', 
	{
		label: 'Responses',
		singular: 'Response',
		track: true, 
		autokey: { path: 'response_key', from: 'name', unique: true }
	});

/**
 * Model Fields
 * @main Response
 */
Response.add({
	name: { type: String, label: 'Response Name', default: "response-", initial: true, required: true },
	type: { type: Types.Select, label: "Response Type", options: 'Text, Draw', default: 'Text', initial: true, required: true }, 
	text: { type: String, label: 'Response Text', 
		dependsOn: { 'type': ['Text'] } 
	},
	drawing: { type: String, label: 'Response Drawing', 
		dependsOn: { 'type': ['Draw'] } 
	},
	index: { type: Number, noedit:true, label: 'Response Index' },
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});

// Response.schema.pre('save', function(next) {

//     // Save state for post hook
//     this.wasNew = this.isNew;
//     this.wasModified = this.isModified();

//     this.name = this.title;

//     next();

// });

/**
 * Model Registration
 */
Response.defaultSort = '-createdAt';
Response.defaultColumns = 'name, updatedAt';
Response.register();
