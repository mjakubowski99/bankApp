import { Button, Grid, Stack, TextField, Link, Snackbar, Alert } from '@mui/material';
import React, {useState} from 'react';
import Footer from '../Common/Footer/Footer';
import AppNavigation from '../Common/AppNavigation';
import AuthService from '../../Services/AuthService';
import { Navigate } from 'react-router-dom';

export default function Register(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [snackbarOpened, setSnackbarOpened] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleFormSubmit = (event: any) => {
        event.preventDefault();

        if( password !== passwordConfirmation ){
            setSnackbarOpened(true);
            setSnackbarMessage('Hasła muszą być takie same');
            return false;
        }

        AuthService.register({username, password, firstName, lastName})
            .then( (data: any) => {
                if( data.user !== undefined){
                    setIsAuthenticated(true);
                }
                else{
                    setSnackbarOpened(true);
                    if( data.message === 'userAlreadyExist'){
                        setSnackbarMessage("Użytkownik z takim username już istnieje");
                    }
                    else{
                        setSnackbarMessage("Some unexpected error occured");
                    }
                }
            } );
    }

    const registerForm = <div>
        <Snackbar open={snackbarOpened} autoHideDuration={6000}>
            <Alert severity='error'> {snackbarMessage} </Alert>
        </Snackbar>
        <AppNavigation></AppNavigation>
        <Grid container justifyContent="center" width="90%">
            <form onSubmit={(e) => handleFormSubmit(e)}>
                <Stack spacing={3} mt={5} ml={2} p={3}>
                    <h1> Rejestracja </h1>
                    <span> Podaj swoje dane w celu zarejestrowania konta w nieprawdziwym banku</span>
                    <TextField id="username" label="Username" variant="outlined" value={username} onChange={ e => setUsername(e.target.value)}/>
                    <TextField id="password" label="Password" variant="outlined" value={password} onChange={ e => setPassword(e.target.value)} type="password"/>
                    <TextField id="passwordConfirmation" label="Password confirmation" variant="outlined" type="password" value={passwordConfirmation} onChange={ e => setPasswordConfirmation(e.target.value)}/>
                    <TextField id="firstName" label="First name" variant="outlined" value={firstName} onChange={ e => setFirstName(e.target.value)}/>
                    <TextField id="lastName" label="Last name" variant="outlined" value={lastName} onChange={ e => setLastName(e.target.value)}/>
                    <Button variant="contained" color="secondary" type="submit"> Register </Button>
                    <Link href="/login" variant="body1">Masz konto? Zaloguj się</Link>
                </Stack>
            </form>
        </Grid>
        <Footer></Footer>
    </div>;

    return (
        isAuthenticated ? 
            <Navigate replace to='/dashboard' state={{
                status: "success", 
                message: "Successful registered and logged in"
            }}/> : registerForm
    )
}