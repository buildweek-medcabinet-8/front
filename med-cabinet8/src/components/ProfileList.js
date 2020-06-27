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
import theme from '../theme';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
	buttons: {
		marginBottom: '2rem',
	},
	tabs: {
		width: '100%',
	},
	works: {
		marginBottom: '2rem',
		width: '50%',
		textAlign: 'center',

		[theme.breakpoints.down('md')]: {
			width: '90%',
		},
	},
	worksText: {
		padding: '2rem',
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
		<Grid container direction='column' alignItems='center' justify='center'>
			<Grid item>
				{profile.length === 0 ? (
					<Typography variant='subtitle1'>
						You don't have any profiles yet click add profile to get started
					</Typography>
				) : null}
			</Grid>

			<Grid item className={classes.works}>
				<Paper className={classes.worksText}>
					<Typography variant='p' color='initial' align='center'>
						To get started, click on "Add Profile", and create a profile by
						giving it a name, providing at least 1 desired flavor and 1 desired
						effect, and a brief description, and we will return a list of our 5
						best recommendations that meet your needs. You can change any
						profile at any time by choosing "Update Profile".
					</Typography>
				</Paper>
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
										handleClose={handleEditModalClose}
									/>
								</Dialog>
							</TabPanel>
						);
					})}
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
