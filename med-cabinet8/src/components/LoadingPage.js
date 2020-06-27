import React from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';

const useStyles = makeStyles({
	'@keyframes loading': {
		'0%': {
			color: '#3a5240',
		},
		'50%': {
			color: '#466e50',
			textShadow: '0px 100px 100px #000',
		},
		'100%': {
			color: '#517d23',
			textShadow: '0 5px 50px #000',
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
		color: 'rgba(122, 230, 150, .3)',
		letterSpacing: 12,
		animation: '$loading 1s ease-in-out 0s infinite',
		fontSize: '8rem',
	},
	div: {
		margin: 0,
		padding: 0,
		backgroundColor: 'black',
		height: '100%',
		width: '100%',
	},

	l: {
		animationDelay: '.1s',
	},
	o: {
		animationDelay: '.2s',
	},
	a: {
		animationDelay: '.3s',
	},
	d: {
		animationDelay: '.4s',
	},
	i: {
		animationDelay: '.5s',
	},
	n: {
		animationDelay: '.6s',
	},
	g: {
		animationDelay: '.7s',
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
