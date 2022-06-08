import {Avatar, Button, ListItem, TextField} from "@mui/material";
import { FcMoneyTransfer } from "react-icons/fc";
import {IoTrashBin} from "react-icons/io5";
import {GrEdit} from "react-icons/gr";

import React, {useState} from "react";
import {Link} from "react-router-dom";
import AuthFetchService from "../../Services/AuthFetchService";
import {toast, ToastContainer} from "react-toastify";

const editContact = (username:string, newCustomName:string) => {
    return AuthFetchService.authenticatedApiFetch({
        url: `/contacts/${username}`,
        method: 'PUT',
        additionalHeaders: {},
        params: JSON.stringify({username: newCustomName})
    });

}
const deleteContact = (username : string) => {

    return AuthFetchService.authenticatedApiFetch({
        url: `/contacts/${username}`,
        method: 'DELETE',
        additionalHeaders: {},
        params: JSON.stringify("")
    });

}


const Contact = ({ contact } : any) => {

    const [showEdit, setShowEdit] = useState(false)
    const [newCustomName, setNewCustomName] = useState('')
    const [showNewCustomNameError, setShowNewCustomNameError] = React.useState({hasError: false, message: ''});


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

    const onEdit = (e:any) => {

        e.preventDefault()

        if(newCustomName.length <= 37) {
            if(window.confirm(`Czy napewno chcesz zmienić nazwę kontatu z ${contact.customName} na ${newCustomName} ?`)) {
                    editContact(contact.username, newCustomName)
                        .then( (data) => {
                            console.log(data)
                            if( data.status === 404 ){
                                alert("Nieoczekiwany problem spróbuj ponownie później");
                            }
                            else
                            {
                                toast("Pomyślnie edytowano kontakt");
                                setShowNewCustomNameError({hasError: false, message: ''})
                                setNewCustomName('')
                                setTimeout(function () { (window.location.reload()) }, 1500);
                            }

                        })

            }
        }
        else {
            setShowNewCustomNameError({hasError: true, message: 'Za długa nazwa'})
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
                <GrEdit className={"icon"} style={{cursor: 'pointer'}} onClick={()=>setShowEdit(!showEdit)}/>
                <IoTrashBin className={"icon"} style={{color:'red', cursor: 'pointer'}} onClick={() => onDelete(contact.username, contact.customName)}/>

                {showEdit && (
                    <div className={'little-container'}>
                        <form onSubmit={onEdit}>
                            <TextField label="Login" variant="outlined" sx={{mb: 1, width:"100%"} }
                                       value={contact.username}
                                       disabled={true}/>
                            <TextField label="Nowa nazwa" variant="outlined" sx={{mb: 1, width:"100%"} }
                                       value={newCustomName}
                                       error={showNewCustomNameError.hasError}
                                       helperText={showNewCustomNameError.message}
                                       onChange={(e) => setNewCustomName(e.target.value)}
                            />
                            <Button type="submit" variant="contained" color="primary" sx={{width: "100%"}} >
                                Edytuj
                            </Button>
                        </form>
                    </div>
                )}

            </div>
        </ListItem>

    )

}

export default Contact