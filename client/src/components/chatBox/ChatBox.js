import React from 'react';
import CheckIcon from '@material-ui/icons/Check';

import './chatBox.css';

class ChatBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	render() {
		const { msg, flexEnd } = this.props;

		return (
			<div className="chat-box-container" style={{ alignItems: flexEnd ? 'flex-end' : 'flex-start' }}>
				<div className="chat-box">
					{msg}
				</div>
				<p>{flexEnd && (
					<React.Fragment>
						<CheckIcon style={{ fontSize: '10px' }} /> Sent
					</React.Fragment>)}
				</p>
			</div>
		)
	}
}

export default ChatBox;