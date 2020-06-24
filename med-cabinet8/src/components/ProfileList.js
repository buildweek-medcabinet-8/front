import React, { useState } from 'react';
import StrainList from './StrainList';
import UpdateStrain from './UpdateStrain';

const ProfileList = ({profile}) => {
    const [edit, toggleEdit] = useState(true);

    const toggleEditing = () => {
        toggleEdit(!edit)   
    }
        return(
            <div className="profile-list">
            {profile.map((item, ind) => {
                return(
                    <div className="profile-item" key={ind}>
                        <div className="profile-name" onClick={toggleEditing}>
                            <h3>{item.profileName}</h3>
                        </div>
                    {(edit) ?
                        <StrainList strains={item.strains} key={ind}/>
                        :<UpdateStrain ieffects={item.effects} iflavors={item.flavors} idesc={item.description} id={ind} key={ind}/>
                    }
                    </div> 
                )
            })}
            </div>
        )
};

export default ProfileList