/**
 * This file is where you define your routerlication routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to hrouteren for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your routerlication should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express routerlication routing documentation for more information:
 * http://expressjs.com/api.html#router.VERB
 */
var express = require('express');
var router = express.Router();
var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Load Routes
var routes = {
    api: importRoutes('./api'),
    views: importRoutes('./views')
};

// Common Middleware
keystone.pre('routes', middleware.initErrorHandlers);
keystone.pre('render', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// keystone redirect
router.all('/admin', function(req, res, next) {
    res.redirect('/keystone');
});

// Views
router.get('/', routes.views.index);

router.get('/archive', routes.views.archives);
router.get('/archive/:id', routes.views.planArchive);

// Planner signin
router.get('/api/login', keystone.middleware.api, routes.api.planner.get);
router.get('/api/signup', keystone.middleware.api, routes.api.planner.create);

// Planner 
router.get('/planner', routes.views.group);
router.get('/planner/profile/:id', routes.views.planner);
router.get('/plan/:promptId', routes.views.present);

router.get('/api/start', keystone.middleware.api, routes.api.plan.generate);
router.get('/api/continue', keystone.middleware.api, routes.api.plan.get);
router.get('/api/update', keystone.middleware.api, routes.api.plan.update);
router.get('/api/launch', keystone.middleware.api, routes.api.plan.launch);

router.get('/api/response', keystone.middleware.api, routes.api.response.create);

// Looping reload for presentation screen
router.get('/api/reload', keystone.middleware.api, routes.api.plan.reload);

// Create and save response to prompt
router.get('/api/responding', keystone.middleware.api, routes.api.response.respond);

// Find prompt
router.get('/api/find', keystone.middleware.api, routes.api.response.get);

// Load comments for responses
router.get('/api/comments', keystone.middleware.api, routes.api.response.comments);

// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
// router.get('/protected', middleware.requireUser, routes.views.protected);

module.exports = router;