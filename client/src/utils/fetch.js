import axios from 'axios';

const fetch = (url, requestType, body, isPrivate) => {
	if (requestType === 'get') {
		return axios.get(url);
	}

	if (requestType === 'post') {
		return axios.post(
			url,
			body,
			{ headers: {
				'Content-Type': 'application/json',
			    'Authorization': 'token',
			}} 
		);
	}
}

export default fetch;