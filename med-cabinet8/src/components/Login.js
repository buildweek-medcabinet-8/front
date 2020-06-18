import React, { useState, useEffect } from 'react';
import * as yup from 'yup';

function LoginForm() {
	//Form Control State & Initial Data
	const initialState = {
		username: '',
		password: '',
	};

	const [formState, setFormState] = useState(initialState);
	const [buttonDisabled, setButtonDisabled] = useState(true);

	function handleChange(e) {
		e.persist();
		const newFormState = {
			...formState,
			[e.target.name]: e.target.value,
		};
		validateChange(e);
		setFormState(newFormState);
	}

	function handleSubmit(e) {
		e.preventDefault();
		console.log(formState);
		setFormState(initialState);
	}

	//Validation
	const [errors, setErrors] = useState({
		username: '',
		password: '',
	});

	const formSchema = yup.object().shape({
		username: yup.string().required('Username is required to Login!'),
		password: yup.string().required('Password required to login'),
	});

	useEffect(() => {
		formSchema.isValid(formState).then((isFormValid) => {
			console.log(isFormValid);
			setButtonDisabled(!isFormValid);
		});
	}, [formState]);

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
		<React.Fragment>
			<form onSubmit={handleSubmit}>
				<label htmlFor='username'>Username:</label>
				<input
					type='text'
					id='username'
					name='username'
					value={formState.username}
					onChange={handleChange}
				/>
				{errors.username && <span>{errors.username}</span>}

				<label htmlFor='password'>Password:</label>
				<input
					type='password'
					id='password'
					name='password'
					value={formState.password}
					onChange={handleChange}
				/>
				{errors.password && <span>{errors.password}</span>}

				<button type='submit' disabled={buttonDisabled}>
					Login
				</button>
			</form>
		</React.Fragment>
	);
}

export default LoginForm;
