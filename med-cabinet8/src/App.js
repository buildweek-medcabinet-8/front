import React, { useState, useEffect } from 'react';
import './App.css';
//import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider, makeStyles } from '@material-ui/core';
import { Container } from '@material-ui/core';
import theme from './theme';

import LoginForm from './components/Login';
import Loading from './components/LoadingPage';
import Preferences from './components/Preferences';
import Registration from './components/Registration';
import PrivateRoute from './components/PrivateRoute';
import Welcome from './components/Welcome';
import Profile from './components/Profile';
import Recommendations from './components/Recommendations';
import Navbar from './components/Navbar';
import StrainSearch from './components/StrainSearchOld';
import Footer from './components/Footer';

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
  const [username, setUsername] = useState('')
	const [checked, setChecked] = useState(Boolean(localStorage.getItem("login")));
  const [displayStatus, setDisplayStatus] = useState({
    visibility: "hidden",
    opacity: 0,
  });
  function showImage() {
    //alter state var for new css display rule
   setTimeout(setDisplayStatus({
      visibility: "visible",
      opacity: 1,
    }), 1000);
  }
  useEffect(() => {
    showImage();
  }, []);

  if (displayStatus.visibility === "hidden"){
    return (<Loading />)
  }
	return (
		<Router>
			<ThemeProvider theme={theme}>
				<div className={classes.app}>
					<Container>
						<Navbar checked={checked} setChecked={setChecked}  />
						<Route exact path='/'>
							<LoginForm setChecked={setChecked} setUsername={setUsername} />
						</Route>
						<Route path='/register' component={Registration} />
						<PrivateRoute path='/med-cabinet' component={Welcome} username={username}/>
						<PrivateRoute path='/strain' component={StrainSearch} />
						<PrivateRoute path='/settings' component={Preferences} />
						<PrivateRoute path='/profile' component={Profile} />
						<PrivateRoute path='/recommendations' component={Recommendations} />
					</Container>
					<Footer />
				</div>
			</ThemeProvider>
		</Router>
	);
}

export default App;
