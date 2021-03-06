import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import { Grid, List, ListItem, Typography } from '@material-ui/core';

function Preferences({list}) {
	const [preferences, setPreferences] = useState({
		"effects": [],
		"flavors": [],
		"description": '',
		"message": ''
	});
	useEffect(() => {
		axiosWithAuth()
			.get('/profile/preferences', {listName: ""})
			.then((res) => {
				setPreferences(res.data);
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err.results);
			});
	}, []);

	return (
		<Grid container alignItems='center' justify='center' direction='column'>
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
