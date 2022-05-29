
const baseHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

interface FetchParams{
    url: string,
    method: string,
    params: string, 
    additionalHeaders: object
}

const baseApiFetch = (params: FetchParams): Promise<any>=> {
    const finalHeaders = {...baseHeaders, ...params.additionalHeaders};

    let data: any = {
        method: params.method,
        headers: finalHeaders
    }

    if( params.method === 'POST' || params.method === 'PUT'){
        data = {
            ...data, 
            body: params.params
        }
    }

    return fetch('https://bankpol.herokuapp.com'+params.url, data).then( (response) => response.json() )
}

const authenticatedApiFetch = (params: FetchParams): Promise<any> => {
    const headers = {
        ...baseHeaders,
        'Authorization': 'Bearer '+ localStorage.getItem('token')
    }

    const finalHeaders = {...headers, ...params.additionalHeaders};

    let data: any = {
        method: params.method,
        headers: finalHeaders
    }

    if( params.method === 'POST' || params.method === 'PUT'){
        data = {
            ...data, 
            body: params.params
        }
    }


    return fetch('https://bankpol.herokuapp.com'+params.url, data).then( (response) => response.json() )
}

const AuthFetchService = {
    baseApiFetch: baseApiFetch,
    authenticatedApiFetch: authenticatedApiFetch
}

export default AuthFetchService;