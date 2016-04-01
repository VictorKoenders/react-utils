module.exports = function(options){
	var fs = require('fs'),
		path = require('path'),
		chokidar = require('chokidar'),
		browserify = require('browserify'),
		stream = require('stream'),
		util = require('util');

	var timeout;

	chokidar.watch(path.dirname(options.react.file)).on('all', (event, path) => {
		clearTimeout(timeout);
		timeout = setTimeout(transpile, 1000);
	});
	
	function transpile(){
		try {
			console.log('detected change, transpiling!', options.react.file);
			var b = browserify(options.react.file, {
				extensions: ['.jsx'],
			});
			b.transform('babelify', { presets: 'react,es2015' });

			b.bundle().pipe(fs.createWriteStream(options.react.outputFile));
		} catch(ex){
			console.error(ex);
		}
	}
}