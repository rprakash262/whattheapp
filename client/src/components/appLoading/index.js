import React from 'react';

import './index.css';

class AppLoading extends React.Component {
	constructor() {
		super();
		this.state = {
			showingDot: 1,
		}
	}

	componentDidMount() {
		this.interval = setInterval(() => {
			this.setState(state => ({
				showingDot: state.showingDot === 3 ? 1 : state.showingDot + 1,
			}));
		}, 700);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	clickHandler = () => {
		this.setState({
			showingDot: 2,
		})
	}

	render() {
		const { showingDot } = this.state;

		return (
			<div className="appLoading">
				<div className="appLoading-dot" style={{ opacity: showingDot === 1 ? 1 : 0 }} />
				<div className="appLoading-dot" style={{ opacity: showingDot === 2 ? 1 : 0 }} />
				<div className="appLoading-dot" style={{ opacity: showingDot === 3 ? 1 : 0 }} />
			</div>
		)
	}
}

export default AppLoading; 