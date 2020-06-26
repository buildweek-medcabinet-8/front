import React, { useState } from 'react';
import Recommendations from './Recommendations';
import UpdateStrain from './UpdateStrain';
import AddList from './AddList';
import add from '../store/svg/add.svg';

const ProfileList = ({ profile }) => {
	const [edit, toggleEdit] = useState(false);
	const [hide, toggleHide] = useState(false);
	const [showAdd, toggleShow] = useState(false);
	const [id, setId] = useState(0);

	const toggleHidding = (e) => {
		let str = e.target.className.split(' ');
		setId(str[0]);
		toggleHide(!hide);
		toggleShow(false);
	};
	const toggleEditing = () => {
		toggleEdit(!edit);
	};
	const toggleShowAdd = () => {
		toggleShow(!showAdd);
		toggleHide(true);
	};
	return (
		<div>
			{profile.length === 0 ? (
				<p>You don't have any profiles yet click the plus to get started</p>
			) : null}

			<div className='profile-list'>
				<button onClick={toggleEditing}>Edit Profile</button>
				{profile.length > 0
					? profile.map((item, ind) => {
							return (
								<div className='profile-item' key={ind}>
									<div
										className={`${ind} profile-name`}
										onClick={toggleHidding}
									>
										<h3 className={ind}>{item.listName}</h3>
									</div>
								</div>
							);
					  })
					: null}

				<div className='profile-item'>
					<div className='+ profile-name' onClick={toggleShowAdd}>
						<img src={add} alt='add a profile' className='add' />
					</div>
				</div>
			</div>
			<div className='view-details'>
				{hide ? (
					<div></div>
				) : edit ? (
					<Recommendations prefs={profile[id]} />
				) : (
					<UpdateStrain
						ieffects={profile[id].effects}
						iflavors={profile[id].list_flavors}
						idesc={profile[id].userDescription}
						pName={profile[id].listName}
						toggleEditing={toggleEditing}
					/>
				)}
				{showAdd ? <AddList /> : null}
			</div>
		</div>
	);
};

export default ProfileList;
