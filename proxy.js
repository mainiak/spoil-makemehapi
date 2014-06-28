var hapi = require('hapi');
var server = new hapi.Server('localhost', Number(process.argv[2] || 8000));

server.route({
	path: '/proxy',
	method: 'GET',
	handler: {
		proxy: {
			host: '127.0.0.1',
			port: 65535
		}
	}
});

server.start(function() {
	console.log("Hapi server started @", server.info.uri);
});
