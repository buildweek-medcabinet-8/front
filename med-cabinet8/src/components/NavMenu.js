import React, { useState } from 'react';
import { Menu, MenuItem, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

export default function SimpleMenu() {
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<React.Fragment>
			<IconButton
				edge='start'
				onClick={handleClick}
				aria-controls='simple-menu'
				aria-haspopup='true'
			>
				<MenuIcon />
			</IconButton>

			<Menu
				id='simple-menu'
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={handleClose}>
					<Link to='/profile'>Profile</Link>
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<Link to='/settings'>Settings</Link>
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<Link to='/recommendations'>Recommendations</Link>
				</MenuItem>
			</Menu>
		</React.Fragment>
	);
}
