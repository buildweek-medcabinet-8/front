import React, { useState } from 'react';
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

export default function StrainList({strains, toggleEditing}) {
	const classes = useStyles();
	// eslint-disable-next-line
	const [recs, setRecs] = useState(strains);


	function renderStars(rating, id) {
		let stars = [];
		for (let i = 0; i < rating; i++) {
			stars.push(<StarsIcon key={i}/>);
		}
		return stars;
	}

	return (
		<Grid container spacing={3} className={classes.gridContainer}>
			<button onClick={toggleEditing}>Edit</button>
			{recs &&
				recs.map((rec, index) => {
					return (
						<Grid item container key={index} xs={12} sm={6} md={3}>
							<Card className={classes.root} variant='outlined'>
								<CardContent>
									<Grid item>
										<Typography variant='h5' component='h2'>
											{rec.Strain}
										</Typography>
										<Typography className={classes.pos} color='textSecondary'>
											{rec.Type}
										</Typography>
										{renderStars(rec.Rating)}
									</Grid>
									<Grid item>
										<Typography variant='body1' color='initial'>
											{rec.Description}
										</Typography>
									</Grid>
									<Grid item container>
										<Grid item>
											<ListSubheader>Effects:</ListSubheader>
											<List dense>
												{rec.Effects.split(',').map((effect, index) => {
													return (
														<ListItem key={index}>
															<ListItemText>{effect}</ListItemText>
														</ListItem>
													);
												})}
											</List>
										</Grid>
										<Grid item>
											<ListSubheader>Flavors:</ListSubheader>
											<List dense>
												{rec.Flavor.split(',').map((flavor, index) => {
													return (
														<ListItem key={index}>
															<ListItemText>{flavor}</ListItemText>
														</ListItem>
													);
												})}
											</List>
										</Grid>
									</Grid>
								</CardContent>
							</Card>
						</Grid>
					);
				})}
		</Grid>
	);
}
