var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

var restful = require('restful-keystone')(keystone);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views')
};

// Setup Route Bindings
exports = module.exports = function(app) {
	
	// Views
	app.get('/', routes.views.index);
	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);
	app.all('/contact', routes.views.contact);
	app.all('/projekty', routes.views.project);
	app.all('/edytor/:id', routes.views.editor);
	app.all('/edytor', routes.views.editor);
	app.all('/szablony', routes.views.template);
	app.get('/zobacz/:id', routes.views.preview);
	app.all('/logowanie', routes.views.login);
	app.all('/wyloguj', routes.views.logout);

	restful.expose({
		Project: true,
		Template: true
	}).start();


};
