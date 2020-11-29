import React from 'react';

import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import AppLoading from '../appLoading';
import AlertBar from '../alertBar';
import Modal from '../modal';

class Container extends React.Component {
	render() {
		const { pageProps, pageActions } = this.props;
		const {
			loadingApp,
			showAlert,
			alertType,
			alertMsg,
			showModal,
			searchingNumber,
			searchingNumberInput,
			suggestionNumbers,
		} = pageProps;

		const {
			toggleModal,
			changeSearchingNumberInput,
			selectSuggestion,
		} = pageActions

		return (
			<div className="layout-container">
				{loadingApp ?
					<AppLoading /> :
					<React.Fragment>
						<Header pageProps={pageProps} pageActions={pageActions} />
						<div className="layout-mainarea">
							<Sidebar pageProps={pageProps} pageActions={pageActions} />
							<MainContent pageProps={pageProps} pageActions={pageActions} />
						</div>
					</React.Fragment>
				}
				<AlertBar
					showAlert={showAlert}
					alertType={alertType}
					alertMsg={alertMsg}
				/>
				{showModal &&
					<Modal
						hideModal={() => toggleModal(false)}
						suggestionNumbers={suggestionNumbers}
						searchingNumberInput={searchingNumberInput}
						searchingNumber={searchingNumber}
						selectSuggestion={selectSuggestion}
						changeSearchingNumberInput={changeSearchingNumberInput}
					/>
				}
			</div>
		)
	}
}

export default Container;
