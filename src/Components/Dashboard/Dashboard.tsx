import { Avatar, Button, Card, CardActions, CardContent, Divider, Grid, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
import AppNavigation from '../Common/AppNavigation';
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

function Dashboard(){
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
                <h3> Historia transakcji </h3>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Data</TableCell>
                        <TableCell align="left">Opis</TableCell>
                        <TableCell align="left">Typ transakcji</TableCell>
                        <TableCell align="left">Kwota</TableCell>
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
        </div>
    )
}

export default Dashboard;