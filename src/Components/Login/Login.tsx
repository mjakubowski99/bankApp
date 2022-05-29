import React, { useState } from 'react';
import Navbar from '../Common/Navbar';
import { Alert, Snackbar, TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Stack } from '@mui/material';
import { Grid } from '@mui/material';
import { Link } from '@mui/material';
import AuthService from "../../Services/AuthService";
import withAppliedCatch from '../../Services/CommonService';
import { Navigate, useLocation } from 'react-router-dom';
import Footer from '../Common/Footer/Footer';
import {Message} from '../../interfaces/common';
import AppNavigation from '../Common/AppNavigation';

export default function Login() {
    const {state} = useLocation();
    const info = (state as Message) || {};
    window.history.replaceState({}, document.title)
    
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [usernameValidationFailed, setUsernameValidatioNFailed] = useState<boolean>(false);
    const [passwordValidationFailed, setPasswordValidationFailed] = useState<boolean>(false);

    const [snackbarOpened, setSnackbarOpened] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleLogin = (e: any) => {
      e.preventDefault();

      if( username === "" ){
        setUsernameValidatioNFailed(true);
        return;
      }

      if( password === "" ){
        setPasswordValidationFailed(true);
        return;
      }
    
      const promise = AuthService.login(username, password).then( (data: any) => {
          if( data.user !== undefined ){
              setIsLoggedIn(true)
          }
          else{
              setSnackbarOpened(true);
              setSnackbarMessage("Niepoprawne dane logowania");
          }
      })

      withAppliedCatch(promise)
    }
  
    return (
      <div>
          <Snackbar open={snackbarOpened} autoHideDuration={6000}>
              <Alert severity='error'> {snackbarMessage} </Alert>
          </Snackbar>
          <AppNavigation></AppNavigation>

          { isLoggedIn && <Navigate replace to="/dashboard" />}

          { info.status === "error" && 
            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={true}
              autoHideDuration={1000}
              transitionDuration={1000}
            >
            <Alert severity="error">{info.message}</Alert> 
          </Snackbar>
          }

          <Grid container justifyContent="center" width="90%">
            <form onSubmit={handleLogin}>
              <Stack spacing={3} mt={5} ml={2} p={3}>
                <h1> Logowanie </h1>
                <span> Podaj swoje dane logowania w celu uwierzytelnienia </span>
                <TextField error={usernameValidationFailed} helperText={usernameValidationFailed ? "Email is required": ""} id="username" label="Username" variant="outlined" 
                  onChange={ (e:any) => setUsername(e.target.value)} 
                />
                <TextField error={passwordValidationFailed} helperText={passwordValidationFailed ? "Password is required": ""} id="password" label="Password" variant="outlined" type="password" 
                  onChange={ (e:any) => setPassword(e.target.value)} 
                />
                <Button variant="contained" color="secondary" type="submit"> Login </Button>
                <Link href="/register" variant="body1">
                    Nie masz konta? Zarejestruj się
                </Link>
              </Stack>
            </form>
          </Grid>
      </div>
    );
}