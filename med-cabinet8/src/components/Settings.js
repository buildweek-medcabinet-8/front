import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axiosWithAuth from '../utils/axiosWithAuth';
import { TextField, Grid, Button } from '@material-ui/core';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
	container: {
		backgroundColor: 'lightgray',
		width: '40%',
		height: '40%',
		borderRadius: '30px',
		margin: '0 auto',
		padding: '2rem 0',
		border: '1px solid green',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	},
	password: {
		marginBottom: '2rem',
	},
});

export const Profile = () => {
	const classes = useStyles();
	const { push } = useHistory();
	// eslint-disable-next-line
	const [password, setPassword] = useState({ password: '' });
	const [errors, setErrors] = useState({
		password: '',
	});
	const [buttonDisabled, setButtonDisabled] = useState(true);

	// Define Form Schema
	const formSchema = yup.object().shape({
		password: yup
			.string()
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
				'Minimum 8 characters, Upper and Lowercase and at least 1 number'
			)
			.required('Password required!'),
	});

	// Check for proper form entry
	useEffect(() => {
		formSchema.isValid(password).then((isFormValid) => {
			setButtonDisabled(!isFormValid);
		});
	}, [password, formSchema]);

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

	const deleteUser = () => {
		axiosWithAuth()
			.delete('/profile/delete-user')
			.then((res) => {
				console.log(res.data);
				localStorage.removeItem('token');
				localStorage.removeItem('login');
				push('/');
			})
			.catch((err) =>
				console.error('ea: Profile.js: delete-user: err.message: ', err.results)
			);
	};
	// eslint-disable-next-line
	const changePassword = (e) => {
		e.preventDefault();
		// const pWord = { password: password };
		axiosWithAuth()
			.put('/profile/change-password', password)
			.then((res) => {
				console.log('success', res);
				localStorage.removeItem('token');
				localStorage.removeItem('login');
				push('/');
			})
			.catch((err) =>
				console.error(
					'ea: Profile.js: chg-password: err.message: ',
					err.results
				)
			);
	};

	const handleChange = (e) => {
		e.persist();
		validateChange(e);
		setPassword({ password: e.target.value });
	};
	return (
		<Grid
			container
			direction='column'
			alignItems='center'
			justify='space-between'
			// alignContent='space-evenly'
			className={classes.container}
		>
			<Grid item>
				<form onSubmit={changePassword}>
					<TextField
						fullWidth
						className={classes.password}
						variant='outlined'
						type='password'
						id='password'
						name='password'
						value={password.password}
						onChange={handleChange}
						label='New Password:'
						error={errors.password ? true : false}
						helperText={errors.password ? errors.password : null}
					/>
					<Button
						type='submit'
						variant='contained'
						color='secondary'
						fullWidth
						disabled={buttonDisabled}
					>
						Change Password
					</Button>
				</form>
			</Grid>
			<Grid item>
				<Button variant='contained' color='primary' onClick={deleteUser}>
					Delete Profile
				</Button>
			</Grid>
		</Grid>
	);
};

export default Profile;
