React Utils
===========

Utility class made of regularly used components in Trangar's projects

Install via NPM
---------------
```
npm install trangar-react-utils --save
```

File structure
-------------

![File structure](http://puu.sh/o0Zgt/8cd9bebc70.png)

server.js
---------
```javascript
var server = require('trangar-react-utils/server');
server.start({
    react: {
        file: __dirname + '/src/client.jsx',
        outputFile: __dirname + '/public/build.js'
    },
    server: {
        port: 8181,
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

actions/user/index.js
---
```javascript
// in your browser, call "server.user.loadByID(id)"
function loadByID(id){
    return this.user.findOne({ _id: id })
}
// in your browser, call "server.user.login(username, password)"
function login(username, password){
	return this.user.findOne({ name: username })
	      .then(validatePassword);
}

module.exports = {
    get: [loadByID],
    post: [login]
};
```

schema/user.js
---
```javascript
module.exports = function(mongoose){
    // schema definition
    var user = mongoose.Schema({
        name: String,
        password: {
            hash: String,
            salt: String,
            iterations: Number
        }
    });

    // TODO: Add methods here
    // see http://mongoosejs.com/docs/index.html for more info

    // return the model
    return mongoose.model("User", user);
};
```

src/clients.jsx
---
```javascript
var React = require('react'),
    ReactDom = require('react-dom');

class Main extends React.Component {
    render(){
        return <h1>Hello from main</h1>
    }
}

var div = document.createElement('div');
ReactDom.render(<Main />, div);
document.body.appendChild(div);

```

Run
---
```
node server
```
