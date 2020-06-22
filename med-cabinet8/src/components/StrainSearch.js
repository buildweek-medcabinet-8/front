import React, { useState } from 'react';
import { Grid, Button, Container, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import axiosWithAuth from '../utils/axiosWithAuth';
import MultipleSelect from './MultipleSelect';

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

	const [formState, setFormState] = useState({
		flavors: [],
		effects: [],
		description: '',
	});

	function handleFlavorChange(e) {
		e.persist();
		const newFormData = {
			...formState,
			flavors: e.target.value,
		};
		console.log(formState);
		// console.log(formState);
		setFormState(newFormData);
	}

	function handleEffectChange(e) {
		e.persist();
		const newFormData = {
			...formState,
			effects: e.target.value,
		};
		console.log(formState);
		// console.log(formState);
		setFormState(newFormData);
	}

	function handleDescriptionChange(e) {
		e.persist();

		const newFormData = {
			...formState,
			[e.target.name]: e.target.value,
		};
		setFormState(newFormData);
	}

	function handleSubmit(e) {
		e.preventDefault();

		let newPreferences = {
			flavors: formState.flavors,
			effects: formState.effects,
			description: formState.description,
		};
		axiosWithAuth()
			.post('/profile/update-preferences', newPreferences)
			.then((res) => {
				console.log(res);
				// console.log(newPreferences);
			})
			.catch((err) => {
				// console.log(err);
				console.log(JSON.stringify(err.message));
			});
		setFormState({
			flavors: [],
			effects: [],
			description: '',
		});
	}

	return (
		<Container>
			<form onSubmit={handleSubmit}>
				<Grid container direction='column' alignItems='center'>
					<Grid item>
						<MultipleSelect
							inputLabel='Flavors'
							labelId='flavor-label-id'
							id='flavors'
							value={formState.flavors}
							handleChange={handleFlavorChange}
							inputId='flavor-input'
							items={flavors}
							name='flavors'
						/>
					</Grid>

					<Grid item>
						<MultipleSelect
							inputLabel='Effects'
							labelId='effect-label-id'
							id='effects'
							value={formState.effects}
							handleChange={handleEffectChange}
							inputId='effect-input'
							items={effects}
						/>
					</Grid>

					<Grid item className={classes.marginBottom}>
						<TextField
							label='Description'
							value={formState.description}
							onChange={handleDescriptionChange}
							id='description'
							name='description'
							placeholder='Description'
						/>
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
