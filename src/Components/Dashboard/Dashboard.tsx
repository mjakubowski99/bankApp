import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import AppNavigation from '../Common/AppNavigation';
import Footer from '../Common/Footer/Footer';
import UserAccountNavbar from '../Common/UserAccountNavbar';


interface TransactionsTable{
    id: number,
    date: string,
    description: string,
    transactionType: string,
    amount: string
}
  
const rows: TransactionsTable[] = [
    {"id": 1, "date": "2022-10-11", "description": "Zakupy", "transactionType": "Przelew", "amount": "100 zl"},
    {"id": 3, "date": "2022-10-11", "description": "Zakupy", "transactionType": "Przelew", "amount": "100 zl"},
    {"id": 4, "date": "2022-10-11", "description": "Zakupy", "transactionType": "Przelew", "amount": "100 zl"},
    {"id": 5, "date": "2022-10-11", "description": "Zakupy", "transactionType": "Przelew", "amount": "100 zl"}
];

const useStyles = makeStyles({
    paper: {
        backgroundColor: "#1769aa" 
    }
});

function Dashboard(){
    const classes = useStyles();

    return (
        <div>
            <AppNavigation></AppNavigation>
            <UserAccountNavbar/>

            <Grid container spacing={2} style={{marginTop: "1rem", width: "90%", marginLeft: "auto", marginRight: "auto"}}>

                <Grid item xs={12} md={6}> 
                    <Card sx={{ minWidth: 275, marginTop: 1, padding: "1rem"}}>
                        <CardContent>
                            <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                                Konto osobiste
                            </Typography>
                            <Typography variant="h5" component="div">
                                89 ... 122 041
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Środki: 20000zł
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained">Nowy przelew</Button>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card sx={{ minWidth: 275, marginTop: 1, padding: "1rem"}}>
                        <CardContent>
                            <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                                Ostatni odbiorcy: 
                            </Typography>

                            <List>
                                <ListItem>
                                    <Avatar/>
                                    <Button>Marek Kowalski</Button>
                                </ListItem>
                                <Divider/>
                                <ListItem>
                                    <Avatar/>
                                    <Button>Tadeusz Nowak</Button>

                                </ListItem>
                                <Divider/>
                                <ListItem>
                                    <Avatar/>
                                    <Button>Paweł Polak</Button>
                                </ListItem>
                            </List>
                            
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <TableContainer component={Paper} sx={{width: "90%", marginTop: "1rem", marginLeft: "auto", marginRight: "auto", padding: "1rem"}}>
                <h2> Historia transakcji </h2>
                <Table sx={{ minWidth: 650, boxShadow: 1}} aria-label="simple table">
                    <TableHead style={{backgroundColor: "#0277bd"}}>
                        <TableRow>
                            <TableCell align="left" sx={{color: "white"}}>Data</TableCell>
                            <TableCell align="left" sx={{color: "white"}}>Opis</TableCell>
                            <TableCell align="left" sx={{color: "white"}}>Typ transakcji</TableCell>
                            <TableCell align="left" sx={{color: "white"}}>Kwota</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">{row.date}</TableCell>
                                <TableCell align="left">{row.description}</TableCell>
                                <TableCell align="left">{row.transactionType}</TableCell>
                                <TableCell align="left">{row.amount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Footer/>
        </div>
    )
}

export default Dashboard;