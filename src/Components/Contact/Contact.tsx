import {Avatar, Button, ListItem} from "@mui/material";
import { FcMoneyTransfer } from "react-icons/fc";
import {IoTrashBin} from "react-icons/io5";
import {GrEdit} from "react-icons/gr";

const goToTransaction = () =>
{
    console.log("Zrob przelew")
}

const goToEdit = () =>
{
    console.log("Edycja")
}

const goToDelete = () =>
{
    console.log("Usuń")
}

const Contact = ({ contact } : any) => {
    return(
        <ListItem>
            <Avatar/>
            <div className={"contact"}> {contact.customName}
                <FcMoneyTransfer className={"icon"} style={{cursor: 'pointer'}} onClick={goToTransaction}/>
                <GrEdit className={"icon"} style={{cursor: 'pointer'}} onClick={goToEdit}/>
                <IoTrashBin className={"icon"} style={{color:'red', cursor: 'pointer'}} onClick={goToDelete}/>
            </div>
        </ListItem>
    )

}

export default Contact