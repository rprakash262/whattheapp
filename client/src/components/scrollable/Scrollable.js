import React from 'react';

import './scrollable.css';

class Scrollable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		return (
			<div className="scrollable">
				{this.props.children}
			</div>
		)
	}
}

export default Scrollable;
