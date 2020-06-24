import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
	appBar: {
		top: 'auto',
		bottom: 0,
	},
	footerText: {
		color: '#fff',
	},
	toolBar: {
		display: 'flex',
		justifyContent: 'center',
	},
}));

export default function Footer() {
	const classes = useStyles();

	return (
		<React.Fragment>
			<AppBar position='fixed' color='primary' className={classes.appBar}>
				<Toolbar className={classes.toolBar}>
					<Typography
						variant='h5'
						component='h5'
						align='center'
						className={classes.footerText}
					>
						&copy; 2020 Lambda Build Week
					</Typography>
				</Toolbar>
			</AppBar>
			<Toolbar />
		</React.Fragment>
	);
}
