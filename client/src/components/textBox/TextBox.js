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
		const { textMsg } = pageProps;

		return (
			<form onSubmit={sendMsg}>
				<div className="text-box">
					<input
						placeholder="Enter message..."
						value={textMsg}
						onChange={e => changeTextMsg(e.target.value)}
					/>
					<button
						className="send-btn"
						onClick={sendMsg}
					>
						<ArrowForwardIosIcon />
					</button>
				</div>
			</form>
		)
	}
}

export default TextBox;
