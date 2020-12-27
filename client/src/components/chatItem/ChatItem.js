import React from 'react';

import './chatItem.css';

class ChatItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	render() {
		const { name, lastMsg, selectChat, active, unread } = this.props;

		return (
			<div
				className="chatItem-container"
				style={{ backgroundColor: active ? '#fff' : '#7c9da7' }}
				onClick={selectChat}
			>
				<div className="chatItem-profile-img-holder">
					<div className="chatItem-profile-img"></div>
				</div>
				<div className="chatItem-content-holder">
					<h4>{name}</h4>
					<p>{lastMsg}</p>
				</div>
				{unread > 0 && false && (
					<div className="chatItem-new-msg">
						<span>{unread}</span>
					</div>
				)}
			</div>
		)
	}
}

export default ChatItem;