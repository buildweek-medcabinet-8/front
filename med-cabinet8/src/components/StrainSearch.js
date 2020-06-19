import React, { useState, useEffect } from 'react';
import {
	Grid,
	Button,
	Typography,
	Container,
	TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';

const useStyles = makeStyles({
	marginBottom: {
		marginBottom: '2rem',
	},
});

function StrainSearch() {
	const classes = useStyles();
	const flavors = [
		'earthy',
		'sweet',
		'citrus',
		'pungent',
		'berry',
		'pine',
		'flowery',
		'woody',
		'diesel',
		'spicy',
		'herbal',
		'lemon',
		'skunk',
		'none',
		'tropical',
		'blueberry',
		'grape',
		'orange',
		'cheese',
		'pepper',
		'lime',
		'strawberry',
		'pineapple',
		'minty',
		'sage',
		'grapefruit',
		'chemical',
		'lavender',
		'vanilla',
		'tree',
		'fruit',
		'mango',
		'honey',
		'ammonia',
		'nutty',
		'coffee',
		'menthol',
		'butter',
		'mint',
		'tea',
		'apple',
		'rose',
		'apricot',
		'blue',
		'tobacco',
		'tar',
		'violet',
		'chestnut',
		'peach',
		'pear',
		'plum',
	];

	const effects = [
		'happy',
		'relaxed',
		'euphoric',
		'uplifted',
		'creative',
		'sleepy',
		'energetic',
		'focused',
		'hungry',
		'talkative',
		'tingly',
		'giggly',
		'aroused',
		'none',
		'dry',
		'mouth',
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
	const [description, setDescription] = useState('');

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
	function addDescription(e) {
		setDescription(e.target.value);
	}

	//Make API Call
	function handleFormSubmission() {
		//To Do: Add API call
		console.log(flavorResults);
		console.log(effectResults);
		console.log(description);
		setFlavorResults([]);
		setEffectResults([]);
		setDescription('');
	}

	return (
		<Container>
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
					<TextField
						variant='outlined'
						type='text'
						id='description'
						name='description'
						value={description}
						onChange={addDescription}
						label='Describe your strain...'
					/>
				</Grid>

				<Grid item className={clsx(classes.marginBottom)}>
					<Button
						variant='contained'
						color='primary'
						fullWidth
						onClick={handleFormSubmission}
					>
						Find My Strain
					</Button>
				</Grid>
			</Grid>
		</Container>
	);
}

export default StrainSearch;
