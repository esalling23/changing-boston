var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Planner Model
 * ==========
 */

var Planner = new keystone.List('Planner', 
	{
		label: 'Planner Profile',
		singular: 'Planner Profiles',
		track: true, 
		map: { name: 'email' }
	});

Planner.add({
	name: { type: Types.Name, required: true, index: true, hidden: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: true }
});

/**
 * Registration
 */

Planner.defaultColumns = 'name, email, isAdmin';
Planner.register();
