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
	editModal: {
		width: '50%',
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
	const handleAddModalClose = () => {
		setAddModalOpen(false);
	};

	const [editModalOpen, setEditModalOpen] = useState(false);
	const handleEditModalClose = () => {
		setEditModalOpen(false);
	};

	return (
		<Grid container direction='column' alignItems='center' justify='center'>
			<Grid item className={classes.works}>
				{profile.length === 0 ? (
				<Paper className={classes.worksText}>
					<Typography variant='subtitle1' color='initial' align='center'>
						To get started, click on 'Add Profile' to create a strain
						recommendation profile. Please provide a name, including at least 1
						desired flavor and effect, and a description.
					</Typography>
				</Paper>
				) : null}
			</Grid>
			<Grid item className={classes.works}>
				{profile.length > 0 ? (
				<Paper className={classes.worksText}>
					<Typography variant='subtitle1' color='initial' align='center'>
						Click on any of your profiles and 
						our engine will return a list of our 5 best recommendations that
						meet your needs. You can change any profile at any time by clicking
						'Update Profile'.
					</Typography>
				</Paper>
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

{profile.length > 0 ? (<Grid item>
					<Button
						variant='contained'
						color='secondary'
						onClick={() => setEditModalOpen(true)}
					>
						Update Profile
					</Button>
				</Grid>) : null}
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
								<Dialog
									open={editModalOpen}
									onClose={handleEditModalClose}
									className={classes.editModal}
								>
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

			<Dialog
				open={addModalOpen}
				onClose={handleAddModalClose}
				className={classes.addModal}
			>
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
