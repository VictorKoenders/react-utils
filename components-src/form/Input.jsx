"use strict";

import React from "react";

export default class Input extends React.Component {
	render() {
		return <div className="form-group">
			<label htmlFor={this.props.label} className="control-label col-md-4">{this.props.label}</label>
			<div className="col-md-8">
				<input type={this.props.type || 'text'} className="form-control" valueLink={this.props.valueLink} />
			</div>
		</div>;
	}
}

Input.propTypes = {
	type: React.PropTypes.string,
	label: React.PropTypes.string.isRequired,
	valueLink: React.PropTypes.shape({
		value: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.number
		]).isRequired,
		requestChange: React.PropTypes.func.isRequired
	}).isRequired
};

