"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Input = (function (_React$Component) {
	_inherits(Input, _React$Component);

	function Input() {
		_classCallCheck(this, Input);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Input).apply(this, arguments));
	}

	_createClass(Input, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				{ className: "form-group" },
				_react2.default.createElement(
					"label",
					{ htmlFor: this.props.label, className: "control-label col-md-4" },
					this.props.label
				),
				_react2.default.createElement(
					"div",
					{ className: "col-md-8" },
					_react2.default.createElement("input", { type: this.props.type || 'text', className: "form-control", valueLink: this.props.valueLink })
				)
			);
		}
	}]);

	return Input;
})(_react2.default.Component);

exports.default = Input;

Input.propTypes = {
	type: _react2.default.PropTypes.string,
	label: _react2.default.PropTypes.string.isRequired,
	valueLink: _react2.default.PropTypes.shape({
		value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]).isRequired,
		requestChange: _react2.default.PropTypes.func.isRequired
	}).isRequired
};