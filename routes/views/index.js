var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'home';

	locals.data = {
		projects: []
	};
	locals.data.perPage = 5;

	view.on('init', function(next) {

		sort = req.query.sort || '-created';

		var q = keystone.list('Project').paginate({
	            page: req.query.page || 1,
	            perPage: locals.data.perPage,
	            maxPages: 5
	        })
	        .where('visible', 1)
	        .sort( sort )
	        .populate('author');

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

			next(err);
		});
	});
	
	view.render('index');
	
};
