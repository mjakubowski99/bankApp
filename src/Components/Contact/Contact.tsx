import {Avatar, ListItem} from "@mui/material";
import { FcMoneyTransfer } from "react-icons/fc";
import {IoTrashBin} from "react-icons/io5";
import {GrEdit} from "react-icons/gr";

import React  from "react";
import {Link} from "react-router-dom";
import AuthFetchService from "../../Services/AuthFetchService";
import {toast, ToastContainer} from "react-toastify";


const deleteContact = (username : string) =>
{

    return AuthFetchService.authenticatedApiFetch({
        url: '/contacts/'+username,
        method: 'DELETE',
        additionalHeaders: {},
        params: JSON.stringify("")
    });

}


const Contact = ({ contact } : any) => {

    const onDelete = (username :string, customName :string) => {

        if(window.confirm("Czy napewno chcesz usunąć kontakt "+ customName +" ?"))
        {
            deleteContact(username)
                .then( (data) => {
                    if( data.status === 404 ){
                        alert("Nieoczekiwany problem spróbuj ponownie później");
                    }
                    else
                    {
                        toast("Pomyślnie usunięto kontakt");
                        setTimeout(function () { (window.location.reload()) }, 1500);
                    }


                })
        }

    }


    return(
        <ListItem>
            <ToastContainer />
            <Avatar/>
            <div className={"contact"}> {contact.customName}

                <Link to={`/transactions/create` } state={{username:contact.username}}  >
                    <FcMoneyTransfer className={"icon"} style={{cursor: 'pointer'}} />
                </Link>
                <GrEdit className={"icon"} style={{cursor: 'pointer'}} />
                <IoTrashBin className={"icon"} style={{color:'red', cursor: 'pointer'}} onClick={() => onDelete(contact.username, contact.customName)}/>


            </div>
        </ListItem>
    )

}

export default Contact