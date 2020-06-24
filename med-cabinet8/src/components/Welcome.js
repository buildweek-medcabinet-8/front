import React, { useState } from 'react';
import data from '../data/savedProfile.json';
import ProfileList from './ProfileList';

const Welcome = (props, {username, edit}) => {
    // eslint-disable-next-line 
    const [profile, setProfile] = useState(data.savedProfiles);

    return(
        <div className="welcome">
        <h1>Welcome To Med-Cabinet {username}</h1>
        <ProfileList profile={profile}/>
        </div>
    )
}

export default Welcome;