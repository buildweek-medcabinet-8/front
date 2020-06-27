import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { Grid, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import Logo from './Logo';
import axiosWithAuth from '../utils/axiosWithAuth';
import theme from '../theme';

const useStyles = makeStyles({
	whiteText: {
		color: 'white',
	},
	container: {
		[theme.breakpoints.down('md')]: {
			flexDirection: 'column-reverse',
		},
	},
});

function LoginForm({ setChecked, setUsername }) {
	const { push } = useHistory();
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
	const [errors, setErrors] = useState(initialState);
	// Form Submission Handling
	function handleSubmit(e) {
		e.preventDefault();
		axiosWithAuth()
			.post('/auth/login', formState)
			.then((res) => {
				setUsername(res.data.user.username);
				setChecked(true);
				localStorage.setItem('token', res.data.token);
				localStorage.setItem('login', true);
				console.log('login successful! Welcome', res.data.user.username);
				push('/med-cabinet');
			})
			.catch((err) => {
				console.log('login error', err.response);
				setErrors({ ...errors, loginFail: err.response.data.message });
				setFormState(initialState);
			});
	}

	// Validation

	const formSchema = yup.object().shape({
		username: yup.string().required('Username required!'),
		password: yup.string().required('Password required!'),
	});

	useEffect(() => {
		formSchema.isValid(formState).then((isFormValid) => {
			//	console.log(isFormValid);
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

	return (
		<Grid
			container
			spacing={1}
			direction='row'
			justify='space-between'
			alignItems='center'
			alignContent='center'
			wrap='nowrap'
			className={classes.container}
		>
			<Grid item className={classes.formContainer}>
				<form onSubmit={handleSubmit}>
					<Grid
						item
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
								className={classes.whiteText}
								disabled={buttonDisabled}
								startIcon={<LockOpenOutlinedIcon />}
							>
								Login
							</Button>
						</Grid>
						<p className='error'>
							{errors.loginFail ? errors.loginFail : null}
						</p>
					</Grid>
				</form>
			</Grid>
			<Grid item>
				<Logo />
			</Grid>
		</Grid>
	);
}

export default LoginForm;
