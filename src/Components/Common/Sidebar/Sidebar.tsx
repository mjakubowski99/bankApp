import { Box, Button, Divider, Drawer, List, ListItem, ListItemText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

export default function Sidebar(props: any){
    return (
        <Drawer anchor="left" open={props.active} onClose={props.toggleSidebarActive}>
            <Box role="presentation">
                <List>
                    {['Start', 'Stan konta', 'Przelewy'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
}