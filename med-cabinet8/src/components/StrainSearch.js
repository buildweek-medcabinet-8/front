import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

function StrainSearch() {
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
	const [flavorResults, setFlavorResults] = useState(flavors);
	const [effectResults, setEffectResults] = useState(effects);

	// Consolidated list of all flavors and effects user wants to search for
	const [allResults, setAllResults] = useState([]);

	// Set Results for flavor search
	useEffect(() => {
		const newResults = flavors.filter((flavor) => {
			return flavor.toLowerCase().includes(searchFlavorTerm.toLowerCase());
		});

		setFlavorResults(newResults);
	}, [searchFlavorTerm]);

	// Set results for effect search
	useEffect(() => {
		const newResults = effects.filter((effect) => {
			return effect.toLowerCase().includes(searchEffectTerm.toLowerCase());
		});

		setEffectResults(newResults);
	}, [searchEffectTerm]);

	// Testing
	useEffect(() => {
		console.log(allResults);
	}, [allResults]);

	function handleFlavorChange(e) {
		setSearchFlavorTerm(e.target.value);
		console.log(flavorResults);
	}

	function handleEffectChange(e) {
		setSearchEffectTerm(e.target.value);
		console.log(effectResults);
	}

	function handleAddResult(result) {
		console.log(allResults);
		setAllResults([...allResults, result]);
	}

	return (
		<Grid container direction='column' alignItems='center'>
			<Grid item>
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

			<Grid item container spacing={4}>
				{flavorResults.map((result) => {
					return (
						<Grid item key={result}>
							<Paper onClick={() => handleAddResult(result)}>
								<Typography variant='subtitle1'>{result}</Typography>
							</Paper>
						</Grid>
					);
				})}
			</Grid>

			<Grid item>
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

			<Grid item container spacing={3}>
				{effectResults.map((result) => {
					return (
						<Grid item key={result}>
							<Paper onClick={() => handleAddResult(result)}>
								<Typography variant='subtitle1'>{result}</Typography>
							</Paper>
						</Grid>
					);
				})}
			</Grid>
		</Grid>
	);
}

export default StrainSearch;
