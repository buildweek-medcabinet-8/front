import React, { useState, useEffect } from 'react';
import ProfileList from './ProfileList';
import axiosWithAuth from '../utils/axiosWithAuth';
import data from "../data/savedProfile.json";


const Welcome = ({username, edit}) => {

	const [profile, setProfile] = useState(data.resObj)

	useEffect(() => {
		axiosWithAuth()
			.get('/profile/list')
			.then((res) => {
			
				console.log(res.data) 
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, []);
    return(
        <div className="welcome">
        <h1>Welcome To Med-Cabinet {username}</h1>
        <ProfileList profileObj={profile}/>
        </div>
    )
}

export default Welcome;