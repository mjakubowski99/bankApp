
const baseHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

interface FetchParams{
    url: string,
    method: string,
    body: string, 
    additionalHeaders: object
}

const baseApiFetch = (params: FetchParams): Promise<any>=> {
    const finalHeaders = {...baseHeaders, ...params.additionalHeaders};

    return fetch(process.env.API_URL+params.url, {
        method: params.method,
        headers: finalHeaders,
        body: params.body 
    }).then( response => response.json())
}

const authenticatedApiFetch = (params: FetchParams): Promise<any> => {
    const headers = {
        ...baseHeaders,
        'Authorization': 'Bearer '+ localStorage.getItem('token')
    }

    const finalHeaders = {...headers, ...params.additionalHeaders};

    return fetch(process.env.API_URL+params.url, {
        method: params.method,
        headers: finalHeaders,
        body: params.body 
    }).then( response => response.json())
}

const AuthFetchService = {
    baseApiFetch: baseApiFetch,
    authenticatedApiFetch: authenticatedApiFetch
}

export default AuthFetchService;