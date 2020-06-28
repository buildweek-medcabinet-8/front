import React, { useState } from 'react';
// import './App.css';
//import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider, makeStyles } from '@material-ui/core';
import { Container } from '@material-ui/core';
import theme from './theme';

import LoginForm from './components/Login';
import Registration from './components/Registration';
import PrivateRoute from './components/PrivateRoute';
import Welcome from './components/Welcome';
import Settings from './components/Settings';
import Recommendations from './components/Recommendations';
import Navbar from './components/Navbar';
import StrainSearch from './components/StrainSearchOld';
import Footer from './components/Footer';
import splash from './img/splash.jpg';

const useStyles = makeStyles({
	app: {
		backgroundColor: '#ddd',
		backgroundImage: `url(${splash})`,
		backgroundAttachment: 'fixed',
		backgroundSize: 'cover',
		backgroundBlendMode: 'screen',
		minHeight: '100vh',
		minWidth: '100vw',
	},
	header: {
		margin: '4rem auto',
	},
	container: {
		minHeight: '100%',
		display: 'flex,',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

function App() {
	const classes = useStyles();
	const [username, setUsername] = useState('');
	const [checked, setChecked] = useState(
		Boolean(localStorage.getItem('login'))
	);

	return (
		<Router>
			<ThemeProvider theme={theme}>
				<div className={classes.app}>
					<Container className={classes.container}>
						<Navbar checked={checked} setChecked={setChecked} />
						<Route exact path='/'>
							<LoginForm setChecked={setChecked} checked={checked} setUsername={setUsername} />
						</Route>
						<Route path='/register' component={Registration} />
						<PrivateRoute
							path='/med-cabinet'
							component={Welcome}
							username={username}
						/>
						<PrivateRoute path='/strain' component={StrainSearch} />
						<PrivateRoute path='/settings' component={Settings} />

						<PrivateRoute path='/recommendations' component={Recommendations} />
					</Container>
					<Footer />
				</div>
			</ThemeProvider>
		</Router>
	);
}

export default App;
