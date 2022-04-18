import { Button, Grid, Stack, TextField, Link } from '@mui/material';
import React from 'react';
import Footer from '../Common/Footer/Footer';
import AppNavigation from '../Common/AppNavigation';

export default function Register(){
    return (
        <div>
            <AppNavigation></AppNavigation>
            <Grid container justifyContent="center" width="90%">
                <form>
                    <Stack spacing={3} mt={5} ml={2} p={3}>
                        <h1> Rejestracja </h1>
                        <span> Podaj swoje dane w celu zarejestrowania konta w nieprawdziwym banku</span>
                        <TextField id="email" label="Email" variant="outlined"/>
                        <TextField id="username" label="Username" variant="outlined"/>
                        <TextField id="password" label="Password" variant="outlined" type="password"/>
                        <TextField id="password-confirmation" label="Password confirmation" variant="outlined" type="password"/>
                        <Button variant="contained" color="secondary" type="submit"> Login </Button>
                        <Link href="/login" variant="body1">Masz konto? Zaloguj się</Link>
                    </Stack>
                </form>
            </Grid>
            <Footer></Footer>
        </div>
    );
}