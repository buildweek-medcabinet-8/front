import React, { useState, useEffect } from 'react';
import { Grid, Button, Container, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import axiosWithAuth from '../utils/axiosWithAuth';
import MultipleSelect from './MultipleSelect';
import * as yup from 'yup';

const useStyles = makeStyles({
	marginBottom: {
		marginBottom: '2rem',
	},
});

function AddList({ setProfile, profile, setDialogOpen }) {
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
		listName: '',
		flavors: [],
		effects: [],
		description: ''
	});

	//Validation
	const [buttonDisabled, setButtonDisabled] = useState(true);
	const [errors, setErrors] = useState({
		flavors: '',
		effects: '',
		description: '',
		listName: '',
		message: ''
	});

	const formSchema = yup.object().shape({
		flavors: yup.array().min(1).required('Enter at least 1 flavor!'),
		effects: yup.array().min(1).required('Enter at least 1 effect!'),
		description: yup.string().required('Please enter a brief description...'),
		listName: yup.string().required('Please Enter a Name for List!'),
	});

	useEffect(() => {
		formSchema.isValid(formState).then((isFormValid) => {
			//console.log(isFormValid);
			setButtonDisabled(!isFormValid);
		});
	}, [formState, formSchema]);

	function validateChange(e) {
		yup
			.reach(formSchema, e.target.name)
			.validate(e.target.value)
			.then(() => {
				setErrors({
					...errors,
					[e.target.name]: '',
				});
			})
			.catch((err) => {
				setErrors({
					...errors,
					[e.target.name]: err.errors[0],
				});
			});
	}

	function handleFlavorChange(e) {
		e.persist();
		const newFormData = {
			...formState,
			flavors: e.target.value,
		};
		//console.log(formState);
		validateChange(e);
		setFormState(newFormData);
	}

	function handleEffectChange(e) {
		e.persist();
		const newFormData = {
			...formState,
			effects: e.target.value,
		};
		validateChange(e);
		setFormState(newFormData);
	}

	function handleDescriptionChange(e) {
		e.persist();

		const newFormData = {
			...formState,
			[e.target.name]: e.target.value,
		};
		validateChange(e);
		setFormState(newFormData);
	}

	function handleSubmit(e) {
		e.preventDefault();
		const addList = [
			formState.listName,
			{
				effects: formState.effects,
				flavors: formState.flavors,
				description: formState.description,
			},
		];
		setDialogOpen(false);
		axiosWithAuth()
			.post('profile/add-list', formState)
			.then((res) => {
				setProfile([...profile, addList]);
				// console.log(newPreferences);
				//console.log('combined profile', profile);
			})
			.catch((err) => {
				alert("Sorry a List with that name already exist")
				
			});
		// setFormState({
		// 	listName: '',
		// 	flavors: [],
		// 	effects: [],
		// 	description: '',
		// });
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
							labelId='flavors-label-id'
							id={`flavors`}
							value={formState.flavors}
							handleChange={handleFlavorChange}
							inputId={`flavors-input`}
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
							name='effects'
						/>
					</Grid>

					<Grid item className={classes.marginBottom}>
						<TextField
							multiline
							label='Description'
							value={formState.description}
							onChange={handleDescriptionChange}
							id={`description`}
							name='description'
							placeholder='Description'
						/>
					</Grid>

					<Grid item className={clsx(classes.marginBottom)}>
						<Button
							variant='contained'
							color='primary'
							fullWidth
							type='submit'
							disabled={buttonDisabled}
						>
							Create My Strain Profile
						</Button>
					</Grid>
				</Grid>
			</form>
		</Container>
	);
}

export default AddList;
