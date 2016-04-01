"use strict";

var react = require('react');

export default class Button extends react.Component {
    render() {
        return React.createElement(
            "div",
            { className: "form-group" },
            React.createElement(
                "div",
                { className: "col-md-8 col-md-offset-4" },
                React.createElement("input", { type: this.props.type || "button", value: this.props.value || "Submit", className: "btn btn-primary" })
            )
        );
    }
}

Button.propTypes = {
    type: react.PropTypes.string,
    value: react.PropTypes.string
};