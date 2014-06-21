var hapi = require('hapi');
var server = new hapi.Server(8080);
var routes = [{
	path: '/',
	method: 'GET',
	handler: function(request, reply) {
		reply('Hello Hapi');
	}
},{
	path: '/{name}',
	method: 'GET',
	handler: function(request, reply) {
		reply('Hello ' + request.params.name);
	}
}];
server.route(routes);
server.start();
