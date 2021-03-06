import React, { useState, useEffect } from 'react';
import {
	Grid,
	Button,
	Container,
	TextField,
	Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import axiosWithAuth from '../utils/axiosWithAuth';
import MultipleSelect from './MultipleSelect';
import * as yup from 'yup';

const useStyles = makeStyles({
	marginBottom: {
		marginBottom: '2rem',
	},
	tab: {
		width: '100%',
	},
	container: {
		padding: '1rem',
		width: '100%',
	},
});

function UpdateStrain({
	object,
	id,
	profile,
	setProfile,
	setDialogOpen,
	handleClose,
}) {
	// eslint-disable-next-line
	const [prefs, setPrefs] = useState({
		listName: object[0],
		effects: object[1].effects,
		flavors: object[1].flavors,
		description: object[1].description,
	});

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
		flavors: prefs.flavors,
		effects: prefs.effects,
		description: prefs.description,
		listName: prefs.listName,
	});

	//Validation
	const [buttonDisabled, setButtonDisabled] = useState(true);
	const [errors, setErrors] = useState({
		flavors: '',
		effects: '',
		description: '',
		listName: '',
		// message: '',
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
			description: e.target.value,
		};
		setFormState(newFormData);
		validateChange(e);
	}

	function handleDelete(e) {
		e.preventDefault();
		const delList = { listName: prefs.listName };
		setDialogOpen();
		axiosWithAuth()
			.delete('/profile/delete-list', { data: delList })
			.then((res) => {
				setProfile(profile.filter((item) => item[0] !== prefs.listName));
				handleClose();
			})
			.catch((err) => {
				console.log('/profile/delete-list', err.response);
			});
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
			.put('/profile/update-list', formState)
			.then((res) => {
				//console.log('/profile/update-list', res.data.message);
				setProfile([
					...profile.filter((item) => item[0] !== prefs.listName),
					addList,
				]);
			})
			.catch((err) => {
				setErrors({ errors, message: err.response.data.message });
				console.log('profile/update-list', errors.message);
			});
	}

	return (
		<Container className={classes.container}>
			<Button fullWidth onClick={handleDelete}>
				Delete This Strain Profile
			</Button>
			<form onSubmit={handleSubmit}>
				<Grid container direction='column' alignItems='center'>
					<Grid item>
						<Typography variant='subtitle2'>{formState.listName}</Typography>
					</Grid>
					<Grid item>
						<MultipleSelect
							inputLabel='Flavors'
							labelId='flavor-label-id'
							id={`flavors${id}`}
							value={formState.flavors}
							handleChange={handleFlavorChange}
							inputId={`flavor-input${id}`}
							items={flavors}
							name='flavors'
						/>
					</Grid>

					<Grid item>
						<MultipleSelect
							inputLabel='Effects'
							labelId='effect-label-id'
							id={`effects${id}`}
							value={formState.effects}
							handleChange={handleEffectChange}
							inputId={`effect-input${id}`}
							items={effects}
						/>
					</Grid>

					<Grid item className={classes.marginBottom}>
						<TextField
							multiline
							label='Description'
							value={formState.description}
							onChange={handleDescriptionChange}
							id={`description${id}`}
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
							Update Strain Profile
						</Button>
					</Grid>
				</Grid>
			</form>
		</Container>
	);
}

export default UpdateStrain;
