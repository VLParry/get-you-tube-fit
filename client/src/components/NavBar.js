import React from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';



const NavBar = ( {loggedIn, handleLogout} ) => {
  // const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuEl, setMenuEl] = React.useState(null);
  const {user, setUser} = useUserContext()
  const navigate = useNavigate();


  const handleChange = (event) => {
    if (loggedIn){
      handleLogout();
      navigate('/login')
    } else {
      navigate('/login')
    }
   
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNav = (event) => {
    setMenuEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavClose = () => {
    setMenuEl(null);
  };
  return (

    <Box sx={{ flexGrow: 1 }}>
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            checked={loggedIn}
            onChange={handleChange}
            aria-label="login switch"
          />
        }
        label={loggedIn ? 'Logout' : 'Login'}
      />
    </FormGroup>
    <AppBar sx={{ bgcolor: "red" }} position="static">
      <Toolbar>
        <div>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleNav}
        >
          <MenuIcon  />
        </IconButton>
        <Menu
              id="menu-appbar"
              anchorEl={menuEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(menuEl)}
              onClose={handleNavClose}
            >
              
              <MenuItem to="workouts" component= { Link }>All Workouts</MenuItem>
              {/* <MenuItem to="createActivity" component= { Link }>Create New Activity</MenuItem> */}
              
            </Menu>
        </div>
        <Typography variant="h6" color="inherit" to="/" component= { Link } sx={{ flexGrow: 1 }}>
          Get You(tube) Fit!
        </Typography>
        {loggedIn && (
          <div>
            <span>Hi, {user.name}!</span>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem to="myWorkouts" component= {Link}>My Workouts</MenuItem>

            </Menu>
          </div>
        )}
      </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar
