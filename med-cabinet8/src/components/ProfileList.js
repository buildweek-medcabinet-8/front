import React, { useState } from 'react';
import Recommendations from './Recommendations';
import UpdateStrain from './UpdateStrain';
import AddList from './AddList';
import add from '../store/svg/add.svg';
import { Grid, Typography, Button, Paper, Tabs, Tab } from '@material-ui/core';
import TabPanel from './TabPanel';
import { makeStyles } from '@material-ui/styles';

const ProfileList = ({ profileObj }) => {
	const [profile, setProfile] = useState(Object.entries(profileObj));
	// const [profile, setProfile] = useState([Object.entries(profileObj)[0]]);
	const [edit, toggleEdit] = useState(false);
	const [hide, toggleHide] = useState(true);
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

	const [value, setValue] = useState(0);
	const handleChange = (e, newValue) => {
		setValue(newValue);
		let str = e.target.className.split(' ');
		setId(str[0]);
	};

	return (
		<Grid container direction='row'>
			<Grid item>
				{profile.length === 0 ? (
					<Typography variant='p'>
						You don't have any profiles yet click the plus to get started
					</Typography>
				) : null}
			</Grid>

			<Grid item container direction='column' alignItems='center'>
				<Grid item>
					<Button variant='contained' color='secondary' onClick={toggleEditing}>
						Edit Profile
					</Button>
				</Grid>
				<Grid item>
					<Paper>
						<Tabs
							value={value}
							onChange={handleChange}
							aria-label='simple tabs example'
						>
							{profile.map((item, index) => {
								return <Tab key={index} label={item[0]} />;
							})}
						</Tabs>
					</Paper>
					<Grid item>
						{profile.map((item, index) => {
							return (
								<TabPanel value={value} index={index}>
									{/* <Recommendations object={profile[0]} /> */}
								</TabPanel>
							);
						})}
					</Grid>
				</Grid>
				{profile.map((item, ind) => {
					return (
						<Grid item className='profile-item' key={ind}>
							<div className={`${ind} profile-name`} onClick={toggleHidding}>
								<Typography variant='h3' className={ind}>
									{item[0]}
								</Typography>
							</div>
						</Grid>
					);
				})}

				<Grid item className='profile-item'>
					<div className='+ profile-name' onClick={toggleShowAdd}>
						<img src={add} alt='add a profile' className='add' />
					</div>
				</Grid>
			</Grid>
			<Grid className='view-details'>
				{hide ? (
					<div></div>
				) : edit ? (
					<Recommendations object={profile[id]} />
				) : (
					<UpdateStrain
						object={profile[id]}
						toggleEditing={toggleEditing}
						profile={profile}
						setProfile={setProfile}
					/>
				)}
				{showAdd ? <AddList profile={profile} setProfile={setProfile} /> : null}
			</Grid>
		</Grid>
	);
};

export default ProfileList;
