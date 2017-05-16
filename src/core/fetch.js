import { REST_API, RESTTMP, REST_API_CURRENCY } from './rest-endpoint';

export const METHOD = {
    get: 'GET',
    post: 'POST'
};

let $fetch = (urn, params, method = METHOD.get) => {
    const uri = REST_API + urn;
    let requestPromise = null;
    switch (method) {
        case METHOD.post: 
            requestPromise = fetch(uri, {
                    method,
                    headers: new Headers(),
                    body: JSON.stringify(params),
                });
        break;
        case METHOD.get: 
        default:
            requestPromise = fetch(uri, params);
        break;
    }

    const fetchData = requestPromise.then(res => res.json());
    return fetchData;
    
};

export default $fetch;