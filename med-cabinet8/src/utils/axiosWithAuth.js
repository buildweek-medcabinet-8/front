import axios from 'axios';

const axiosWithAuth = () => {
	const token = localStorage.getItem('token');

	return axios.create({
		baseURL: 'https://bw-medcab-8.herokuapp.com/',
		headers: {
			Authorization: `bearer ${token}`,
		},
	});
};

export default axiosWithAuth;
