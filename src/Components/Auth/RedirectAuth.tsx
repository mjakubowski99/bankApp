import { Navigate } from "react-router-dom";
import { isExpired } from "react-jwt";

export default function RedirectAuth({ children }: { children: JSX.Element }){
    const token = localStorage.getItem('token');

    if( token !== null && !isExpired(token)){
        return <Navigate replace to="/dashboard" state={{status: "error", message: "You must login"}}/>;
    }

    return children;
}