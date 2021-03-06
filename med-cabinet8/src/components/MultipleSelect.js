import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		maxWidth: 300,
	},
	chips: {
		display: 'flex',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		flexDirection: 'column',
	},
	chip: {
		margin: 1,
	},
	noLabel: {
		marginTop: theme.spacing(3),
	},
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

function getStyles(item, value, theme) {
	return {
		fontWeight:
			value.indexOf(item) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}

export default function MultipleSelect(props) {
	const classes = useStyles();
	const theme = useTheme();

	return (
		<FormControl className={classes.formControl}>
			<InputLabel id={props.inputLabel}>{props.inputLabel}</InputLabel>
			<Select
				labelId={props.labelId}
				id={props.id}
				multiple
				value={props.value}
				onChange={props.handleChange}
				input={<Input id={props.inputId} />}
				renderValue={(selected) => (
					<div className={classes.chips}>
						{selected.map((value) => (
							<Chip
								key={value}
								label={value}
								className={classes.chip}
								size='small'
								variant='outlined'
							/>
						))}
					</div>
				)}
				MenuProps={MenuProps}
			>
				{props.items.map((item) => (
					<MenuItem
						key={item}
						value={item}
						name={props.name}
						style={getStyles(item, props.value, theme)}
					>
						{item}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}
