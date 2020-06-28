import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { Grid, Button, TextField, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import axiosWithAuth from '../utils/axiosWithAuth';
import theme from '../theme';

const useStyles = makeStyles({
	container: {
		backgroundColor: 'lightgray',
		width: '20%',
		borderRadius: '50px',
		margin: '0 auto',
		padding: '2rem 0',
		border: '1px solid green',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',

		[theme.breakpoints.down('md')]: {
			width: '50%',
		},
		[theme.breakpoints.down('sm')]: {
			width: '90%',
		},
	},
});

function RegistrationForm() {
	const classes = useStyles();
	const { push } = useHistory();
	// Form Control State & Initial Data
	const initialState = {
		username: '',
		password: '',
		email: '',
	};

	const [formState, setFormState] = useState(initialState);
	const [buttonDisabled, setButtonDisabled] = useState(true);
	const [error, setError] = useState('')
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
		const newState = {
			username: formState.username,
			password: formState.password,
			email: formState.email,
		};
		axiosWithAuth()
			.post('/auth/register', newState)
			.then((res) => {
				setError('');
				localStorage.setItem('token', res.data.payload);
				console.log('register Successful!', res);
				push('/');
			})
			.catch((err) => {
				console.log('register error', err.response);
				setError(err.response.data.message);
				if(err.response.data.err==='insert into "users" ("email", "password", "username") values ($1, $2, $3) - duplicate key value violates unique constraint "users_username_unique"'){
					setError("Sorry, a user with that name already exists");
				}
				if(err.response.data.err==='insert into "users" ("email", "password", "username") values ($1, $2, $3) - duplicate key value violates unique constraint "users_email_unique"'){
					setError("Sorry, that email is already used");
				}
					

			});

		//console.log(formState);
		setFormState(initialState);
	}

	// Validation
	const [errors, setErrors] = useState(initialState);

	// Define Form Schema
	const formSchema = yup.object().shape({
		username: yup
			.string()
			.min(8, 'Must be at least 8 characters')
			.required('Username required!'),
		password: yup
			.string()
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
				'Minimum 8 characters, Upper and Lowercase and at least 1 number'
			)
			.required('Password required!'),
		email: yup.string().email('Email not Valid').required('Email required!'),
	});

	// Check for proper form entry
	useEffect(() => {
		formSchema.isValid(formState).then((isFormValid) => {
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
				className={classes.container}
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
						type='email'
						id='email'
						name='email'
						value={formState.email}
						onChange={handleChange}
						label='Email:'
						error={errors.email ? true : false}
						helperText={errors.email ? errors.email : null}
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
						startIcon={<AccessibilityNewIcon />}
					>
						Sign Up!
					</Button>
				</Grid>
				<Grid item className={classes.works}>
				{(error !== '') ? (
				<Paper className={classes.worksText}>
					<Typography variant='subtitle1' color='initial' align='center'>
						{error}
					</Typography>
				</Paper>) : null}
				</Grid>
			</Grid>
		</form>
	);
}

export default RegistrationForm;
