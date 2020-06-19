import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginForm from './components/Login';
import Registration from './components/Registration';
import PrivateRoute from './components/PrivateRoute';
import Secure from './components/Secure';


function App() {
	return (
		<Router>
		<div className='App'>
		<h1>Med Cabinet App</h1>
		<Route exact path="/" component={LoginForm} />
		<Route path="/register" component={Registration} />
		<PrivateRoute path="/med-cabinet" component={Secure} />

		</div>
		</Router>
	);
}

export default App;
