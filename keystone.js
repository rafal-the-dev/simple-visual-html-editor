// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone');
var swig = require('swig');

// Disable swig's bulit-in template caching, express handles it
swig.setDefaults({ cache: false });

keystone.init({

	'port': '3010',
	
	'name': 'Engineer',
	'brand': 'Engineer',
	
	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'swig',
	
	'custom engine': swig.renderFile,
	
	'emails': 'templates/emails',
	
	'auto update': true,
	'session': true,
	'auth': true,

	'mongo': 'mongodb://localhost:27017/engineer',

	'user model': 'User',
	'signin url': 'logowanie',
	'signout url': '/wyloguj',
	'signout redirect': '/'

});

keystone.import('models');

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

keystone.set('routes', require('./routes'));


keystone.set('email locals', {
	logo_src: '/images/logo-email.gif',
	logo_width: 194,
	logo_height: 76,
	theme: {
		email_bg: '#f9f9f9',
		link_color: '#2697de',
		buttons: {
			color: '#fff',
			background_color: '#2697de',
			border_color: '#1a7cb7'
		}
	}
});

keystone.set('email rules', [{
	find: '/images/',
	replace: (keystone.get('env') == 'production') ? 'http://www.your-server.com/images/' : 'http://localhost:3000/images/'
}, {
	find: '/keystone/',
	replace: (keystone.get('env') == 'production') ? 'http://www.your-server.com/keystone/' : 'http://localhost:3000/keystone/'
}]);

keystone.set('email tests', require('./routes/emails'));

keystone.set('nav', {
	'posts': ['posts', 'post-categories'],
	'enquiries': 'enquiries',
	'users': 'users'
});

var socketio = require('socket.io');

keystone.start({
    onHttpServerCreated: function(){
        keystone.set('io', socketio.listen(keystone.httpServer));
    },
    onStart: function(){
        var io = keystone.get('io');
        var session = keystone.get('express session');

        // Share session between express and socketio
        io.use(function(socket, next){
            session(socket.handshake, {}, next);
        });

        // Socketio connection
        io.on('connect', function(socket){

            socket.emit('msg', socket.handshake.session.message);

            /*socket.on('save', function(data) {
            	console.fs(data);
            });*/

            socket.on('disconnect', function(){
                console.log('--- User disconnected');
            });
        });
    }
});
