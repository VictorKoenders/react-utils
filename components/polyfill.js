module.exports = function () {
	var React = require('react');

	React.Component.prototype.valueLink = function (path) {
		var parts = path.split(/[\[\]\.]/gmi).filter(e => !!e);
		var value = this.state;
		for (var x of parts) {
			value = value ? value[x] : null;
		}

		return {
			value: value,
			requestChange: newValue => {
				var newState = {};
				var newContext = newState;
				var currentContext = this.state;

				for (var i = 0; i < parts.length - 1; i++) {
					currentContext = currentContext[parts[i]] || {};
					newContext[parts[i]] = currentContext;
					newContext = newContext[parts[i]];
				}
				newContext[parts[parts.length - 1]] = newValue;

				this.setState(newState);
			}
		};
	};
};