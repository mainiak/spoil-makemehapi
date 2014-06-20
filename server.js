var hapi = require('hapi');
var server = new hapi.Server(8080);
var routeObject = {
	path: '/',
	method: 'GET',
	handler: function(request, reply) {
		reply('Hello Hapi');
	}
};
server.route(routeObject);
server.start();
