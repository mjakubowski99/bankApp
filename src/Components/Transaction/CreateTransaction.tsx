import React from 'react';
import Footer from '../Common/Footer/Footer';
import AppNavigation from '../Common/AppNavigation';
import { Button, FormControl, Grid, TextField } from '@mui/material';
import AuthFetchService from '../../Services/AuthFetchService';

const makeTransfer = (username: string, amount: number, title: string) => {
    return AuthFetchService.authenticatedApiFetch({
        url: '/transfer',
        method: 'POST',
        additionalHeaders: {},
        params: JSON.stringify({targetUsername: username, amount, title})
    });
}


export default function CreateTransaction(){
    const [username, setUsername] = React.useState('');
    const [amount, setAmount] = React.useState('');
    const [title, setTitle] = React.useState('');

    const [usernameErrors, setUsernameErrors] = React.useState({hasError: false, message: ''});
    const [amountErrors, setAmountErrors] = React.useState({hasError: false, message: ''});
    const [titleErrors, setTitleErrors] = React.useState({hasError: false, message: ''});

    const handleClick = () => {
        if( username === '' ){
            setUsernameErrors({hasError: true, message: 'Username jest wymagane'});
            return;
        }

        makeTransfer(username, parseInt(amount), title)
            .then( (data) => {
                if( data.status === 404 ){
                    switch(data.message){
                        case 'recipientNotFound':
                            setUsernameErrors({hasError: true, message: "Nie znaleziono odbiorcy"});
                            break;
                        default:
                            alert("Nieoczekiwany problem spróbuj ponownie później");
                    }
                }
            })
    }

    return (
        <div>
            <AppNavigation></AppNavigation>
            <Grid container sx={{marginTop: 5}} justifyContent="center">
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
        </div>
    );
}