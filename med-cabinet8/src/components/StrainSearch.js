import React, { useState } from 'react';
import Board from 'react-trello';
import { useHistory } from 'react-router-dom';
import dataFlavors from '../data/dataFlavors.json';
import dataEffects from '../data/dataEffects.json';
import { Button, TextField, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import axiosWithAuth from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
	gridItem: {
		marginBottom: '3rem',
		// width: '90%',
	},
});

function StrainSearch() {
	const classes = useStyles();
	const [formState, setFormState] = useState({
		flavors: [],
		effects: [],
		description: '',
	});

	function flavorChange(fromLaneId, toLaneId, cardId, index) {
		// console.log(fromLaneId, toLaneId, cardId, index);
		if (formState.flavors.indexOf(cardId) === -1 && fromLaneId === 'FLAVORS') {
			setFormState({ ...formState, flavors: [...formState.flavors, cardId] });
			console.log(cardId, 'added');
		} else if (fromLaneId === 'MYFLAVORS') {
			setFormState({
				...formState,
				flavors: [formState.flavors.filter((item) => item !== cardId)],
			});
			console.log(cardId, 'deleted');
		}
	}

	function effectChange(fromLaneId, toLaneId, cardId, index) {
		// console.log(fromLaneId, toLaneId, cardId, index);
		if (formState.effects.indexOf(cardId) === -1 && fromLaneId === 'EFFECTS') {
			setFormState({ ...formState, effects: [...formState.effects, cardId] });
			console.log(cardId, 'added');
		} else if (fromLaneId === 'MYEFFECTS') {
			setFormState({
				...formState,
				effects: [formState.effects.filter((item) => item !== cardId)],
			});
			console.log(cardId, 'deleted');
		}
	}

	function handleChange(e) {
		e.persist();

		const newFormData = {
			...formState,
			[e.target.name]: e.target.value,
		};
		setFormState(newFormData);
	}
	const { push } = useHistory();

	function handleSubmit(e) {
		e.preventDefault();

		axiosWithAuth()
			.put('/profile/update-preferences', formState)
			.then((res) => {
				console.log(res);
				push('/recommendations');
			})
			.catch((err) => {
				// console.log(err);
				console.log(err.message);
			});
	}

	return (
		<form onSubmit={(e) => handleSubmit(e)}>
			<Grid container direction='column' alignItems='center' justify='center'>
				<Grid item className={classes.gridItem}>
					<Board
						style={{ maxWidth: '100%', display: 'flex', flexWrap: 'wrap' }}
						laneStyle={{ width: '48%', height: '100%' }}
						data={dataFlavors}
						draggable
						laneDraggable={false}
						hideCardDeleteIcon
						onCardMoveAcrossLanes={(fromLaneId, toLaneId, cardId, index) =>
							flavorChange(fromLaneId, toLaneId, cardId, index)
						}
					/>
				</Grid>

				<Grid item className={classes.gridItem}>
					<Board
						style={{
							maxWidth: '100%',
							display: 'flex',
							flexWrap: 'wrap',
							backgroundColor: 'green',
						}}
						laneStyle={{ width: '48%', height: '100%' }}
						data={dataEffects}
						draggable
						laneDraggable={false}
						hideCardDeleteIcon
						onCardMoveAcrossLanes={(fromLaneId, toLaneId, cardId, index) =>
							effectChange(fromLaneId, toLaneId, cardId, index)
						}
					/>
				</Grid>

				<Grid item className={classes.gridItem}>
					<TextField
						label='Description'
						value={formState.description}
						onChange={handleChange}
						id='description'
						name='description'
						placeholder='Description'
						variant='outlined'
					/>
				</Grid>
				<Grid item className={classes.gridItem}>
					<Button type='submit' variant='contained' color='primary' fullWidth>
						Submit
					</Button>
				</Grid>
			</Grid>
		</form>
	);
}

export default StrainSearch;
