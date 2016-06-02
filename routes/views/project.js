var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// Set locals
	locals.section = 'project';
	/*locals.filters = {
		project: req.params.project
	};*/
	locals.data = {
		projects: []
	};
	locals.data.perPage = 5;
	
	// Load the current projects
	view.on('init', function(next) {

		if( locals.user ){
			//console.log( locals.user.id );

			sort = req.query.sort || '-created';

			var q = keystone.list('Project').paginate({
		            page: req.query.page || 1,
		            perPage: locals.data.perPage,
		            maxPages: 5
		        })
		        .where('author', locals.user.id)
		        .sort( sort )
		        .populate('author');


			//var q = keystone.list('Project').model.find({author: locals.user.id}).populate('author').limit('5');

			q.exec(function(err, result) {
				page = 1;
				if( result.total > 5 ){
					page = req.query.page || 1;
					if( page > 1 ){
						locals.data.previous = page - 1;
					}
					if( (result.total/locals.data.perPage) > page ){
						locals.data.next = Number(page) + 1;
					}
				}
				locals.data.totalPages = Math.ceil(result.total/locals.data.perPage);
				locals.data.page = page;

				locals.data.projects = result.results;
				console.log( locals.data );
				next(err);
			});
		} else {

			next();
		}
		
	});
	
	// Render the view
	view.render('project');
	
};