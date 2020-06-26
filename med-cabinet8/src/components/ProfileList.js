import React, { useState } from 'react';
import Recommendations from './Recommendations';
import UpdateStrain from './UpdateStrain';
import AddList from './AddList';
import add from "../store/svg/add.svg"

const ProfileList = ({profileObj}) => {
   // console.log('Profile list', profileObj)
    const [profile, setProfile] = useState(useState(Object.entries(profileObj))[0]) 
    const [edit, toggleEdit] = useState(false);
    const [hide, toggleHide] = useState(true);
    const [showAdd, toggleShow] = useState(false)
    const [id, setId] = useState(0);


    const toggleHidding = (e) => {
        let str = e.target.className.split(" ");
        setId(str[0])
        toggleHide(!hide)
        toggleShow(false)
    }
    const toggleEditing = () => {
        toggleEdit(!edit);
    }
    const toggleShowAdd = () => {
        toggleShow(!showAdd);
        toggleHide(true)
    }

        return(
            <div>

             {(profile.length === 0) ? <p>You don't have any profiles yet click the plus to get started</p> : null}
             
            
			 <div className='profile-list'>
				<button onClick={toggleEditing}>Edit Profile</button>
				{profile.map((item, ind) => {
	
							return (
								<div className='profile-item' key={ind}>
									<div
										className={`${ind} profile-name`}
										onClick={toggleHidding}
									>
										<h3 className={ind}>{item[0]}</h3>
									</div>
								</div>
							);
					  })
}
			
            <div className="profile-item">
                <div className="+ profile-name" onClick={toggleShowAdd}>
                    <img src={add} alt="add a profile" className="add" />
                </div>
            </div>
            </div>
            <div className="view-details">
            {(hide) ? <div></div> :
                    (edit) ? <Recommendations object={profile[id]}/> : <UpdateStrain object={profile[id]} toggleEditing={toggleEditing} profile={profile} setProfile={setProfile}/> 
                    }
                    {showAdd ? <AddList profile={profile} setProfile={setProfile}/> : null}
            </div>
            </div>
        )
};

export default ProfileList