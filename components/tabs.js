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

var Tabs = (function (_React$Component) {
	_inherits(Tabs, _React$Component);

	function Tabs() {
		_classCallCheck(this, Tabs);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tabs).call(this));

		_this.state = {
			selectedIndex: 0
		};
		return _this;
	}

	_createClass(Tabs, [{
		key: "select",
		value: function select(index, e) {
			if (e && e.preventDefault) e.preventDefault();
			this.setState({
				selectedIndex: index
			});
		}
	}, {
		key: "renderLabel",
		value: function renderLabel(label, index) {
			return _react2.default.createElement(
				"li",
				{ key: index, className: index == this.state.selectedIndex ? "active" : "" },
				_react2.default.createElement(
					"a",
					{ href: "#", onClick: this.select.bind(this, index) },
					label
				)
			);
		}
	}, {
		key: "render",
		value: function render() {
			var Item = this.props.children[this.state.selectedIndex] || null;
			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					"div",
					{ className: "nav nav-tabs" },
					this.props.labels.map(this.renderLabel.bind(this))
				),
				Item
			);
		}
	}]);

	return Tabs;
})(_react2.default.Component);

exports.default = Tabs;

Tabs.propTypes = {
	labels: _react2.default.PropTypes.array.isRequired,
	children: _react2.default.PropTypes.node.isRequired
};