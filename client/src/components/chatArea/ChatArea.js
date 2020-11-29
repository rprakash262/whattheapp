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

		return (
			<div className="chat-area-container">
				<Scrollable>
					<div className="chat-area">
						{messages.map((msg, i) => (
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
