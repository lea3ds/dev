import axios from "axios";
var urlBase = process.env.REACT_APP_SERVER_ADDR;


export const configure = () =>  (dispatch, getState) => {

    axios.interceptors.request.use(
        (request) => {

            var {isAuthenticated, token} = getState().authenticationStore;
            if (!!!request.headers['Authorization'] && isAuthenticated === true)
                request.headers['Authorization'] = token.token_type + ' ' + token.access_token;

            if (!!!request.headers['Content-Type'])
                request.headers['Content-Type'] = 'application/json';

            return request;
        },
        (error) => {
            dispatch({type: 'CONNECTION_REQUEST_ERROR', payload: error});
            return Promise.reject(error);
        });;

    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            dispatch({type: 'CONNECTION_RESPONSE_ERROR', payload: error});
            return Promise.reject(error);
        });
}

export const get=(url, key) => (dispatch, getState) => {
    key = !!key ? '/' + key : '';
    url = urlBase + url + key;
    return axios.get(url)
        .then(response => Promise.resolve(response.data))
        .catch(error => Promise.reject(error))
}

export const post=(url,data,config) => (dispatch, getState) => {
    url = urlBase + url;
    return axios.post(url, data, config)
        .then(response => Promise.resolve(response.data))
        .catch(error => Promise.reject(error))
}


export const put=(url,key,data,config) => (dispatch, getState) => {
    key = !!key ? '/' + key : '';
    url = urlBase + url + key;
    return axios.put(url, data, config)
        .then(response => Promise.resolve(response.data))
        .catch(error => Promise.reject(error))
}

export const storageGet=(key) => {
    var data = localStorage.getItem(key);
    if (!!!data) return null;
    return JSON.parse(data);
}

export const storageSet=(key, data)=>{
    if (!!data) data = JSON.stringify(data); else data = null;
    localStorage.setItem(key, data);
}
