var fs = require('fs');
var hapi = require('hapi');
var ROT13Stream = require('./simple-rot13-stream');
var options = {
	views: {
		path: 'templates',
		helpersPath: 'helpers',
		engines: {
			html: require('handlebars')
		}
	}
};
var server = new hapi.Server('localhost', Number(process.argv[2] || 8000), options);

//plugins
server.pack.register({
	name: 'furball',
	version: '1.0.1',
	register: require('furball').register,
	options: {
		version: '/version',
		plugins: '/plugins'
	}
}, function(err) {
	if (err) {
		console.log('Failed to load plugin. // ' + err);
	}
});

// routes
var routes = [{
	path: '/',
	method: 'GET',
	handler: function(request, reply) {
		var rot13 = new ROT13Stream();
		//reply('Hello Hapi');
		reply(fs.createReadStream('./clear.txt').pipe(rot13));
	}
	/*
	handler: {view: 'index.html'}
	*/
},{
	path: '/foo/bar/baz/{param}',
	method: 'GET',
	handler: {
		directory: {path: './public'}
	}
},{
	path: '/{name}',
	method: 'GET',
	handler: function(request, reply) {
		reply('Hello ' + request.params.name);
	}
}];

// start
server.route(routes);
server.start(function() {
	console.log("Hapi server started @", server.info.uri);
});
