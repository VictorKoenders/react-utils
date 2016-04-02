"use strict";

import React from "react";

export default class Tabs extends React.Component {
	constructor() {
		super();
		this.state = {
			selectedIndex: 0
		};
	}

	select(index, e){
		if(e && e.preventDefault) e.preventDefault();
		this.setState({
			selectedIndex: index
		});
	}

	renderLabel(label, index) {
		return <li key={index} className={index == this.state.selectedIndex?"active":""}>
			<a href='#' onClick={this.select.bind(this, index)}>{label}</a>
		</li>
	}


	render() {
		var Item = this.props.children[this.state.selectedIndex] || null;
		return <div>
			<div className="nav nav-tabs">
				{this.props.labels.map(this.renderLabel.bind(this))}
			</div>
			{Item}
		</div>;
	}
}

Tabs.propTypes = {
	labels: React.PropTypes.array.isRequired,
	children: React.PropTypes.node.isRequired
};

