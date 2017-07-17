/**
 * (Site name here) 
 * 
 * Icon page Model
 * @module Icon
 * @class Icon
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Icon model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Icon = new keystone.List('Icon', 
	{
		label: 'Icons',
		singular: 'Icon',
		// track: true, 
		autokey: { path: 'icon_key', from: 'name', unique: true }
	});

/**
 * Model Fields
 * @main Icon
 */
Icon.add({
	name: { type: String, label: 'Icon Name', initial: true, required: true },
	icon: { type: Types.CloudinaryImage, label: "Icon", autocleanup: true }
	// createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});

/**
 * Model Registration
 */
Icon.defaultSort = '-createdAt';
Icon.defaultColumns = 'name, updatedAt';
Icon.register();
