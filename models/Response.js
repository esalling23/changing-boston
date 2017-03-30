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
		autokey: { path: 'Response_key', from: 'name', unique: true }
	});

/**
 * Model Fields
 * @main Response
 */
Response.add({
	name: { type: String, lablel: 'Response Name', initial: true, required: true },
	type: { type: Types.Select, label: "Response Type", options: 'Text, Draw', default: 'Text', initial: true, required: true }, 
	text: { type: String, label: 'Response Text', 
		dependsOn: { 'type': ['Text'] } 
	},
	drawing: { type: String, label: 'Response Text', 
		dependsOn: { 'type': ['Draw'] } 
	},
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});

/**
 * Model Registration
 */
Response.defaultSort = '-createdAt';
Response.defaultColumns = 'name, updatedAt';
Response.register();
