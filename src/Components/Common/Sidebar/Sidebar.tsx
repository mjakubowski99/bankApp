import { Box, Button, Divider, Drawer, Link, List, ListItem, ListItemText } from '@mui/material';
import React from 'react';
import { makeStyles } from '@mui/styles';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { LinkElementWithIcon } from '../../../interfaces/common';
import { navigationDataWithIcons } from '../../../Services/Navigation';

const useStyles = makeStyles({
    paper:{
        backgroundColor: "white"
    }
})

export default function Sidebar(props: any){
    const classes = useStyles();

    return (
        <Drawer anchor="left" open={props.active} onClose={props.toggleSidebarActive} classes={{ paper: classes.paper }}>
            <Box role="presentation">
                <List>
                    <ListItem>
                        <h2>BankPol</h2>
                    </ListItem>
                    <Divider/>
                    {navigationDataWithIcons.map((item: LinkElementWithIcon, index: number) => (
                        <div>
                            <ListItem button key={index}>
                                {item.icon}
                                <Link href={item.href} underline="none">{item.name}</Link>
                            </ListItem>
                            <Divider/>
                        </div>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
}