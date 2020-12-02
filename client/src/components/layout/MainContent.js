import React from 'react';

import TextBox from '../textBox';
import ChatArea from '../chatArea';

class MainContent extends React.Component {
	render() {
		const { pageProps, pageActions } = this.props;

		const { selectedChatId, fetchingMessages } = pageProps;

		return (
			<div className="layout-maincontent">
				{fetchingMessages && selectedChatId && (
					<div className="layout-empty-chat-area">
						<p>Please wait, fetching your messages...</p>
					</div>
				)}
				{!selectedChatId && (
					<div className="layout-empty-chat-area">
						<p>Select a chat</p>
					</div>
				)}
				{selectedChatId && !fetchingMessages && (
					<React.Fragment>
						<div className="layout-chat-area">
							<ChatArea pageProps={pageProps} pageActions={pageActions} />
						</div>
						<div className="layout-text-box">
							<TextBox pageProps={pageProps} pageActions={pageActions} />
						</div>
					</React.Fragment>
				)}
			</div>
		)
	}
}

export default MainContent;
