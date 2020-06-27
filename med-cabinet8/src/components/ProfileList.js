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
	tabs: {
		width: '100%',
	},
});

const ProfileList = ({ profileObj }) => {
	const classes = useStyles();
	const [profile, setProfile] = useState(Object.entries(profileObj));

	const [value, setValue] = useState(0);
	const handleChange = (e, newValue) => {
		setValue(newValue);
	};

	const [addModalOpen, setAddModalOpen] = useState(false);
	const handleModalClose = () => {
		setAddModalOpen(false);
	};

	const [editModalOpen, setEditModalOpen] = useState(false);
	const handleEditModalClose = () => {
		setEditModalOpen(false);
	};

	return (
		<Grid container direction='column'>
			<Grid item container>
				<Grid item>
					{profile.length === 0 ? (
						<Typography variant='subtitle1'>
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
							onClick={() => setEditModalOpen(true)}
						>
							Edit Profile
						</Button>
					</Grid>
					<Grid item>
						<Button
							variant='contained'
							color='secondary'
							onClick={() => setAddModalOpen(true)}
						>
							Add Profile
						</Button>
					</Grid>
				</Grid>
				<Grid item className={classes.tabs}>
					<Paper>
						<Tabs
							value={value}
							onChange={handleChange}
							aria-label='simple tabs example'
							centered
							variant='fullWidth'
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
									<Recommendations object={profile[index]} />
									<Dialog open={editModalOpen} onClose={handleEditModalClose}>
										<UpdateStrain
											object={profile[index]}
											profile={profile}
											setProfile={setProfile}
											id={index}
											setDialogOpen={setEditModalOpen}
										/>
									</Dialog>
								</TabPanel>
							);
						})}
					</Grid>
				</Grid>
			</Grid>

			<Dialog open={addModalOpen} onClose={handleModalClose}>
				<AddList
					profile={profile}
					setProfile={setProfile}
					setDialogOpen={setAddModalOpen}
				/>
			</Dialog>
		</Grid>
	);
};

export default ProfileList;
