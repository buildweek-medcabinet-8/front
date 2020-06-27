import React, { useState } from 'react';
import Recommendations from './Recommendations';
import UpdateStrain from './UpdateStrain';
import AddList from './AddList';
import {
	Grid,
	Typography,
	Button,
	Paper,
	Tabs,
	Tab,
	Dialog,
} from '@material-ui/core';
import TabPanel from './TabPanel';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
	buttons: {
		marginBottom: '2rem',
	},
});

const ProfileList = ({ profileObj }) => {
	const classes = useStyles();
	const [profile, setProfile] = useState(Object.entries(profileObj));
	const [edit, toggleEdit] = useState(false);

	const toggleEditing = () => {
		toggleEdit(!edit);
	};

	const [value, setValue] = useState(0);
	const handleChange = (e, newValue) => {
		setValue(newValue);
	};

	const [modalOpen, setModalOpen] = useState(false);
	const handleModalClose = () => {
		setModalOpen(false);
	};

	return (
		<Grid container direction='row'>
			<Grid item container>
				<Grid item>
					{profile.length === 0 ? (
						<Typography variant='p'>
							You don't have any profiles yet click the plus to get started
						</Typography>
					) : null}
				</Grid>

				<Grid
					item
					container
					direction='row'
					alignItems='center'
					justify='space-around'
					className={classes.buttons}
				>
					<Grid item>
						<Button
							variant='contained'
							color='secondary'
							onClick={toggleEditing}
						>
							Edit Profile
						</Button>
					</Grid>
					<Grid item>
						<Button
							variant='contained'
							color='secondary'
							onClick={() => setModalOpen(true)}
						>
							Add Profile
						</Button>
					</Grid>
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
							if (!edit) {
								return (
									<TabPanel value={value} index={index}>
										<Recommendations object={profile[index]} />
									</TabPanel>
								);
							} else {
								return (
									<TabPanel value={value} index={index}>
										<UpdateStrain
											object={profile[index]}
											toggleEditing={toggleEditing}
											profile={profile}
											setProfile={setProfile}
										/>
									</TabPanel>
								);
							}
						})}
					</Grid>
				</Grid>
			</Grid>

			<Dialog open={modalOpen} onClose={handleModalClose}>
				<AddList profile={profile} setProfile={setProfile} />
			</Dialog>
		</Grid>
	);
};

export default ProfileList;
