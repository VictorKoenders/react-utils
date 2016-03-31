
var react = require('react');

class Input extends react.Component {
    render() {
        return React.createElement(
            "div",
            { className: "form-group" },
            React.createElement(
                "label",
                { htmlFor: this.props.label, className: "control-label col-md-4" },
                this.props.label
            ),
            React.createElement(
                "div",
                { className: "col-md-8" },
                React.createElement("input", { type: "text", valueLink: this.props.valueLink, className: "form-control" })
            )
        );
    }
}

Input.propTypes = {
    valueLink: react.PropTypes.object.isRequired,
    label: react.PropTypes.string.isRequired
};

module.exports = Input;