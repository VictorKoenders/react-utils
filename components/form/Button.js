
var react = require('react');

class Button extends react.Component {
    render() {
        return React.createElement(
            "div",
            { className: "form-group" },
            React.createElement(
                "div",
                { className: "col-md-8 col-md-offset-4" },
                React.createElement("input", { type: "button", value: "Submit", className: "btn btn-primary" })
            )
        );
    }
}

module.exports = Button;