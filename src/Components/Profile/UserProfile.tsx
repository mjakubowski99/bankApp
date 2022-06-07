import { Avatar, Button, Card, CardActions, CardContent, CardHeader, FormLabel, Grid, InputLabel, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import AuthFetchService from '../../Services/AuthFetchService';
import AuthService from '../../Services/AuthService';
import { formatAmount } from '../../Services/CalculationService';
import AppNavigation from '../Common/AppNavigation';

const avatar = "https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png";

function fetchAccountBalance(){
    return AuthFetchService.authenticatedApiFetch({
        url: '/account/balacne',
        method: 'GET',
        additionalHeaders: {},
        params: JSON.stringify({})
    });
}

export default function UserProfile(){
    const userData = AuthService.getUser();

    const [accountBalance, setAccountBalance] = React.useState('');

    useEffect( () => {
        fetchAccountBalance().then( (data: any) => {
            setAccountBalance(data);
        }).catch( (err: any) => {
            console.log(err);
            alert("Something unexpected happen");
        });
    }, [])

    return (
        <div>
            <AppNavigation></AppNavigation>

            <Grid container sx={{marginTop: 5}} justifyContent="center">
                <Grid item xs={12} md={10}>
                    <Card variant="outlined">
                        <CardHeader title="Profil użytkownika" sx={{backgroundColor: "#2E3B55", color: "white"}}/>
                        <CardContent>
                            <Grid container>
                                <Grid item xs={12} md={4} sx={{ml: 2}}>
                                    <Avatar sx={{ width: 100, height: 100 }}/>
                                </Grid>

                                <Grid item xs={12} md={6} sx={{ml: 2}}>
                                    <Typography variant="h5" sx={{marginBottom: 2}}> Dane szczegółowe: </Typography>
                                    <Typography variant="h6" sx={{marginTop: 2}}> Stan konta: { formatAmount(accountBalance) } zł </Typography>
                                    <InputLabel sx={{marginTop: 2}}> Username: </InputLabel>
                                    <TextField id="filled-basic" label={userData.username} variant="filled" disabled/>
                                    <InputLabel sx={{marginTop: 2}}> Imie i nazwisko: </InputLabel>
                                    <TextField id="filled-basic" label={userData.firstName+" "+userData.lastName} variant="filled" disabled/>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}