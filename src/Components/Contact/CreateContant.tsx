import React, { useState } from "react";
import AppNavigation from "../Common/AppNavigation";
import {Avatar, Button, FormControl, Grid, TextField} from '@mui/material';
import AuthFetchService from "../../Services/AuthFetchService";
import AuthService from "../../Services/AuthService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const addContact = (username: string) => {
    return AuthFetchService.authenticatedApiFetch({
        url: '/contacts',
        method: 'POST',
        additionalHeaders: {},
        params: JSON.stringify({username: username})
    });
}



const  CreateContant = () => {

    const [username, setUsername] = useState('')


    const [usernameErrors, setUsernameErrors] = React.useState({hasError: false, message: ''});


    const onSubmit = (e:any) => {
        e.preventDefault()
        if(username === '')
        {
            setUsernameErrors({hasError: true, message: 'Login jest wymagany'});
            return;
        }
        else if(username === AuthService.getUsername().username)
        {
            setUsernameErrors({hasError: true, message: 'Nie możesz dodać siebie do konatktów'});
            return;
        }

        setUsernameErrors({hasError: false, message: ''})

        addContact(username)
            .then( (data) => {
                if( data.status === 404 ){
                    switch(data.message){
                        case 'contactNotFound':
                            setUsernameErrors({hasError: true, message: "Nie znaleziono użytkownika"});
                            break;
                        default:
                            alert("Nieoczekiwany problem spróbuj ponownie później");
                    }
                }
                else
                {

                    setUsername('');
                    toast("Pomyślnie dodano kontakt");
                    setTimeout(function () { (window.location.reload()) }, 1500);

                }


            })
    }

  return (

      <div>
          <ToastContainer />
          <div className={'container'}>
          <form className={'add-form'} onSubmit={onSubmit}>
                  <Avatar className={"avatar"}/>

                  <TextField label="Login" variant="outlined" sx={{mb: 1, width:"100%"} }
                             value={username}
                             error={usernameErrors.hasError}
                             helperText={usernameErrors.message}
                             onChange={(e) => setUsername(e.target.value)}
                  />
              <Button type="submit" variant="contained" color="primary" sx={{width: "100%"}} >
                  Utwórz nowy kontakt
              </Button>
          </form>
          </div>
      </div>
  )
}
export default CreateContant