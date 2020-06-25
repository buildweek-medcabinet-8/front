import React from 'react';
import logo from '../img/Medical-marijuana-logo.png';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import theme from '../theme';

const useStyles = makeStyles({
	div: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		margin: '3rem auto',
		backgroundColor: 'lightgray',
		width: '100%',
		borderRadius: '75px',
		opacity: '.65',
		[theme.breakpoints.down('md')]: {
			flexDirection: 'column',
		},
	},
	img: {
		maxWidth: '100%',
	},
	text: {
		marginLeft: '3rem',
		[theme.breakpoints.down('md')]: {
			marginLeft: 0,
		},
	},
});

function Logo() {
	const classes = useStyles();
	return (
		<div className={classes.div}>
			<Typography variant='h1' color='primary' className={classes.text}>
				Med-Cabinet
			</Typography>
			<img src={logo} className={classes.img} alt='logo' />
		</div>
	);
}

export default Logo;
