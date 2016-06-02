var keystone = require('keystone');
//var session = require('session');

exports = module.exports = function(req, res) {

        var view = new keystone.View(req, res);
        var csrfTokenKey = keystone.security.csrf.TOKEN_KEY;
        var csrfTokenValue = keystone.security.csrf.getToken(req, res);

        function renderView() {
                view.render('login', {
                        submitted: req.body,
                        from: req.query.from,
                        logo: keystone.get('signin logo'),
                        tokenKey: csrfTokenKey,
                        tokenValue: csrfTokenValue
                });
        }

        // If a form was submitted, process the login attempt
        if (req.method === 'POST') {

                if (!keystone.security.csrf.validate(req)) {
                        req.flash('error', 'Wystąpił błąd w zapytaniu, spróbuj ponownie.');
                        return renderView();
                }

                if (!req.body.email || !req.body.password) {
                        req.flash('error', 'Wprowadź e-mail oraz hasło.');
                        return renderView();
                }

                var onSuccess = function (user) {

                        if (req.query.from && req.query.from.match(/^(?!http|\/\/|javascript).+/)) {
                                res.redirect(req.query.from);
                        } else if ('string' === typeof keystone.get('signin redirect')) {
                                res.redirect(keystone.get('signin redirect'));
                        } else if ('function' === typeof keystone.get('signin redirect')) {
                                keystone.get('signin redirect')(user, req, res);
                        } else {
                                req.flash('success', 'Zostałeś poprawnie zalogowany.');
                                res.redirect('/');
                        }

                };

                var onFail = function (err) {
                        var message = (err && err.message) ? err.message : 'Niestety e-mail lub hasło są nieprawidłowe.';
                        req.flash('error', message );
                        renderView();
                };

                keystone.session.signin(req.body, req, res, onSuccess, onFail);

        } else {
                renderView();
        }

};
