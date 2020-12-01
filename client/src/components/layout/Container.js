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
			isMobile,
			view,
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
							{!isMobile && (
								<React.Fragment>
									<Sidebar pageProps={pageProps} pageActions={pageActions} />
									<MainContent pageProps={pageProps} pageActions={pageActions} />
								</React.Fragment>
							)}
							{isMobile && view === 'sidebar' && (
								<Sidebar pageProps={pageProps} pageActions={pageActions} />
							)}
							{isMobile && view === 'chatarea' && (
								<MainContent pageProps={pageProps} pageActions={pageActions} />
							)}
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
