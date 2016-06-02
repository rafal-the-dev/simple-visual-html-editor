var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	var Project = keystone.list('Project');
	
	// Set locals
	locals.section = 'project';
	locals.filters = {
		project: req.params.id
	};
	locals.data = {};
	locals.validationErrors = {};
	locals.enquirySubmitted = false;
	
	// Load the current post
	view.on('init', function(next) {
		
		var q = keystone.list('Project').model.findById(locals.filters.project).populate('author');
		//console.log(res);

		q.exec(function(err, result) {
			console.log( result );
			locals.data.project = result;
			next(err);
		});

		//req.session.message = 'Hello World';
		
	});

	// Render the view
	view.render('preview');
	
};