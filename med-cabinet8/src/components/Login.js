import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { Grid, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';

const useStyles = makeStyles({});

function LoginForm() {
	const classes = useStyles();

	// Form Control State & Initial Data
	const initialState = {
		username: '',
		password: '',
	};

	const [formState, setFormState] = useState(initialState);
	const [buttonDisabled, setButtonDisabled] = useState(true);

	// Change Handling
	function handleChange(e) {
		e.persist();
		const newFormState = {
			...formState,
			[e.target.name]: e.target.value,
		};
		validateChange(e);
		setFormState(newFormState);
	}

	// Form Submission Handling
	function handleSubmit(e) {
		e.preventDefault();
		console.log(formState);
		setFormState(initialState);
	}

	// Validation
	const [errors, setErrors] = useState(initialState);

	// Define Form Schema
	const formSchema = yup.object().shape({
		username: yup.string().required('Username required!'),
		password: yup.string().required('Password required!'),
	});

	// Check for proper form entry
	useEffect(() => {
		formSchema.isValid(formState).then((isFormValid) => {
			console.log(isFormValid);
			setButtonDisabled(!isFormValid);
		});
	}, [formState, formSchema]);

	// Validate Changes
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

	return (
		<form onSubmit={handleSubmit}>
			<Grid
				container
				direction='column'
				justify='center'
				alignItems='center'
				spacing={4}
			>
				<Grid item>
					<TextField
						autoFocus
						variant='outlined'
						type='text'
						id='username'
						name='username'
						value={formState.username}
						onChange={handleChange}
						label='Username:'
						error={errors.username ? true : false}
						helperText={errors.username ? errors.username : null}
					/>
				</Grid>

				<Grid item>
					<TextField
						variant='outlined'
						type='password'
						id='password'
						name='password'
						value={formState.password}
						onChange={handleChange}
						label='Password:'
						error={errors.password ? true : false}
						helperText={errors.password ? errors.password : null}
					/>
				</Grid>

				<Grid item>
					<Button
						variant='contained'
						color='primary'
						size='large'
						type='submit'
						disabled={buttonDisabled}
						startIcon={<LockOpenOutlinedIcon />}
					>
						Login
					</Button>
				</Grid>
			</Grid>
		</form>
	);
}

export default LoginForm;