import axios from "axios";
import * as queryString from 'querystring'
import moment from "moment/moment";
import {routes, strings} from "../components/account";
var urlBase = process.env.REACT_APP_SERVER_ADDR;


export const storageAuthenticating = "connection.authenticating";
const storageAuthorization = 'AUTHORIZATION';
const storageTransactionId = "connection.transactionId";
const connectionError = 'connectionError';
const isAuthenticatingError = 'isAuthenticatingError';
const contentTypeHeader = {json:'application/json', urlencoded:'application/x-www-form-urlencoded'};


export const authorization_valid=(data)=> {
    var data = storageGet(storageAuthorization);
    try {
        if (!!data
            && !!data.token_type
            && !!data.access_token
            && !!data.refresh_token
            //&& !!data.expireTime
            //&&  (data.expireTime - moment().unix())>0
        ) return true;
    }
    catch(ex) {}
    return false;
}

export const authorization_get=()=> {
    return storageGet(storageAuthorization);
}

export const authorization_set=(data)=> {
    if (!!data) {
        // if (!!!data.expires_in) data.expires_in = -1;
        // data.expires_in = 20;
        // var now = moment();
        // var requestTime = now.unix();
        // var expireTime = now.add(data.expires_in, 's').unix();
        // storageSet(AUTHORIZATION_STORAGE,{...data,requestTime: requestTime,expireTime: expireTime});
        storageSet(storageAuthorization,{...data});
    }else{
        storageSet(storageAuthorization);
    }
}

const ping = () => {
    var url = authorization_valid()?'account/ping':'accountPublic/ping';
    get(url)
        .then(e=>console.log("PING OK: ",url,"DATA: ",e))
        .catch(e=>console.log("PING URL: ",url,"ERROR: ",e));
}


export const configure = () =>  (dispatch, getState) => {

    setInterval(() => ping(), 10000);

    axios.interceptors.request.use(
        (request) => {

            if (authorization_valid()) {
                var auth = authorization_get();
                request.headers['Authorization'] = auth.token_type + ' ' + auth.access_token;
            }

            if (!!!request.headers['Content-Type'])
                request.headers['Content-Type'] = contentTypeHeader.json;

            if (request.headers['Content-Type'] === contentTypeHeader.urlencoded)
                request.data = queryString.stringify(request.data);

            return request;
        },
        (error) => {
            dispatch({type: 'CONNECTION_REQUEST_ERROR', payload: error});
            return Promise.reject(error);
        });

    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            return dispatch(connectionResponseErrorHandles(error))
                .then(originalRequestEdited => axios(originalRequestEdited))
                .catch(err => Promise.reject(err))
        });
}

export const connectionResponseErrorHandles = (error) => (dispatch, getState) => {
    // if (!!!error.response) {
    //     dispatch({type: 'CONNECTION_NETWORK_ERROR', payload: error});
    //     return Promise.reject(error);
    // }

    if (error.response.status === 401) {
        return dispatch(refresh_token())
            .then(() => error.config)
            .catch(() => Promise.reject(error))
    }

    // if (error.response.status === 400 && error.config.url.includes('token')) {
    //     dispatch({type: 'AUTHENTICATION_LOGOUT', payload: error});
    //     return Promise.reject(error);
    // }

    // dispatch({type: 'CONNECTION_RESPONSE_ERROR', payload: error});
    return Promise.reject(error);
}

const refresh_token=()=> (dispatch, getState) => {
    var auth = authorization_get();
    if (!!!auth || !!!auth.refresh_token) return Promise.reject();

    let url = urlBase + 'token';
    let data = {grant_type: 'refresh_token', refresh_token: auth.refresh_token};
    let config = {headers: {'Content-Type': contentTypeHeader.urlencoded}};
    let reducer = 'REFRESH_TOKEN';

    dispatch({type: reducer + '_REQUEST'});
    return axios.post(url,data,config)
        .then(x => {dispatch({type: reducer + '_SUCCESS', payload: x.data});return x;})
        .catch(x => {dispatch({type: reducer + '_FAILURE'});return Promise.reject(x);})
}


// LocalStorage
export const storageGet=(key) => {
    var data = localStorage.getItem(key);
    if (data===undefined) data = null;
    return JSON.parse(data);
}

export const storageSet=(key, data)=>{
    if (data===undefined) data = null;
    data = JSON.stringify(data);
    localStorage.setItem(key, data);
}


// REST
const inTransaction = async (fun, url, data, config) =>{
    var maxRetries = 3;

    var error;
    let newId = storageGet(storageTransactionId);
    if(!!newId) newId = parseInt(newId)+1; else newId=1;
    storageSet(storageTransactionId,newId);

    for(let i = 0; i < maxRetries; i++) {
        try {
            if (storageGet(storageAuthenticating) === true) throw isAuthenticatingError;
            return await fun(url, {...data, transactionId: newId}, config);
        }catch(e) {

            // {Message: "An error has occurred.", ExceptionMessage: "Hola", ExceptionType: "System.ApplicationException", StackTrace: "... bla bla ..."}
            if (!!e.response) error = {type: e.response.data.ExceptionType, message: e.response.data.ExceptionMessage};
            if (!!!e.response) error = {type: connectionError};
            if (e === isAuthenticatingError) error = {type: isAuthenticatingError};

            console.warn("Attempt:", i + 1, " Error:", error.type, error.message);

            if (error.type === isAuthenticatingError) {
                maxRetries = 5;
                await new Promise(resolve => setTimeout(resolve, 250));
            }

            if (error.type === connectionError) {
                await new Promise(resolve => setTimeout(resolve, 500));
            }

        }
    }
    return Promise.reject(error);
};

export const get=(url, key, config) => {
    key = !!key ? '/' + key : '';
    url = urlBase + url + key;
    return inTransaction(axios.get, url, null, config);
}

export const post=(url,data,config)=> {
    url = urlBase + url;
    return inTransaction(axios.post, url, data, config);
}

export const put=(url,key,data,config)=> {
    key = !!key ? '/' + key : '';
    url = urlBase + url + key;
    return inTransaction(axios.put, url, data, config);
}