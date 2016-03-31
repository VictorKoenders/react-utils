var fs = require('fs'),
	path = require('path'),
	chokidar = require('chokidar'),
	database = require('./databaseWatcher');

var actionsLoaded = {};

module.exports = function(settings, express){
	database.init(settings);
	chokidar.watch(settings.actions.directory).on('all', (event, path) => {
		var area = path.substring(settings.actions.directory.length);
		var index = area.indexOf('\\');
		if(index > -1) area = area.substring(0, index);
		if(!area || area === 'index.js') return;
		loadAction(area);
	});

	function loadAction(file){
		var x;
		var url = require.resolve(settings.actions.directory + file);
		delete require.cache[url];
		try {
			var include = require(url);
		} catch(ex){
			console.error('could not load', url);
			console.error(ex);
			return;
		}
		console.log('Reloading', file);
		var oldAction = actionsLoaded[file];
		if(!oldAction){
			actionsLoaded[file] = oldAction = {};
		}
		for(var method in include) {
			if(!include.hasOwnProperty(method)) continue;
			for (action of include[method]) {
				str = action.toString();
				name = str.substring(str.indexOf(' '), str.indexOf('(')).trim();
				var arguments = str.substring(str.indexOf('(') + 1, str.indexOf('{') - 1).split(',').map(i => i.trim()).filter(i => !!i);

				if(oldAction[name]) unloadAction(file, name);

				url = '/api/' + file + '/' + name;
				if(arguments.indexOf('id') != -1) url += '/:id';
				express[method](url, resolveAction.bind(express, file, name));

				oldAction[name] = {
					arguments: arguments,
					method: method,
					f: action
				};
			}
		}

		for(x in oldAction){
			if(!oldAction.hasOwnProperty(x)) continue;
			var found = false;
			for(method in include){
				for (var action of include[method]) {
					var str = action.toString();
					var name = str.substring(str.indexOf(' '), str.indexOf('(')).trim();
					if(name == x) {
						found = true;
						break;
					}
				}
				if(found) break;
			}
			if(!found){
				unloadAction(file, x);
			}
		}

		updateActionFile();
	}


	function R(m,u,a){
		return new Promise(function(s,f){
			var r=new XMLHttpRequest();
			r.open(m,u);
			r.addEventListener('load',function(){
				try{
					var result=JSON.parse(r.responseText);
					if(result&&result.success!==false){
						s(result);
					}else{
						f(result.error);
					}
				}catch(ex){
					f(ex);
				}
			});
			r.setRequestHeader('Content-Type','application/json');
			if(m==='post'){
				r.send(JSON.stringify(a));
			}else{
				r.send();
			}
		});
	}

	var updateActionFileTimer = null;
	function updateActionFile(){
		clearTimeout(updateActionFileTimer);
		updateActionFileTimer = setTimeout(function(){
			var content = R.toString().replace(/[\n\r\t]/g, '') + 'window.server={' +
				Object.keys(actionsLoaded).map(key =>
					key
					+ ':{'
					+ Object.keys(actionsLoaded[key]).map(method =>
						actionMethodDefinition(key, method)
					) + '}'
				).join(',')
				+ '};';
			fs.writeFile(settings.actions.outputFile, content);
		}, 1000);
	}

	function actionMethodDefinition(area, name) {
		var definition = actionsLoaded[area][name];
		var result = name + ':function(' + definition.arguments.join(',') + '){return R(\''
			+ definition.method + '\',\'/api/' + area + '/' + name + '';
		if (definition.method == 'get'){
			var args = definition.arguments.filter(a => a != 'id');
			if (definition.arguments.indexOf('id') != -1) {
				result += '/\'+id';
				if(args.length)
					result += '+\'';
			} else if(!args.length){
				result += '\'';
			}
			if(args.length) {
				result += '?' + args.map(a => a + '=\'' + a + '\'').join('&') + '\'';
			}
			result += ');';
		} else {
			result += '\',{' + definition.arguments.map(a => a + ':' + a).join(',') + '});';
		}
		return result + '}';
	}

	function unloadAction(dir, action){
		var routes = express._router.stack;
		routes.forEach((route, i, routes) => {
			if(!route.route) return;
			if(route.route.path == '/api/' + dir + '/' + action){
				routes.splice(i, 1);
			}
		});
	}

	function resolveAction(dir, x, req, res){
		var args = [];
		for(var arg of actionsLoaded[dir][x].arguments) {
			var value = null;
			for (var source of [req.body, req.params, req.query]) {
				if(source[arg]) {
					value = source[arg];
					break;
				}
			}
			args.push(value);
		}
		try {
			var result = actionsLoaded[dir][x].f.apply(database.context, args);
			if(result === undefined){
				return res.json({ success: false, error: 'method ' + x + ' did not return'});
			}
			Promise.resolve(result).then(r => res.json(r)).catch(e => res.json({success: false, error: e.message || e}));
		} catch(ex){
			res.json({ success: false, error: ex.message });
		}
	}
};

module.exports.getActions = function(){
	return actionsLoaded;
};