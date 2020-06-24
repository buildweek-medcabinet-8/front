import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	List,
	ListItem,
	ListItemText,
	ListSubheader,
	Typography,
	Card,
	CardContent,
	Grid,
} from '@material-ui/core';
import StarsIcon from '@material-ui/icons/Stars';
import axiosWithAuth from '../utils/axiosWithAuth';

const useStyles = makeStyles({
	root: {
		minWidth: 275,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
	gridContainer: {
		marginBottom: '1rem',
	},
});

export default function Recommendations() {
	const classes = useStyles();
	const [recs, setRecs] = useState([]);

	useEffect(() => {
		axiosWithAuth()
			.get('/profile/recommendations')
			.then((res) => {
				console.log(res.data.content);
				setRecs(res.data.content);
			});
	}, []);

	function renderStars(rating) {
		let stars = [];
		for (let i = 0; i < rating; i++) {
			stars.push(<StarsIcon />);
		}
		return stars;
	}

	return (
		<Grid container spacing={3} className={classes.gridContainer}>
			{recs &&
				recs.map((rec) => {
					return (
						<Grid item key={rec.Strain}>
							<Card className={classes.root} variant='outlined'>
								<CardContent>
									<Typography
										className={classes.title}
										color='textSecondary'
										gutterBottom
									>
										{rec.yourName}
									</Typography>
									<Typography variant='h5' component='h2'>
										{rec.Strain}
									</Typography>
									<Typography className={classes.pos} color='textSecondary'>
										{rec.type}
									</Typography>
									{renderStars(rec.rating)}
									<ListSubheader>Effects:</ListSubheader>
									<List dense>
										{rec.effect.map((effect) => {
											return (
												<ListItem key={effect}>
													<ListItemText>{effect}</ListItemText>
												</ListItem>
											);
										})}
									</List>
									<ListSubheader>Flavors:</ListSubheader>
									<List dense>
										{rec.flavor.map((flavor) => {
											return (
												<ListItem key={flavor}>
													<ListItemText>{flavor}</ListItemText>
												</ListItem>
											);
										})}
									</List>
								</CardContent>
							</Card>
						</Grid>
					);
				})}
		</Grid>
	);
}
