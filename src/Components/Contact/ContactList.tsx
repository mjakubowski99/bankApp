import {Avatar, Button, Card, CardContent, Divider, Grid, List, ListItem, Typography} from "@mui/material";
import React from "react";
import Contact from "./Contact";

const ContactList = ({contacts} :any) => {

    return(
        <List>

            {contacts.map((contact:any) => (
                <Contact
                    key={contact.username}
                    contact={contact}
                />
            ))}
        </List>
    )
}

export default ContactList