import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavMenu from './NavMenu';

const useStyles = makeStyles(() => ({
	root: {
		flexGrow: 1,
	},
	title: {
		flexGrow: 1,
	},
	appbar: {
		display: 'flex',
		justifyContent: 'space-around',
	},
}));

function Navbar({login}) {
	const classes = useStyles();
	return (
		<React.Fragment>
			<AppBar position='sticky' className={classes.appbar}>
				<Toolbar>
					{(login) ? <NavMenu /> : null}
					<Typography variant='h5' component='span' className={classes.title}>
						Med-Cabinet
					</Typography>
				</Toolbar>
			</AppBar>
			<Toolbar />
		</React.Fragment>
	);
}

export default Navbar;
