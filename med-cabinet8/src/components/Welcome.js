import React, { useState, useEffect } from 'react';
import ProfileList from './ProfileList';
import axiosWithAuth from '../utils/axiosWithAuth';
import data from "../data/savedProfile.json";


const Welcome = (props, {username, edit}) => {
    // eslint-disable-next-line 
    const [profile, setProfile] = useState(data.SavedProfiles);
	useEffect(() => {
		axiosWithAuth()
			.get('/profile/list')
			.then((res) => {
                console.log(res.data)
				//setProfile((res.data.list) ? res.data.list : [] );
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, []);
    return(
        <div className="welcome">
        <h1>Welcome To Med-Cabinet {username}</h1>
        <ProfileList profile={profile}/>
        </div>
    )
}

export default Welcome;