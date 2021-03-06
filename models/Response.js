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
		// track: true, 
		autokey: { path: 'response_key', from: 'creator', unique: true }
	});

/**
 * Model Fields
 * @main Response
 */
Response.add({
	name: { type: String, label: 'Response Name', default: "response-", initial: true, required: true },
	response: { type: String, label: 'Response'},
	iconKey: { type: String, label: 'Icon Key'},
	iconUrl: { type: String, label: 'Icon Url'},
	type: { type: Types.Select, label: 'Type', options: 'Text, Image'},
	creator: { type: String, noedit: true, label: 'Creator\'s Name'}, 
	comments: { 
		type: Types.Relationship, 
		ref: 'Comment', 
		label: 'Response Comments', 
		many: true
	}, 
	commentCnt: { type: Number, label: 'Comment Count'},
	likes: { type: Number, label: 'Like Count' },
	created: { type: Date, default: Date.now, noedit: true, hidden: true }
});

// Response.schema.pre('save', function(doc, next) {

//     // Save state for post hook
//     if (this.comments)
// 	    this.commentCnt = this.comments.length();
// 	else 
// 		this.commentCnt = 0;

//     this.save();

// });

/**
 * Model Registration
 */
Response.defaultSort = '-created';
Response.defaultColumns = 'name, updatedAt';
Response.register();
