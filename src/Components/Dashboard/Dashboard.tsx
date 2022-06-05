import { FaceRetouchingNaturalSharp } from '@mui/icons-material';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CircularProgress, Divider, Grid, List, ListItem, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { TransferDetail } from '../../interfaces/transferDetailsList';
import { getTransferDetails } from '../../mocks/TransferDetailMocks';
import AuthFetchService from '../../Services/AuthFetchService';
import { links, navigationData } from '../../Services/Navigation';
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

function fetchTransfers() {
    return AuthFetchService.authenticatedApiFetch({
        url: '/transfer',
        method: 'GET',
        additionalHeaders: {},
        params: JSON.stringify({})
    });
}

function fetchAccountBalance(){
    return AuthFetchService.authenticatedApiFetch({
        url: '/account/balacne',
        method: 'GET',
        additionalHeaders: {},
        params: JSON.stringify({})
    });
}

function fetchExportToPdf(){
    const headers = {
        'Accept': 'application/pdf',
        'Authorization': 'Bearer '+ localStorage.getItem('token')
    };

    return fetch('https://bankpol.herokuapp.com/transfer/export/pdf', {'method': 'GET', 'headers': headers});
}

function fetchContacts(){
    return AuthFetchService.authenticatedApiFetch({
        url: '/contacts',
        method: 'GET',
        additionalHeaders: {},
        params: JSON.stringify({})
    });
}

function Dashboard(){
    const classes = useStyles();

    const [accountBalance, setAccountBalance] = React.useState('');
    const [transferDetails, setTransferDetails] = React.useState<TransferDetail[]>([]);

    const [accountBalanceLoading, setAccountBalanceLoading] = React.useState(true);
    const [transferDetailsLoading, setTransferDetailsLoading] = React.useState(true);

    const handleNewTransferClick = () => {
        window.location.href = links.createTransfer;
    }

    const handleExportClick = () => {
        fetchExportToPdf()
            .then(response => response.blob())
            .then( blob => {
                let url = window.URL.createObjectURL(blob);
                window.open(url, '_blank')?.focus();
            })
    }

    useEffect( () => {
        fetchAccountBalance().then( (data: any) => {
            setAccountBalance(data);
            setAccountBalanceLoading(false);
        }).catch( (err: any) => {
            console.log(err);
        });

        fetchTransfers().then( (data: any) => {
            if( data.transferDetailsList ){
                setTransferDetails(data.transferDetailsList);
            }
            setTransferDetailsLoading(false);
        }).catch( (err: any) => {
            console.log(err);
            alert("Something unexpected happend");
        });

        fetchContacts().then( (data: any) => {
            console.log(data);
        }).catch( (err: any) => {
            console.log(err);
            alert("Something unexpected happend");
        });


    }, []);

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
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                { accountBalanceLoading ? <CircularProgress/> : "Środki: "+accountBalance+"zł"}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" onClick={handleNewTransferClick}>Nowy przelew</Button>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card sx={{ minWidth: 275, marginTop: 1, padding: "1rem"}}>
                        <CardContent>
                            <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                                Kontakty: 
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

                            <Button variant="contained"> Dodaj kontakt </Button>
                            
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

                <TableContainer component={Paper} sx={{width: "90%", marginTop: "1rem", marginLeft: "auto", marginRight: "auto", padding: "1rem"}}>
                    <h2> 
                        Historia transakcji:
                        <Button variant="contained" onClick={handleExportClick}>
                            Wyeksportuj do pdf
                        </Button>
                    </h2>
                    { 
                        transferDetailsLoading ?
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <CircularProgress/>
                        </div> :
                        <Table sx={{ minWidth: 650, boxShadow: 1}} aria-label="simple table">
                            <TableHead style={{backgroundColor: "#0277bd"}}>
                                <TableRow>
                                    <TableCell align="left" sx={{color: "white"}}>Adresant</TableCell>
                                    <TableCell align="left" sx={{color: "white"}}>Odbiorca</TableCell>
                                    <TableCell align="left" sx={{color: "white"}}>Typ transakcji</TableCell>
                                    <TableCell align="left" sx={{color: "white"}}>Tytuł</TableCell>
                                    <TableCell align="left" sx={{color: "white"}}>Kwota</TableCell>
                                    <TableCell align="left" sx={{color: "white"}}>Data</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transferDetails.map((transferDetail) => (
                                    <TableRow key={transferDetail.transferId}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="left">
                                            {transferDetail.sourceAccount.firstName + ' ' + transferDetail.sourceAccount.lastName}
                                        </TableCell>
                                        <TableCell align="left">
                                            {transferDetail.destinationAccount.firstName + ' ' + transferDetail.destinationAccount.lastName}
                                        </TableCell>
                                        <TableCell align="left">{transferDetail.transactionType}</TableCell>
                                        <TableCell align="left">
                                            <a href={links.transfer+'?transaction_id='+transferDetail.transferId}> {transferDetail.title} </a>
                                        </TableCell>
                                        <TableCell align="left">{transferDetail.amount + 'zł'}</TableCell>
                                        <TableCell align="left">{transferDetail.date}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    }
                </TableContainer>
            <Footer/>
        </div>
    )
}

export default Dashboard;