import React from 'react';

import './index.css';

class Modal extends React.Component {
	render() {
		const {
			hideProfileModal,
		} = this.props;

		return (
			<div className="modal-container">
				<div className="modal-overlay" onClick={hideProfileModal} />
				<div className="modal-content">
					<button onClick={hideProfileModal}>X</button>
					<div className="modal-header">
						<p>Enter a number to search</p>
					</div>
					<div className="modal-body">
						
					</div>
					<div className="modal-footer"></div>
				</div>
			</div>
		)
	}
}

export default Modal;
