import React from 'react';

import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import AppLoading from '../appLoading';
import AlertBar from '../alertBar';
import SearchModal from '../searchModal';
import ProfileModal from '../profileModal';

class Container extends React.Component {
	render() {
		const { pageProps, pageActions } = this.props;
		const {
			loadingApp,
			showAlert,
			alertType,
			alertMsg,
			showModal,
			showProfileModal,
			searchingNumber,
			searchingNumberInput,
			suggestionNumbers,
			isMobile,
			view,
			uploadingProfileImgFile,
		} = pageProps;

		const {
			toggleModal,
			toggleProfileModal,
			changeSearchingNumberInput,
			selectSuggestion,
			hideAlert,
			submitProfileImgFile,
			changeProfileImgFile,
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
					hideAlert={hideAlert}
				/>
				{showModal &&
					<SearchModal
						hideModal={() => toggleModal(false)}
						suggestionNumbers={suggestionNumbers}
						searchingNumberInput={searchingNumberInput}
						searchingNumber={searchingNumber}
						selectSuggestion={selectSuggestion}
						changeSearchingNumberInput={changeSearchingNumberInput}
					/>
				}
				{showProfileModal &&
					<ProfileModal
						hideModal={() => toggleProfileModal(false)}
						uploadingProfileImgFile={uploadingProfileImgFile}
						changeProfileImgFile={changeProfileImgFile}
						submitProfileImgFile={submitProfileImgFile}
					/>
				}
			</div>
		)
	}
}

export default Container;
