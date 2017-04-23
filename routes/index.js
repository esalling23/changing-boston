/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initErrorHandlers);
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// TODO: Clickjacking protection
/*keystone.pre('routes', function(req, res, next) {

    // Allow certain domains to frame site
    res.setHeader('X-Frame-Options', 'ALLOW-FROM www.riskhorizon.org');

    next();
})*/

 
// Load Routes
var routes = {
    api: importRoutes('./api'),
    views: importRoutes('./views')
};

// Setup Route Bindings
exports = module.exports = function(app) {

    // Views
    app.get('/', routes.views.index);

    app.get('/archive', routes.views.archive);
    app.get('/create', routes.views.create);

    app.get('/api/login', keystone.middleware.api, routes.api.planner.get);
    app.post('/api/signup', keystone.middleware.api, routes.api.planner.create);

    app.get('/planner', routes.views.group);
    app.get('/planner/profile/:id', routes.views.planner);
    app.get('/plan/:promptId', routes.views.present);
    
    app.post('/api/start', keystone.middleware.api, routes.api.plan.generate);
    app.get('/api/continue', keystone.middleware.api, routes.api.plan.get);
    app.post('/api/update', keystone.middleware.api, routes.api.plan.update);
    app.get('/api/launch', keystone.middleware.api, routes.api.plan.launch);

    app.post('/api/response', keystone.middleware.api, routes.api.response.create);
    app.get('/api/find', keystone.middleware.api, routes.api.response.get);
    // NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
    // app.get('/protected', middleware.requireUser, routes.views.protected);

};
