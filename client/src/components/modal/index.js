import React from 'react';

import './index.css';

class Modal extends React.Component {
	render() {
		const {
			suggestionNumbers,
			selectSuggestion,
			hideModal,
			searchingNumberInput,
			changeSearchingNumberInput,
			searchingNumber
		} = this.props;

		return (
			<div className="modal-container">
				<div className="modal-overlay" onClick={hideModal} />
				<div className="modal-content">
					<button onClick={hideModal}>X</button>
					<div className="modal-header">
						<p>Enter a number to search</p>
					</div>
					<div className="modal-body">
						<input
							value={searchingNumberInput}
							onChange={e => changeSearchingNumberInput(e.target.value)}
							placeholder="Enter a number to search"
						/>
						<button>Search</button>
						{suggestionNumbers.length > 0 && !searchingNumber && (
							<div className="modal-dropdown-list">
								{suggestionNumbers.map(num => (
									<div key={num.userId} onClick={() => selectSuggestion(num)}>{num.phone} ({num.name})</div>
								))}
							</div>
						)}
						{suggestionNumbers.length === 0 && searchingNumberInput && !searchingNumber && (
							<div className="no-result-area">
								<div>No result found</div>
							</div>
						)}
						{searchingNumber && searchingNumberInput &&(
							<div className="no-result-area">
								<div>Searching...</div>
							</div>
						)}
					</div>
					<div className="modal-footer"></div>
				</div>
			</div>
		)
	}
}

export default Modal;
