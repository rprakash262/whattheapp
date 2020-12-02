import React from 'react';

import './layout.css';
import ChatItem from '../chatItem';
import Scrollable from '../scrollable';

class Sidebar extends React.Component {
	render() {
		const { pageProps, pageActions } = this.props;
		const { activeChats, selectedChatId } = pageProps;
		const { selectChat, toggleModal, filterChats } = pageActions;

		return (
			<div className="layout-sidebar">
				<div className="layout-sidebar-search-chat">
					<input
						type="text"
						placeholder="Search..."
						onChange={e => filterChats(e.target.value)}
					/>
				</div>
				<Scrollable>
					{activeChats.length > 0 &&
						activeChats.map(chat => (
						<ChatItem
							active={chat.chatId === selectedChatId}
							key={chat.chatId}
							selectChat={() => selectChat(chat)}
							name={chat.chatName}
							lastMsg={chat.lastMsg}
						/>
					))}
				</Scrollable>
				<div className="new-conv">
					<button onClick={() => toggleModal(true)}>
						Start New Conversation
					</button>
				</div>
			</div>
		)
	}
}

export default Sidebar;