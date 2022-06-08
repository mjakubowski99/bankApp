import {List} from "@mui/material";
import React from "react";
import Contact from "./Contact";

const ContactList = ({contacts} :any) => {

    return(
        <List  className={"contact-list"}>

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