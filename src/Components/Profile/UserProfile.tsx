import { Avatar, Button, Card, CardActions, CardContent, CardHeader, FormLabel, Grid, InputLabel, TextField, Typography } from '@mui/material';
import React from 'react';
import AppNavigation from '../Common/AppNavigation';

const avatar = "https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png";

export default function UserProfile(){
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
                                    <Typography sx={{ fontSize: 18, marginTop: 2 }} gutterBottom>
                                        Jan Kowalski
                                    </Typography>
                                    <Button variant="contained">Edytuj dane</Button>
                                </Grid>

                                <Grid item xs={12} md={6} sx={{ml: 2}}>
                                    <Typography variant="h5" sx={{marginBottom: 2}}> Dane szczegółowe: </Typography>
                                    <Typography variant="h6" sx={{marginTop: 2}}> Stan konta: 10000zł</Typography>
                                    <InputLabel sx={{marginTop: 2}}> Email: </InputLabel>
                                    <TextField id="filled-basic" label="email.cos@gmail.com" variant="filled" disabled/>
                                    <InputLabel sx={{marginTop: 2}}> Limit na karcie: </InputLabel>
                                    <TextField id="filled-basic" label="5000 zł" variant="filled" disabled/>
                                    <InputLabel sx={{marginTop: 2}}> Adres: </InputLabel>
                                    <TextField id="filled-basic" label="Akacjowa 21 Kraków" variant="filled" disabled/>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}