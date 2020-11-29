import LoginProvider from '../../providers/LoginProvider';

import LoginPage from './LoginPage';

function Main() {
	return (
		<LoginProvider>
			<LoginPage />
		</LoginProvider>
	)
}

export default Main;