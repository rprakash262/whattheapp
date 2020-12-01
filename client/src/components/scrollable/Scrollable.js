import React from 'react';

import './scrollable.css';
import { scrollToBottom } from '../../reducers/LayoutReducer';

class Scrollable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	componentDidMount() {
		scrollToBottom();
	}

	render() {
		const { id } = this.props;

		return (
			<div className="scrollable" id={id}>
				{this.props.children}
			</div>
		)
	}
}

export default Scrollable;
