import React from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import './TextBox.css';

class TextBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		const { pageProps, pageActions } = this.props;
		const { changeTextMsg, sendMsg } = pageActions;
		const { textMsg, isSendingMsg } = pageProps;

		return (
			<form onSubmit={isSendingMsg ? null : sendMsg}>
				<div className="text-box">
					<input
						placeholder="Enter message..."
						value={textMsg}
						onChange={e => changeTextMsg(e.target.value)}
					/>
					<button
						className="send-btn"
						onClick={isSendingMsg ? null : sendMsg}
					>
						<ArrowForwardIosIcon />
					</button>
				</div>
			</form>
		)
	}
}

export default TextBox;
