import withAppliedCatch from "./CommonService";
import AuthFetchService from "./AuthFetchService";
import { ResponseStatus } from "../interfaces/common";

interface User{
    username: string;
    lastName: string;
    firstName: string;
}

function getUser(): User{
    return JSON.parse( localStorage.getItem('user') || '{}' );
}

const saveUserDataInLocalStorage = (data: any) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
}

const register = (register: any) => {
    
    return AuthFetchService.baseApiFetch({
        url: '/auth/register',
        method: "POST",
        params: JSON.stringify(register),
        additionalHeaders: {}
    }).then( (data: any) => {
        if( data.user !== undefined ){
            saveUserDataInLocalStorage(data);
        }
        return data;
    })
}

const login = (username: string, password: string) => {

    return AuthFetchService.baseApiFetch({
        url: '/auth/login',
        method: "POST",
        params: JSON.stringify({username: username, password: password}),
        additionalHeaders: {}
    })
    .then( (data: any) => {
        if( data.user !== undefined ){
            saveUserDataInLocalStorage(data);
        }
        return data
    }).catch( err => {
        console.log(err);
    })
}

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

const getUsername = () => {

    return JSON.parse( localStorage.getItem('user') || '{}' );
}

const AuthService = {
    register,
    login,
    logout,
    getUsername,
    getUser
}

export default AuthService