"use strict";

var react = require('react');

export default class Button extends react.Component {
    render(){
        return <div className="form-group">
            <div className="col-md-8 col-md-offset-4">
                <input type={this.props.type || "button"} value={this.props.value || "Submit"} className="btn btn-primary" />
            </div>
        </div>;
    }
}

Button.propTypes = {
	type: react.PropTypes.string,
	value: react.PropTypes.string,
}
