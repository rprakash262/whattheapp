import React from 'react';

import './index.css'

const selectColor = alertType => {
	switch(alertType) {
		case 'success':
			return '#28a745';
		case 'danger':
			return '#dc3545';
		case 'primary':
			return '#007bff';
		case 'warning':
			return '#ffc107';
		case 'info':
			return '#17a2b8';
		default:
			return '#28a745';
	}
}

class AlertBar extends React.Component {
	render() {
		const { showAlert, alertType, alertMsg, hideAlert } = this.props;

		return (
			<div className="alert-bar" style={{ top: showAlert ? 0 : '-70px' }}>
				<div style={{ backgroundColor: selectColor(alertType) }}>
					<button onClick={hideAlert}>x</button>
					<p>{alertMsg}</p>
				</div>
			</div>
		)
	}
}

export default AlertBar;