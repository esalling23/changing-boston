/**
 * Emerging Citizens
 * 
 * PlanSession Model
 * @module models
 * @class PlanSession
 * @author Johnny Richardson
 * 
 * ==========
 */
"use strict";

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * PlanSession Model
 * ==========
 */
var PlanSession = new keystone.List('PlanSession', {
	editable: false,
	cancreate: false
    // track: true
});
/**
 * Model Fields
 * @main PlanSession
 */
PlanSession.add({

  accessCode: { type: String, required: true, initial: true, hidden: true }
  // dateCreated: { type: Date, noedit: true }

});

// Store all hashtag submissions/votes (not visible in admin UI)
// PlanSession.schema.add({ Plan: Object });


// PlanSession.schema.pre('save', function(next) {
  
//   this.dateCreated = new Date();

//   next();

// });

/**
 * Registration
 */
PlanSession.register();
exports = module.exports = PlanSession;
