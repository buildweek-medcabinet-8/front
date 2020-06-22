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
import Recommendations from './components/Recommendations';
import Navbar from './components/Navbar';
import StrainSearch from './components/StrainSearch';

<<<<<<< HEAD
const useStyles = makeStyles({
	app: {
		backgroundColor: '#ddd',
		backgroundImage:
			' url(https://objective-shirley-f61587.netlify.app/images/home.jpg)',
		backgroundAttachment: 'fixed',
		backgroundSize: 'cover',
		backgroundBlendMode: 'screen',
		height: '200vh',
		width: '100vw',
	},
	header: {
		margin: '4rem 0',
	},
});

function App() {
	const classes = useStyles();
	const [checked, setChecked] = useState(false);

	return (
		<Router>
			<ThemeProvider theme={theme}>
				<div className={classes.app}>
					<Container>
						<Navbar checked={checked} setChecked={setChecked} />
						<Typography variant='h1' align='center' className={classes.header}>
							Med Cabinet App
						</Typography>
						{/* <Route exact path='/' component={LoginForm} /> */}
						<Route exact path='/'>
							<LoginForm setChecked={setChecked} />
						</Route>
						<Route path='/register' component={Registration} />
						<PrivateRoute path='/med-cabinet' component={StrainSearch} />
						<PrivateRoute path='/settings' component={Preferences} />
					</Container>
				</div>
			</ThemeProvider>
=======

function App() {
	//state objects needed in app
	const login = 'true';
	return (
		<Router>
			<div className={(login === 'true') ? 'App' : 'App splash'}>
				<Navbar login={login}/>
				<Route exact path='/' component={LoginForm} />
				<Route path='/register' component={Registration} />
				<PrivateRoute path='/med-cabinet' component={StrainSearch} />
				<PrivateRoute path='/settings' component={Preferences} />
                <PrivateRoute path='/recommendations' component={Recommendations} />
			</div>
>>>>>>> 5296e2d2f51d7492d209543d6d747cfdf42e4ca2
		</Router>
	);
}

export default App;
