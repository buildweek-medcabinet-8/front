import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import { Grid, List, ListItem, Typography } from '@material-ui/core';

function Preferences() {
	const [preferences, setPreferences] = useState({
		effects: [],
		flavors: [],
		message: '',
	});
	useEffect(() => {
		axiosWithAuth()
			.get('/profile/preferences')
			.then((res) => {
				setPreferences(res.data);
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<Grid container alignItems='center' justify='center'>
			<Grid item>
				<List>
					<Typography variant='h5'>Your Desired Effects:</Typography>
					{preferences &&
						preferences.effects.map((effect, index) => (
							<ListItem key={index}>{effect.effect}</ListItem>
						))}
				</List>
			</Grid>

			<Grid item>
				<List>
					<Typography variant='h5'>Your Desired Flavors:</Typography>
					{preferences &&
						preferences.flavors.map((flavor, index) => (
							<ListItem key={index}>{flavor.flavor}</ListItem>
						))}
				</List>
			</Grid>
		</Grid>
	);
}

export default Preferences;
