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
	name: { type: Types.Name, required: true, initial: true, },
	email: { type: Types.Email, initial: true, required: true },
	password: { type: Types.Password, initial: true, required: true }, 
	bio: {
		type: Types.Markdown, 
		label: 'Planner Bio'
	}
});

/**
 * Registration
 */

Planner.defaultColumns = 'name, email, isAdmin';
Planner.register();
