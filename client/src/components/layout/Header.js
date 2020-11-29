import React from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import './layout.css'

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	render() {
		const { pageProps, pageActions } = this.props;

		const { selectedChat, leftHeaderDropdown } = pageProps;
		const {
			logout,
			showLeftHeaderDropdown,
			hideLeftHeaderDropdown,
		} = pageActions;

		return (
			<div className="layout-header">
				<div className="layout-header-left">
					{leftHeaderDropdown && (
						<div
							className="layout-header-left-dropdown-panel-overlay"
							onClick={hideLeftHeaderDropdown}
						/>
					)}
					{leftHeaderDropdown && (
						<div className="layout-header-left-dropdown-panel">
							<div onClick={logout}>Logout</div>
						</div>
					)}
					<h4>WhatTheApp</h4>
					<div
						className="layout-header-left-dropdown-dots"
						onClick={leftHeaderDropdown ? hideLeftHeaderDropdown : showLeftHeaderDropdown}
					>
						<MoreVertIcon />
					</div>
				</div>
				<div className="layout-header-right">
					<h4>{selectedChat.chatName}</h4>
				</div>
			</div>
		)
	}
}

export default Header;
