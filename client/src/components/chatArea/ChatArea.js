import React from 'react';

import Scrollable from '../scrollable';
import ChatBox from '../chatBox';
import './chatArea.css';

class ChatArea extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		const { pageProps } = this.props;
		const { messages, userId } = pageProps;
		const { conversation = [] } = messages;

		return (
			<div className="chat-area-container">
				<Scrollable id="scrollBottom">
					<div className="chat-area">
						{conversation.map((msg, i) => (
							<ChatBox
								key={msg.id || msg.conversationId}
								msg={msg.message}
								flexEnd={msg.author === userId}
							/>
						))}
					</div>
				</Scrollable>
			</div>
		)
	}
}

export default ChatArea;
