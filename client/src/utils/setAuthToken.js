import axios from 'axios';

const setAuthTokenHeader = token => {
	if (token) {
		axios.defaults.headers.common['Authorisation'] = token;
	} else {
		delete axios.defaults.headers.common['Authorisation'];
	}
}

export default setAuthTokenHeader;