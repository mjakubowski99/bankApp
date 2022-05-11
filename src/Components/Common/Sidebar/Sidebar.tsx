import { Box, Button, Divider, Drawer, List, ListItem, ListItemText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { makeStyles } from '@mui/styles';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const useStyles = makeStyles({
    paper:{
        backgroundColor: "white"
    }
})

export default function Sidebar(props: any){
    const classes = useStyles();

    const fields = [
        {
            text: "Start",
            icon: <PlayArrowIcon />
        },
        {
            text: "Przelewy",
            icon: <AttachMoneyIcon/>
        },
        {
            text: "Moje konto",
            icon: <AccountCircleIcon/>
        }
    ];

    return (
        <Drawer anchor="left" open={props.active} onClose={props.toggleSidebarActive} classes={{ paper: classes.paper }}>
            <Box role="presentation">
                <List>
                    <ListItem>
                        <h2>BankPol</h2>
                    </ListItem>
                    <Divider/>
                    {fields.map((field, index) => (
                        <div>
                            <ListItem button key={field.text}>
                                {field.icon}
                                <ListItemText primary={field.text} />
                            </ListItem>
                            <Divider/>
                        </div>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
}