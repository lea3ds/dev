import axios from "axios";
import * as queryString from 'querystring'
var urlBase = process.env.REACT_APP_SERVER_ADDR;


export const configure = () =>  (dispatch, getState) => {

    axios.interceptors.request.use(
        (request) => {
            if (request.url.includes('token')) {
                delete request.headers['Authorization'];
                request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                return request;
            }
            var {isAuthenticated, token} = getState().authenticationStore;
            if (isAuthenticated === true)
                request.headers['Authorization'] = token.token_type + ' ' + token.access_token;

            if (!!!request.headers['Content-Type'])
                request.headers['Content-Type'] = 'application/json';

            return request;
        },
        (error) => {
            return dispatch(connectionRequestErrorHandles(error))
                .then(originalRequestEdited => axios(originalRequestEdited))
                .catch(err => Promise.reject(err))
        });

    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            return dispatch(connectionResponseErrorHandles(error))
                .then(originalRequestEdited => axios(originalRequestEdited))
                .catch(err => Promise.reject(err))
        });
}

export const connectionRequestErrorHandles = (error) => (dispatch, getState) => {
    console.log("CONNECTION_REQUEST_ERROR !!!! no controlado.");
    dispatch({type: 'CONNECTION_REQUEST_ERROR', payload: error});
    return Promise.reject(error);
}

export const connectionResponseErrorHandles = (error) => (dispatch, getState) => {
    if (!!!error.response) {
        dispatch({type: 'CONNECTION_NETWORK_ERROR', payload: error});
        return Promise.reject(error);
    }
    if (error.response.status === 401) {
        const data = {grant_type: 'refresh_token', refresh_token: getState().authenticationStore.token.refresh_token};
        return dispatch(token(data))
            .then(() => error.config)
            .catch(() => Promise.reject(error))
    }
    dispatch({type: 'CONNECTION_RESPONSE_ERROR', payload: error});
    return Promise.reject(error);
}

export const token=(data)=>(dispatch, getState) => {
    var grantType = (data.grant_type === 'refresh_token')?'REFRESH':'GET';

    dispatch({type: 'AUTHENTICATION_TOKEN_'+grantType, payload: data.grant_type});
    return axios.post(urlBase + 'token', queryString.stringify(data))
        .then(response => {
            dispatch({type: 'AUTHENTICATION_TOKEN_'+grantType+'_SUCCESS', payload: response.data});
            return response.data;
        })
        .catch(error => {
            dispatch({type: 'AUTHENTICATION_TOKEN_'+grantType+'_FAILURE', payload: error});
            return Promise.reject(error);
        })
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
