import { AppBar, IconButton, Toolbar, Typography, Button, Link } from '@mui/material';
import React from 'react';

function UserAccountNavbar(){
    return (
    <AppBar position="static">
    <Toolbar>
    <Typography variant="subtitle2" component="div" sx={{ mx: 2 }}>
        Start
    </Typography>
    <Typography variant="subtitle2" component="div" sx={{ mx: 2 }}>
        Przelewy
    </Typography>
    <Typography variant="subtitle2" component="div" sx={{ mx: 2 }}>
        Stan konta
    </Typography>
    </Toolbar>
  </AppBar>)
}

export default UserAccountNavbar;