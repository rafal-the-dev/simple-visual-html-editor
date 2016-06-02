var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// Set locals
	locals.section = 'template';
	/*locals.filters = {
		project: req.params.project
	};*/
	locals.data = {
		templates: []
	};
	
	// Load the current projects
	view.on('init', function(next) {
		
		if( locals.user ){
			console.log( locals.user.id );
			var q = keystone.list('Project').model.find({}).limit('5');

			q.exec(function(err, result) {
				console.log(result);
				locals.data.projects = result;
				next(err);
			});
		} else {

			next();
		}
		
	});
	
	// Render the view
	view.render('template');
	
};