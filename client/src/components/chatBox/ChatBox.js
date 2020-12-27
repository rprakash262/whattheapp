import React from 'react';
import CheckIcon from '@material-ui/icons/Check';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import DoneAllIcon from '@material-ui/icons/DoneAll';

import './chatBox.css';

const getStatusIcon = status => {
	switch (status) {
		case 'sending':
			return <FiberManualRecordIcon style={{ fontSize: '10px' }} />;
		case 'sent':
			return <CheckIcon style={{ fontSize: '10px' }} />;
		case 'delivered':
			return <DoneAllIcon style={{ fontSize: '10px' }} />
		case 'seen':
			return <DoneAllIcon style={{ fontSize: '10px', color: 'blue' }} />
		default:
			return <CheckIcon style={{ fontSize: '10px' }} />;
	}
}

class ChatBox extends React.Component {
	render() {
		const { msg, status, flexEnd } = this.props;

		return (
			<div
				className="chat-box-container"
				style={{ alignItems: flexEnd ? 'flex-end' : 'flex-start' }}
			>
				<div className="chat-box">
					{msg}
				</div>
				<p>{flexEnd && (
					<React.Fragment>
						{getStatusIcon(status)} {status}
					</React.Fragment>)}
				</p>
			</div>
		)
	}
}

export default ChatBox;