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
	
	view.on('init', function(next) {
		
		var q = keystone.list('Project').model.findById(locals.filters.project);

		q.exec(function(err, result) {
			locals.data.project = result;
			locals.data.statuses = 'nowy,projektowanie,koniec'.split(",");
			next(err);
		});
		
	});

	 // Create a project
    view.on('post', { action: 'create' }, function(next) {

    	if( !locals.user ){
    		req.flash('info', 'Musisz być zalogowany, aby dodać projekt');
    		return res.redirect('/projekty');
    	}

        var newProject = new Project.model({
            html: '',
            author: locals.user.id
        });

        var updater = newProject.getUpdateHandler(req);

        updater.process(req.body, {
            fields: 'name',
            flashErrors: true,
            logErrors: true
        }, function(err) {
            if (err) {
                locals.validationErrors = err.errors;
                //req.flash('error', 'Wystąpił problem: ' + err.errors);
            } else {
                req.flash('success', 'Twój projekt został dodany.');
                return res.redirect('/edytor/' + newProject.id);
            }
            next();
        });

    });

    view.on('post', { action: 'updateItem' }, function(next){

    	var project = locals.data.project,
			updater = project.getUpdateHandler(req);
		
		updater.process(req.body, {
			flashErrors: false,
			fields: 'html',
		}, function(err) {
			if (err) {
				locals.validationErrors = err.errors;
				locals.enquirySubmitted = false;
			} else {
				locals.enquirySubmitted = true;
			}
			next();
		});
    });

    view.on('post', { action: 'deleteItem' }, function(next){

    	var project = locals.data.project,
			updater = project.getUpdateHandler(req);
			
			project.remove(function (err) {
				if (err) {
					locals.validationErrors = err.errors;
					locals.enquiryDeleted = false;
				} else {
					locals.enquiryDeleted = true;
				}
				next();
			});
    });

    view.on('post', { action: 'saveDesc' }, function(next){

    	console.log(req.body);

    	var project = locals.data.project,
			updater = project.getUpdateHandler(req);
			
		updater.process(req.body, {
			flashErrors: false,
			fields: 'description,status',
		}, function(err) {
			if (err) {
				locals.validationErrors = err.errors;
				locals.enquirySaved = false;
			} else {
				locals.enquirySaved = true;
			}
			next();
		});
    });

    if( req.body.action == 'updateItem' ){
    	view.render(function(err) {
			 if (err) return false;
			 res.json({
			 	result: locals.enquirySubmitted
			 });
		});

    } else if( req.body.action == 'deleteItem' ) {
		view.render(function(err) {
			 if (err) return false;
			 res.json({
			 	result: locals.enquiryDeleted
			 });
		});
    } else if( req.body.action == 'saveDesc' ) {
		view.render(function(err) {
			 if (err) return false;
			 res.json({
			 	result: locals.enquirySaved
			 });
		});
    } else {
    	view.render('editor');
    }
	
	
};