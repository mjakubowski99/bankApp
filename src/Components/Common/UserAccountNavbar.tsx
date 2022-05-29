import { AppBar, IconButton, Toolbar, Typography, Button, Link } from '@mui/material';
import { red } from '@mui/material/colors';
import React from 'react';
import { navigationData } from '../../Services/Navigation';

interface LinkElement{
    href: string,
    name: string
}

function UserAccountNavbar(){

    const navItems = navigationData.map((item: LinkElement, index) => {
        return (
            <Link href={item.href} key={index} sx={{mx: 2}} variant="inherit" underline="none" color={red[50]}>
                {item.name}
            </Link>
        );
    });

    return (
        <AppBar position="static">
            <Toolbar>
                {navItems}
            </Toolbar>
        </AppBar>
    );
}

export default UserAccountNavbar;