import React, { useState } from 'react';
import { Menu, MenuItem, IconButton, Button } from '@material-ui/core';
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
					<Button component={Link} to='/profile'>
						Profile
					</Button>
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<Button component={Link} to='/settings'>
						Settings
					</Button>
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<Button component={Link} to='/recommendations'>
						Recommendations
					</Button>
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<Button component={Link} to='/med-cabinet'>
						Set Strain Preferences
					</Button>
				</MenuItem>
			</Menu>
		</React.Fragment>
	);
}
