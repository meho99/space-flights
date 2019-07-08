// ----- SERVER OPTIONS AND ADDRESS -----

export const  defaultOptions = (data) => ({
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(data),
    headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Credentials": true,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    
});

export const address= where => `http://localhost:3001${where}`
