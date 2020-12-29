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
};

const getTime = time => {
	const date = new Date(time);
	const hrs = date.getHours();
	const mins = date.getMinutes();

	return `${hrs}:${mins}`;
}

class ChatBox extends React.Component {
	render() {
		const { msg, status, flexEnd, time } = this.props;

		return (
			<div
				className="chat-box-container"
				style={{ alignItems: flexEnd ? 'flex-end' : 'flex-start' }}
			>
				<div className="chat-box">
					{msg}
				</div>
				<p>
					<span>{getTime(time)}</span>
					{flexEnd && (
						<React.Fragment>
							<span>{getStatusIcon(status)}</span>
							<span>{status}</span>
						</React.Fragment>
					)}
				</p>
			</div>
		)
	}
}

export default ChatBox;