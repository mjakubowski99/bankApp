import React from 'react';
import { isExpired } from "react-jwt";
import { Navigate } from 'react-router-dom';

export default function RequiredAuth({ children }: { children: JSX.Element }){
    const token = localStorage.getItem('token');

    if( token === null){
        return <Navigate replace to="/login" state={{status: "error", message: "You must login"}}/>;
    }

    if( isExpired(token) ){
        return <Navigate replace to="/login" state={{status: "error", message: "You must login again"}}/>;
    }

    return children;
}