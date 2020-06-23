import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavMenu from './NavMenu';
import LogoutSwitch from './Logout';

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

function Navbar({ checked, setChecked, login }) {
	const classes = useStyles();
	return (
		<React.Fragment>
			<AppBar position='fixed' className={classes.appbar}>
				<Toolbar>
					{(login) ? <NavMenu /> : null}
					<Typography variant='h5' component='span' className={classes.title}>
						Med-Cabinet
					</Typography>
					{(login) ?<LogoutSwitch checked={checked} setChecked={setChecked} /> : null}
					{(!login) ? 				<Grid item>
					<Button
						variant='outlined'
						color='secondary'
						component={Link}
						to='/register'
					>
						Sign Up!
					</Button>
				</Grid> : null}
				</Toolbar>
			</AppBar>
			<Toolbar />
		</React.Fragment>
	);
}

export default Navbar;
