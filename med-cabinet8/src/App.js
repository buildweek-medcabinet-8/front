import React, { useState } from 'react';
import './App.css';
//import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider, makeStyles } from '@material-ui/core';
import { Container, Typography } from '@material-ui/core';
import theme from './theme';

import LoginForm from './components/Login';
import Preferences from './components/Preferences';
import Registration from './components/Registration';
import PrivateRoute from './components/PrivateRoute';
import Profile from './components/Profile';
import Recommendations from './components/Recommendations';
import Navbar from './components/Navbar';
import StrainSearch from './components/StrainSearch';

const useStyles = makeStyles({
	app: {
		backgroundColor: '#ddd',
		backgroundImage:
			'url(https://objective-shirley-f61587.netlify.app/images/home.jpg)',
		backgroundAttachment: 'fixed',
		backgroundSize: 'cover',
		backgroundBlendMode: 'screen',
		minHeight: '100vh',
		minWidth: '100vw',
	},
	header: {
		margin: '4rem 0',
	},
});

function App() {
	const classes = useStyles();
	const [checked, setChecked] = useState(false);
	const login = 'true';
	return (
		<Router>
			<ThemeProvider theme={theme}>
				<div className={classes.app}>
					<Container>
						<Navbar checked={checked} setChecked={setChecked} login={login} />
						<Typography variant='h1' align='center' className={classes.header}>
							Med Cabinet App
						</Typography>
						<Route exact path='/'>
							<LoginForm setChecked={setChecked} />
						</Route>
						<Route path='/register' component={Registration} />
						<PrivateRoute path='/med-cabinet' component={StrainSearch} />
						<PrivateRoute path='/settings' component={Preferences} />
						<PrivateRoute path='/profile' component={Profile} />
						<PrivateRoute path='/recommendations' component={Recommendations} />
					</Container>
				</div>
			</ThemeProvider>
		</Router>
	);
}

export default App;
