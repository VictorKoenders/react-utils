module.exports = {
	context: {},
	init: function(options){
		if(options.database.type === 'mongodb')
			initMongoose(options);
	}
};

var context = module.exports.context,
	chokidar = require('chokidar');


function initMongoose(options){
	var mongoose = require('mongoose');
	mongoose.connect(options.database.url);
	context.db = mongoose.connection;
	context.db.on('error', console.error.bind(console, 'connection error:'));
	context.db.once('open', function(){
		console.log('database connected');
	});

	var timeouts = {};

	chokidar.watch(options.database.directory).on('all', (event, path) => {
		if(path.indexOf('.js') === -1 || path.indexOf('___jb_tmp___') !== -1) return;
		clearTimeout(timeouts[path]);
		timeouts[path] = setTimeout(loadSchema.bind(null, path), 1000);
	});

	function loadSchema(path){
		var fileName = path.substring(path.lastIndexOf('\\') + 1, path.lastIndexOf('.'));
		var resolved = require.resolve(path);
		for(var x in mongoose.connection.models){
			if(x.toLowerCase() == fileName){
				console.log('reloading', x);
				delete mongoose.connection.models[x];
			}
		}
		delete require.cache[resolved];
		try {
			var inc = require(resolved);
			context[fileName] = inc(mongoose);
		} catch(ex){
			console.error('Could not load', fileName, ex);
		}
	}
}
/*
var mongoose = require('mongoose');
mongoose.connect('mongodb://qugame_user:SpC0kmZLYrlOkHBGeiu0FMsuUiLVeo83@ds011800.mlab.com:11800/qugame');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('database connected')
});

var models = {};

var files = require('fs').readdirSync('./database/models');
for(var file of files){
	var req = require('./models/' + file);
	models[file.substring(0, file.lastIndexOf('.'))] = req(mongoose);
}

module.exports = models;

*/