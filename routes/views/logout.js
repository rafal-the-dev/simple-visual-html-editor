var keystone = require('keystone');

exports = module.exports = function(req, res) {

    	keystone.session.signout(req, res, function() {

    	req.flash('success', 'Zostałeś poprawnie wylogowany.');

        if ('string' === typeof keystone.get('signout redirect')) {
            return res.redirect(keystone.get('signout redirect'));
        } else if ('function' === typeof keystone.get('signout redirect')) {
            return keystone.get('signout redirect')(req, res);
        } else {
        	return res.redirect('/');
        }

    });

};
