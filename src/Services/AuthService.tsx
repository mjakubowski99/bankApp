import withAppliedCatch from "./CommonService";
import AuthFetchService from "./AuthFetchService";

interface User{
    refreshToken: string
}

function getUser(): User{
    return JSON.parse( localStorage.getItem('user') || '{}' );
}

const register = (register: any) => {
    
    return AuthFetchService.baseApiFetch({
        url: '/auth/register',
        method: "POST",
        body: JSON.stringify(register),
        additionalHeaders: {}
    })
}

const login = (email: string, password: string) => {

    return AuthFetchService.baseApiFetch({
        url: '/auth/login',
        method: "POST",
        body: JSON.stringify({email: email, password: password}),
        additionalHeaders: {}
    })
    .then( data => {
        if (data.success) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
        }
        return data;
    });
}

const AuthService = {
    register,
    login
}

export default AuthService