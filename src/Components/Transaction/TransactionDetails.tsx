import { Button, Card, CardContent, Divider, Grid, List, ListItem } from "@mui/material";
import React, { useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { getTransferDetails } from "../../mocks/TransferDetailMocks";
import AuthFetchService from "../../Services/AuthFetchService";
import AppNavigation from "../Common/AppNavigation";
import ErrorPage from "../Common/ErrorPage";

function fetchTransferDetails(transaction_id: any){
    return AuthFetchService.authenticatedApiFetch({
        url: '/transfer/'+transaction_id,
        method: 'GET',
        additionalHeaders: {},
        params: JSON.stringify({})
    });
}

const detail = getTransferDetails()[0];

export default function TransactionDetails(){ 
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoadingError, setIsLoadingError] = React.useState(false);
    const [loadingError, setLoadingError] = React.useState('');
    const [transferDetail, setTransferDetail] = React.useState(detail);
    const [redirectToTransfer, setRedirectToTransfer] = React.useState(false);

    useEffect( () => {

        fetchTransferDetails(searchParams.get("transaction_id")).then(response => {
            if( response.status === 404 ){
                switch(response.message){
                    case 'unauthorized':
                        setIsLoadingError(true);
                        setLoadingError('You are not authorized to this action.');
                        break;
                    default:
                        setIsLoadingError(true);
                        setLoadingError('Woops something went wrong.');        
                }
            }else if( response.status === 500 ){
                setIsLoadingError(true);
                setLoadingError('Woops something went wrong.');     
                setTransferDetail(response.data);
            }else{
                setTransferDetail(response);
            }
        });

    }, []);

    return (
        redirectToTransfer ? <Navigate replace to="/transactions/create" state={{
            'username': transferDetail.transactionType === 'income' ? transferDetail.destinationAccount.username : transferDetail.sourceAccount.username,
            'amount': transferDetail.amount,
            'title': transferDetail.title
        }}></Navigate> :
        isLoadingError ? <ErrorPage message={loadingError}/> : 
        <div>
            <AppNavigation></AppNavigation>

            <Grid container justifyContent="center">
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                        <h1> Detale transakcji </h1>
                        <List>
                            <ListItem>
                                <b>Nadawca: </b> 
                                <div>{transferDetail.sourceAccount.firstName + ' ' + transferDetail.sourceAccount.lastName}</div>
                            </ListItem>
                            <Divider/>
                            <ListItem>
                                <b>Odbiorca:</b> 
                                {transferDetail.destinationAccount.firstName + ' ' + transferDetail.destinationAccount.lastName}
                            </ListItem>
                            <ListItem>
                                <b>Tytuł przelew:</b> 
                                {transferDetail.title}
                            </ListItem>
                            <Divider/>
                            <ListItem>
                                <b>Kwota:</b> 
                                {transferDetail.amount} zł
                            </ListItem>
                            <ListItem>
                                <b>Data:</b> 
                                {transferDetail.date} zł
                            </ListItem>
                            <Divider/>
                            <ListItem>
                                <Button variant="contained" onClick={ () => {setRedirectToTransfer(true)}}> 
                                    {transferDetail.transactionType === 'income' ? "Odpowiedz na przelew" : "Ponów przelew"}
                                </Button>
                            </ListItem>
                        </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}