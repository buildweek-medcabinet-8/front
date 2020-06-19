import React from 'react';
import './App.css';
import LoginForm from './components/Login';
import StrainSearch from './components/StrainSearch';

function App() {
	return (
		<div className='App'>
			<h1>Med Cabinet App</h1>
			{/* <LoginForm /> */}
			<StrainSearch />
		</div>
	);
}

export default App;
