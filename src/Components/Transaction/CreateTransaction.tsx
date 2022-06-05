import React from 'react';
import Footer from '../Common/Footer/Footer';
import AppNavigation from '../Common/AppNavigation';
import { Alert, Button, FormControl, Grid, Snackbar, TextField } from '@mui/material';
import AuthFetchService from '../../Services/AuthFetchService';
import { Navigate, useLocation } from 'react-router-dom';

const makeTransfer = (username: string, amount: number, title: string) => {
    return AuthFetchService.authenticatedApiFetch({
        url: '/transfer',
        method: 'POST',
        additionalHeaders: {},
        params: JSON.stringify({targetUsername: username, amount, title})
    });
}


export default function CreateTransaction(props: any){
    const {state} = useLocation();
    const data = state as any;
    window.history.replaceState({}, document.title)

    const [username, setUsername] = React.useState(data?.username ? data.username : '');
    const [amount, setAmount] = React.useState(data?.amount ? data.amount : '');
    const [title, setTitle] = React.useState(data?.title ? data.title : '');

    const [usernameErrors, setUsernameErrors] = React.useState({hasError: false, message: ''});
    const [amountErrors, setAmountErrors] = React.useState({hasError: false, message: ''});
    const [titleErrors, setTitleErrors] = React.useState({hasError: false, message: ''});

    const [snackbarOpened, setSnackbarOpened] = React.useState(false);
    const [redirectToDashboard, setRedirectToDashboard] = React.useState(false);
    const [buttonBlocked, setButtonBlocked] = React.useState(false);

    const handleClick = () => {
        if( buttonBlocked ){
            return;
        }
        
        setButtonBlocked(true);
        if( username === '' ){
            setUsernameErrors({hasError: true, message: 'Username jest wymagane'});
            return;
        }

        makeTransfer(username, parseInt(amount), title)
            .then( (data) => {
                console.log(data);
                if( data.status >= 400 && data.status < 500){
                    switch(data.message){
                        case 'recipientNotFound':
                            setUsernameErrors({hasError: true, message: "Nie znaleziono odbiorcy"});
                            break;
                        default:
                            alert("Woops something went wrong.");
                    }
                    setButtonBlocked(false);
                }else if( data.status === 500 ){
                    alert("Nieoczekiwany problem z serwerem api spróbuj ponownie później");
                    setButtonBlocked(false);
                }else{
                    setSnackbarOpened(true);
                    
                    setTimeout( () => {
                        setRedirectToDashboard(true);
                    }, 2000);
                }
            })
    }

    return (
        <div>
            { redirectToDashboard && <Navigate replace to="/dashboard"></Navigate> }
            <Snackbar open={snackbarOpened} autoHideDuration={2000} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
              <Alert severity='success'> Udało ci się zrealizować przelew </Alert>
            </Snackbar>
            <AppNavigation></AppNavigation>
            <Grid container sx={{marginTop: 5}} justifyContent="center">
                <Grid item xs={12} md={6}>
                    <h1>Utwórz nowy przelew</h1>
                    <FormControl sx={{width: "90%"}}> 
                        <TextField label="Nazwa odbiorcy" variant="outlined" sx={{mb: 1}}
                            error={usernameErrors.hasError}
                            helperText={usernameErrors.hasError ? usernameErrors.message : ''}
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField label="Tytuł" variant="outlined" sx={{mb: 1}}
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextField label="Kwota(zł)" variant="outlined" sx={{mb: 1}} type="number"
                            value={amount} 
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <Button type="submit" variant="contained" color="primary" sx={{width: "100%"}} onClick={handleClick}>
                            Wyślij
                        </Button>
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    );
}