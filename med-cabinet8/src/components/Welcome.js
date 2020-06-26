import React, { useState, useEffect } from 'react';
import ProfileList from './ProfileList';
import axiosWithAuth from '../utils/axiosWithAuth';



const Welcome = ({username, edit}) => {

	const [profile, setProfile] = useState([])
	const [error, setError] = useState('')

	useEffect(() => {
		axiosWithAuth()
			.get('/profile/lists')
			.then((res) => {
				setProfile(res.data.resObj)
				setError('')
				//console.log('/profile/lists data.resObj', res.data.resObj) 
			})
			.catch((err) => {
				setError(err.message)
				console.log(err.response);
			});
	}, []);
	if(profile.length === 0 && error.length === 0){
		return(
			<div>Loading</div>
		)
	}
    return(
        <div className="welcome">
        <h1>Welcome To Med-Cabinet {username}</h1>
	{(error !== '') ??  <p className="error">{error}</p>}
<ProfileList profileObj={profile}/>
        </div>
    )
}

export default Welcome;