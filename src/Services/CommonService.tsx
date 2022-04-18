
const withAppliedCatch = (promise: Promise<any>): Promise<any> => {
    return promise.catch( (error: any) => { 
        alert("Some server errror occured");
    });
}

export default withAppliedCatch
