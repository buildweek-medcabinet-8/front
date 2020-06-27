import React, { useState, useEffect } from 'react';
import ProfileList from './ProfileList';
import axiosWithAuth from '../utils/axiosWithAuth';
import LoadingPage from './LoadingPage';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
	heading: {
		margin: '3rem 0',
	},
});

const Welcome = ({ username, edit }) => {
	const classes = useStyles();
	const [profile, setProfile] = useState([]);
	const [error, setError] = useState('');

	useEffect(() => {
		axiosWithAuth()
			.get('/profile/lists')
			.then((res) => {
				setProfile(res.data.resObj);
				setError('');
				console.log(res);
				//console.log('/profile/lists data.resObj', res.data.resObj)
			})
			.catch((err) => {
				setError(err.message);
				console.log(err.response);
			});
	}, []);
	if (profile.length === 0 && error.length === 0) {
		return <LoadingPage />;
	}
	return (
		<Grid container className={classes.container} direction='column'>
			<Grid item className={classes.heading}>
				<Typography variant='h1' component='h1' align='center'>
					Welcome To Med-Cabinet {username}
				</Typography>
				{error !== '' ?? <p className='error'>{error}</p>}
			</Grid>

			<Grid item className={classes.profile}>
				<ProfileList profileObj={profile} />
			</Grid>
		</Grid>
	);
};

export default Welcome;
