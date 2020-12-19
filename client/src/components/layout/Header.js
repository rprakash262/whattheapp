import React from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import './layout.css'

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	profileClick = () => {
		this.props.pageActions.toggleProfileModal(true);
		this.props.pageActions.hideLeftHeaderDropdown();	
	}

	render() {
		const { pageProps, pageActions } = this.props;

		const { selectedChat, leftHeaderDropdown } = pageProps;
		const {
			logout,
			showLeftHeaderDropdown,
			hideLeftHeaderDropdown,
			backBtnPressed,
			// toggleProfileModal,
		} = pageActions;

		const { isMobile, view } = pageProps;

		return (
			<div className="layout-header">
				<div className="layout-header-left">
					{isMobile && view === 'chatarea' && (
						<div
							className="layout-header-left-back-btn"
							onClick={backBtnPressed}
						>
							<ArrowBackIosIcon style={{ color: '#7c9da7', fontSize: '24px' }} />
						</div>
					)}
					{leftHeaderDropdown && (
						<div
							className="layout-header-left-dropdown-panel-overlay"
							onClick={hideLeftHeaderDropdown}
						/>
					)}
					{leftHeaderDropdown && (
						<div className="layout-header-left-dropdown-panel">
							<div onClick={this.profileClick}>Profile</div>
							<div onClick={logout}>Logout</div>
						</div>
					)}
					<h4>
						{(view === 'sidebar' || !isMobile) && 'WhatTheApp'}
						{isMobile && view === 'chatarea' && selectedChat.chatName}
					</h4>
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
