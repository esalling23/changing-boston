/**
 * (Site name here) 
 * 
 * Comment page Model
 * @module Comment
 * @class Comment
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Comment model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Comment = new keystone.List('Comment', 
	{
		label: 'Comments',
		singular: 'Comment',
		// track: true, 
		autokey: { path: 'comment_key', from: 'name', unique: true }
	});

/**
 * Model Fields
 * @main Comment
 */
Comment.add({
	name: { type: String, label: 'Comment Name', default: "Comment-", initial: true, required: true },
	comment: { type: String, label: 'Comment'},
	creator: { type: String, noedit: true, label: 'Creator\'s Name'},
	likes: { type: Number, label: 'Like Count' }, 

	origin: {
		type: Types.Relationship, 
		label: 'Comment Origin Response', 
		ref: 'Response', 
		refPath: 'comments'
	}
	// createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});

// Comment.schema.pre('save', function(next) {

//     // Save state for post hook
//     this.wasNew = this.isNew;
//     this.wasModified = this.isModified();

//     this.name = this.title;

//     next();

// });

/**
 * Model Registration
 */
Comment.defaultSort = '-createdAt';
Comment.defaultColumns = 'name, updatedAt';
Comment.register();
