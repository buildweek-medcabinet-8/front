import React from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';

const useStyles = makeStyles({
	'@keyframes loading': {
		'0%': {
			color: '#fff',
		},
		'90%': {
			color: '##fff',
			textShadow: '0px 100px 100px #fff',
		},
		'100%': {
			color: '#517d23',
			textShadow: '0 5px 50px #ccc',
		},
	},
	ul: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		margin: 0,
		padding: 0,
		display: 'flex',
	},
	li: {
		listStyle: 'none',
		color: 'rgba(255, 255, 255, .3)',
		letterSpacing: 12,
		animation: '$loading 2s ease-in-out 0s infinite',
		fontSize: '8rem',
	},
	div: {
		margin: 0,
		padding: 0,
		backgroundColor: 'black',
		height: '100vh',
		width: '100vw',
	},

	l: {
		animationDelay: '.2s',
	},
	o: {
		animationDelay: '.4s',
	},
	a: {
		animationDelay: '.6s',
	},
	d: {
		animationDelay: '.8s',
	},
	i: {
		animationDelay: '1s',
	},
	n: {
		animationDelay: '1.2s',
	},
	g: {
		animationDelay: '1.4s',
	},
});

function Smoke() {
	const classes = useStyles();
	return (
		<div className={classes.div}>
			<ul className={classes.ul}>
				<li className={clsx(classes.li, classes.l)}>L</li>
				<li className={clsx(classes.li, classes.o)}>O</li>
				<li className={clsx(classes.li, classes.a)}>A</li>
				<li className={clsx(classes.li, classes.d)}>D</li>
				<li className={clsx(classes.li, classes.i)}>I</li>
				<li className={clsx(classes.li, classes.n)}>N</li>
				<li className={clsx(classes.li, classes.g)}>G</li>
			</ul>
		</div>
	);
}

export default Smoke;
