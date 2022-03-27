import React, {useState} from 'react';
import Navbar from '../Common/Navbar';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Stack } from '@mui/material';
import { Grid } from '@mui/material';
import { Link } from '@mui/material';
import Footer from '../Common/Footer/Footer';

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [emailValidationFailed, setEmailValidationFailed] = useState<boolean>(false);
    const [passwordValidationFailed, setPasswordValidationFailed] = useState<boolean>(false);

    const handleLogin = (e: any) => {
      e.preventDefault();

      if( email === "" ){
        setEmailValidationFailed(true);
        return;
      }

      if( password === "" ){
        setPasswordValidationFailed(true);
        return;
      }
    
    }
  
    return (
      <div>
        <Navbar loggedIn={false}></Navbar>

        <Grid container justifyContent="center" width="90%">
          <form onSubmit={handleLogin}>
            <Stack spacing={3} mt={5} ml={2} p={3}>
              <h1> Logowanie </h1>
              <span> Podaj swoje dane identyfikacyjne w celu uwierzytelnienia </span>
              <TextField error={emailValidationFailed} helperText={emailValidationFailed ? "Email is required": ""} id="email" label="Email" variant="outlined" 
                onChange={ (e:any) => setEmail(e.target.value)} 
              />
              <TextField error={passwordValidationFailed} helperText={passwordValidationFailed ? "Password is required": ""} id="password" label="Password" variant="outlined" type="password" 
                onChange={ (e:any) => setPassword(e.target.value)} 
              />
              <Button variant="contained" color="secondary" type="submit"> Login </Button>
              <Link href="#" variant="body1">Nie masz konta? Zarejestruj się</Link>
            </Stack>
          </form>
        </Grid>

        <Footer></Footer>
      </div>
    );
}