import React from 'react';
import './App.css';
//import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginForm from './components/Login';
import Preferences from './components/Preferences';
import Registration from './components/Registration';
import PrivateRoute from './components/PrivateRoute';
import Recommendations from './components/Recommendations';
import Navbar from './components/Navbar';
import StrainSearch from './components/StrainSearch';


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
		</Router>
	);
}

export default App;
