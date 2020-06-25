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

function AddList() {

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
		"list_flavors": [],
		"effects": [],
		"userDescription": '',
        "listName": '',
	});

	function handleFlavorChange(e) {
		e.persist();
		const newFormData = {
			...formState,
			list_flavors: e.target.value,
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
		axiosWithAuth()
			.post('profile/recs/add-list', formState)
			.then((res) => {
				console.log(res);
				// console.log(newPreferences);
			})
			.catch((err) => {
				// console.log(err);
				console.log(err.message, err.response);
			});
		setFormState({
			list_flavors: [],
			effects: [],
			userDescription: '',
			listName: '',
		});
	}

	return (
		<Container>
			<form onSubmit={handleSubmit}>
				<Grid container direction='column' alignItems='center'>
				<Grid item>
						<TextField
							label='Profile Name'
							value={formState.listName}
							onChange={handleDescriptionChange}
							id={`listName`}
							name='listName'
							placeholder='Profile Name'
						/>
					</Grid>
					<Grid item>
						<MultipleSelect
							inputLabel='Flavors'
							labelId='list_flavors-label-id'
							id={`list_flavors`}
							value={formState.list_flavors}
							handleChange={handleFlavorChange}
							inputId={`list_flavors-input`}
							items={flavors}
							name='flavors'
						/>
					</Grid>

					<Grid item>
						<MultipleSelect
							inputLabel='Effects'
							labelId='effect-label-id'
							id={`effects`}
							value={formState.effects}
							handleChange={handleEffectChange}
							inputId={`effect-input`}
							items={effects}
						/>
					</Grid>

					<Grid item className={classes.marginBottom}>
						<TextField
                            multiline
							label='Description'
							value={formState.userDescription}
							onChange={handleDescriptionChange}
							id={`userDescription`}
							name='userDescription'
							placeholder='Description'
						/>
					</Grid>

					<Grid item className={clsx(classes.marginBottom)}>
						<Button variant='contained' color='primary' fullWidth type='submit'>
							Create My Strain Profile
						</Button>
					</Grid>
				</Grid>
			</form>
		</Container>
	);
}

export default AddList;
