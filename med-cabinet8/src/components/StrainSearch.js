import React, { useState, useEffect } from 'react';
import {
	Grid,
	Button,
	//	Typography,
	Container,
	TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import axios from 'axios';

const useStyles = makeStyles({
	marginBottom: {
		marginBottom: '2rem',
	},
});

function StrainSearch() {
	const classes = useStyles();
	const flavors = [
		'Earthy',
		'Sweet',
		'Citrus',
		'Flowery',
		'Violet',
		'Diesel',
		'Spicy/Herbal',
		'Sage',
		'Woody',
		'Apricot',
		'Grapefruit',
		'Orange',
		'None',
		'Pungent',
		'Grape',
		'Pine',
		'Skunk',
		'Berry',
		'Pepper',
		'Menthol',
		'Blue Cheese',
		'Cheese',
		'Chemical',
		'Mango',
		'Lemon',
		'Peach',
		'Vanilla',
		'Nutty',
		'Chestnut',
		'Tea',
		'Tobacco',
		'Tropical',
		'Strawberry',
		'Blueberry',
		'Mint',
		'Apple',
		'Honey',
		'Lavender',
		'Lime',
		'Coffee',
		'Ammonia',
		'Minty',
		'Tree',
		'Fruit',
		'Butter',
		'Pineapple',
		'Tar',
		'Rose',
		'Plum',
		'Pear',
	];

	const effects = [
		'Creative',
		'Energetic',
		'Tingly',
		'Euphoric',
		'Relaxed',
		'Aroused',
		'Happy',
		'Uplifted',
		'Hungry',
		'Talkative',
		'None',
		'Giggly',
		'Focused',
		'Sleepy',
		'Dry Mouth',
	];

	// Search Terms
	const [searchFlavorTerm, setSearchFlavorTerm] = useState('');
	const [searchEffectTerm, setSearchEffectTerm] = useState('');

	// Search Results
	const [searchFlavorResults, setSearchFlavorResults] = useState(flavors);
	const [searchEffectResults, setSearchEffectResults] = useState(effects);

	// Data for API Call
	const [flavorResults, setFlavorResults] = useState([]);
	const [effectResults, setEffectResults] = useState([]);

	// Set Results for flavor search
	useEffect(() => {
		const newResults = flavors.filter((flavor) => {
			return flavor.toLowerCase().includes(searchFlavorTerm.toLowerCase());
		});

		setSearchFlavorResults(newResults);
	}, [searchFlavorTerm]);

	// Set results for effect search
	useEffect(() => {
		const newResults = effects.filter((effect) => {
			return effect.toLowerCase().includes(searchEffectTerm.toLowerCase());
		});

		setSearchEffectResults(newResults);
	}, [searchEffectTerm]);

	//Input Control
	function handleFlavorChange(e) {
		setSearchFlavorTerm(e.target.value);
	}
	function handleEffectChange(e) {
		setSearchEffectTerm(e.target.value);
	}

	//Set Search Terms for API call
	function addFlavorResult(result) {
		setFlavorResults([...flavorResults, result]);
	}
	function addEffectResult(result) {
		setEffectResults([...effectResults, result]);
	}

	//Make API Call
	function handleFormSubmission(e) {
		e.preventDefault();

		let newPreferences = {
			flavors: flavorResults,
			effects: effectResults,
		};
		axios
			.post(
				'https://bw-medcab-8.herokuapp.com/profile/update-preferences',
				newPreferences
			)
			.then((res) => {
				console.log(res);
				console.log(newPreferences);
			});
		setFlavorResults([]);
		setEffectResults([]);
	}

	return (
		<Container>
			<form onSubmit={handleFormSubmission}>
				<Grid container direction='column' alignItems='center'>
					<Grid item className={clsx(classes.marginBottom)}>
						<TextField
							autoFocus
							variant='outlined'
							type='text'
							id='searchFlavor'
							name='searchFlavor'
							value={searchFlavorTerm}
							onChange={handleFlavorChange}
							label='Search Flavors:'
						/>
					</Grid>

					<Grid
						item
						container
						spacing={4}
						justify='center'
						className={clsx(classes.marginBottom)}
					>
						{searchFlavorResults.map((result) => {
							return (
								<Grid item key={result}>
									<Button
										variant='contained'
										color='secondary'
										onClick={() => addFlavorResult(result)}
									>
										{result}
									</Button>
								</Grid>
							);
						})}
					</Grid>

					<Grid item className={clsx(classes.marginBottom)}>
						<TextField
							variant='outlined'
							type='text'
							id='searchEffect'
							name='searchEffect'
							value={searchEffectTerm}
							onChange={handleEffectChange}
							label='Search Effects:'
						/>
					</Grid>

					<Grid
						item
						container
						spacing={4}
						justify='center'
						className={clsx(classes.marginBottom)}
					>
						{searchEffectResults.map((result) => {
							return (
								<Grid item key={result}>
									<Button
										variant='contained'
										color='secondary'
										onClick={() => addEffectResult(result)}
									>
										{result}
									</Button>
								</Grid>
							);
						})}
					</Grid>

					<Grid item className={clsx(classes.marginBottom)}>
						<Button variant='contained' color='primary' fullWidth type='submit'>
							Find My Strain
						</Button>
					</Grid>
				</Grid>
			</form>
		</Container>
	);
}

export default StrainSearch;
