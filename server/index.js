module.exports = {
	start: function(options){
		var express = startServer(options);
		require('./actions')(options, express)
		require('./reactTranspiler')(options);
		// TODO: Database
	}
}

function startServer(options){
	var express = require('express');
	var bodyParser = require('body-parser');

	var app = express();

	app.use(express.static(options.server.publicDirectory));
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	app.get(/^(\/(?!api).*)$/, function (req, res) {
		res.sendFile(options.server.defaultFile)
	});

	app.listen(options.server.port || 3000, function () {
		console.log('Example app listening on port ' + (options.server.port || 3000) + '!');
	});

	return app;
}