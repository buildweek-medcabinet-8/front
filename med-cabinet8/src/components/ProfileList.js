import React, { useState } from 'react';
import StrainList from './StrainList';
import UpdateStrain from './UpdateStrain';

const ProfileList = ({profile}) => {

    const [edit, toggleEdit] = useState(false);
    const [hide, toggleHide] = useState(true);
    const [id, setId] = useState(0);

    const toggleHidding = (e) => {
        let str = e.target.className.split(" ");
        setId(str[0])
        toggleEdit(true)
        toggleHide(!hide)
    }
    const toggleEditing = () => {
        toggleEdit(!edit);
    }
        return(
            <div>
            <div className="profile-list">
            {profile.map((item, ind) => {
                return(
                    <div className="profile-item" key={ind}>
                        <div className={`${ind} profile-name`} onClick={toggleHidding}>
                            <h3 className={ind}>{item.ProfileName}</h3>
                        </div>
                    </div> 
                )
            })}
            </div>
            <div className="view-details">
                    {(hide) ?
                       <div></div>
                       : (edit) ? <StrainList strains={profile[id].Strains} toggleEditing={toggleEditing} /> : <UpdateStrain ieffects={profile[id].Effects} iflavors={profile[id].Flavors} idesc={profile[id].Description} pName={profile[id].ProfileName} toggleEditing={toggleEditing}/>
                    }
            </div>
            </div>
        )
};

export default ProfileList