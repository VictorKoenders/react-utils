React Utils
===========

Utility class made of regularly used components in Trangar's projects

File structure
-------------

![alt file structure](http://puu.sh/o0Zgt/8cd9bebc70.png)

Install via NPM
---------------
```
npm install trangar-react-utils --save
```

server.js
---------
```javascript
var server = require('trangar-react-utils').server;
 server.start({
 	react: {
 		file: __dirname + '/src/client.jsx',
 		outputFile: __dirname + '/public/build.js'
 	},
 	server: {
 		host: 8181,
 		publicDirectory: __dirname + '/public/',
 		defaultFile: __dirname + '/public/index.html'
 	},
 	actions: {
 		directory: __dirname + '/actions/',
 		outputFile: __dirname + '/public/server.js'
 	},
 	database: {
 		type: 'mongodb',
 		url: '<mongo url goes here>',
 		directory: __dirname + '/database/models/'
 	}
 });
```

Run
---
```
node server
```

actions/user/index.js
---
```
function loadByID(id){
    return {
        id: id,
        name: 'user ' + id
    }
}
function login(username, password){
    return new Promise(function(resolve, reject){
        // database code here
        resolve({
            id: 0,
            username: username
        });
    });
}

module.exports = {
    get: [loadByID],
    post: [login]
};
```
