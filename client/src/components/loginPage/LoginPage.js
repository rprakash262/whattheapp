import React from 'react';

import AlertBar from '../alertBar';
import './loginPage.css';
import { getUserCookie } from '../../cookie';

class LoginPage extends React.Component {
	componentDidMount() {
		const userId = getUserCookie('userId');
		if (userId) {
			// window.location.href = '/';
		}
	}

	render() {
		const { pageProps, pageActions } = this.props;
		const {
			loginFields,
			registerFields,
			showAlert,
			alertType,
			alertMsg,
			loggingIn,
			registering,
		} = pageProps;

		const {
			changeLoginForm,
			changeRegisterForm,
			register,
			login,
			hideAlert
		} = pageActions;

		return (
			<div className="login-page-container">
				<div className="login-page-header">
					<h2>WhatTheApp</h2>
				</div>
				<div className="login-form-container">
					<div className="login-form">
						<form onSubmit={login}>
							<h4>Login</h4>
							<div className="one-input">
								<input
									value={loginFields.number}
									name="number"
									type="text"
									placeholder="Enter 10 digit phone number"
									onChange={e => changeLoginForm('number', e.target.value)}
								/>
							</div>
							<div className="one-input">
								<input
									value={loginFields.pin}
									name="pin"
									type="password"
									placeholder="Enter 6 digit PIN"
									onChange={e => changeLoginForm('pin', e.target.value)}
								/>
							</div>
							<div className="one-input">
								<button type="submit" onClick={loggingIn ? null : login}>
									{loggingIn ? 'Please Wait...' : 'Login'}
								</button>
							</div>
						</form>
					</div>
					<div className="signup-form">
						<form onSubmit={register}>
							<h4>Sign Up</h4>
							<div className="one-input">
								<input
									value={registerFields.number}
									name="number"
									type="text"
									placeholder="Enter 10 digit phone number"
									onChange={e => changeRegisterForm('number', e.target.value)}
								/>
							</div>
							<div className="one-input">
								<input
									value={registerFields.name}
									name="name"
									type="text"
									placeholder="Enter your name"
									onChange={e => changeRegisterForm('name', e.target.value)}
								/>
							</div>
							<div className="one-input">
								<input
									value={registerFields.pin}
									name="pin"
									type="password"
									placeholder="Choose 6 digit PIN"
									onChange={e => changeRegisterForm('pin', e.target.value)}
								/>
							</div>
							<div className="one-input">
								<button type="submit" onClick={registering ? null : register}>
									{registering ? 'Please Wait...' : 'Sign Up'}
								</button>
							</div>
						</form>
					</div>
				</div>
				<AlertBar
					showAlert={showAlert}
					alertType={alertType}
					alertMsg={alertMsg}
					hideAlert={hideAlert}
				/>
			</div>
		)
	}
}

export default LoginPage;
