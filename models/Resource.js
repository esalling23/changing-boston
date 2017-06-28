/**
 * (Site name here) 
 * 
 * Resource page Model
 * @module Resource
 * @class Resource
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Resource model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Resource = new keystone.List('Resource', 
	{
		label: 'Resources',
		singular: 'Resource',
		// track: true, 
		autokey: { path: 'Resource_key', from: 'name', unique: true }
	});

/**
 * Model Fields
 * @main Resource
 */
Resource.add({
	name: { type: String, lable: 'Resource Name', initial: true, required: true },
	type: { type: Types.Select, label: "Resource Type", options: '', initial: true, required: true }, 
	resource_two: { type: String, label: "Second Resource (Engagement)"}, 
	enabled: { type: Boolean, label: "Enabled" }
	// createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});

/**
 * Model Registration
 */
Resource.defaultSort = '-createdAt';
Resource.defaultColumns = 'name, updatedAt';
Resource.register();
