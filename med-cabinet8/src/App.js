import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginForm from './components/Login';
import Preferences from './components/Preferences';
import Registration from './components/Registration';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import StrainSearch from './components/StrainSearch';

function App() {
	return (
		<Router>
			<div className='App'>
				<Navbar />
				<h1>Med Cabinet App</h1>
				<Route exact path='/' component={LoginForm} />
				<Route path='/register' component={Registration} />
				<PrivateRoute path='/med-cabinet' component={StrainSearch} />
				<PrivateRoute path='/settings' component={Preferences} />
			</div>
		</Router>
	);
}

export default App;
