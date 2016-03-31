'use strict';

module.exports = function () {
	var React = require('react');

	React.Component.prototype.valueLink = function (path) {
		var _this = this;

		var parts = path.split(/[\[\]\.]/gmi).filter(function (e) {
			return !!e;
		});
		var value = this.state;
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = parts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var x = _step.value;

				value = value ? value[x] : null;
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		return {
			value: value,
			requestChange: function requestChange(newValue) {
				var newState = {};
				var newContext = newState;
				var currentContext = _this.state;

				for (var i = 0; i < parts.length - 1; i++) {
					currentContext = currentContext[parts[i]] || {};
					newContext[parts[i]] = currentContext;
					newContext = newContext[parts[i]];
				}
				newContext[parts[parts.length - 1]] = newValue;

				_this.setState(newState);
			}
		};
	};
};