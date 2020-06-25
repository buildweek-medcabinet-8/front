import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import NavMenu from './NavMenu';
import LogoutSwitch from './Logout';

const useStyles = makeStyles(() => ({
	whiteText: {
		color: '#fff',
	},
	title: {
		flexGrow: 1,
	},
	appbar: {
		display: 'flex',
		justifyContent: 'space-around',
	},
}));

function Navbar({ checked, setChecked }) {
	const classes = useStyles();
	return (
		<React.Fragment>
			<AppBar
				position='fixed'
				className={clsx(classes.appbar, classes.whiteText)}
			>
				<Toolbar>
					{checked === true ? <NavMenu /> : null}
					<Typography variant='h5' component='span' className={classes.title}>
						Med-Cabinet
					</Typography>
					{checked ? (
						<LogoutSwitch checked={checked} setChecked={setChecked} />
					) : null}
					{!checked ? (
						<Grid item>
							<Button
								variant='contained'
								color='secondary'
								component={Link}
								to='/register'
							>
								Sign Up!
							</Button>
						</Grid>
					) : null}
				</Toolbar>
			</AppBar>
			<Toolbar />
		</React.Fragment>
	);
}

export default Navbar;
