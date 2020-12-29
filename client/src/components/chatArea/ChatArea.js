import React from 'react';

import Scrollable from '../scrollable';
import ChatBox from '../chatBox';
import './chatArea.css';

class ChatArea extends React.Component {
	render() {
		const { pageProps } = this.props;
		const { userId, selectedChatId, messages } = pageProps;

		const selectedChatMessages = messages[selectedChatId] || [];

		return (
			<div className="chat-area-container">
				<Scrollable id="scrollBottom">
					<div className="chat-area">
						{selectedChatMessages.map((msg, i) => (
							<ChatBox
								key={msg.id || msg.conversationId}
								msg={msg.message}
								flexEnd={msg.author === userId}
								status={msg.status}
								time={msg.time}
							/>
						))}
					</div>
				</Scrollable>
			</div>
		)
	}
}

export default ChatArea;
