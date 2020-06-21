import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';

function Preferences() {
	const [preferences, setPreferences] = useState({});
	useEffect(() => {
		axiosWithAuth()
			.get('/profile/preferences')
			.then((res) => {
				setPreferences(res.data);
			});
	}, []);
	return <div></div>;
}

export default Preferences;
