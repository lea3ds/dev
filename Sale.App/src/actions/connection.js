import axios from "axios";
import * as queryString from 'querystring'
import moment from "moment/moment";
var urlBase = process.env.REACT_APP_SERVER_ADDR;


var AUTHORIZATION_STORAGE = 'AUTHORIZATION';

export const authorization_valid=(data)=> {
    var data = storageGet(AUTHORIZATION_STORAGE);
    try {
        if (!!data
            && !!data.token_type
            && !!data.access_token
            && !!data.refresh_token
            && !!data.expireTime
            &&  (data.expireTime - moment().unix())>0
        ) return true;
    }
    catch(ex) {}
    return false;
}

export const authorization_get=()=> {
    return storageGet(AUTHORIZATION_STORAGE);
}

export const authorization_set=(data)=> {
    if (!!data) {
        if (!!!data.expires_in) data.expires_in = -1;
        data.expires_in = 20;
        var now = moment();
        var requestTime = now.unix();
        var expireTime = now.add(data.expires_in, 's').unix();
        storageSet(AUTHORIZATION_STORAGE,{...data,requestTime: requestTime,expireTime: expireTime});
    }else{
        storageSet(AUTHORIZATION_STORAGE);
    }
}

export const configure = () =>  (dispatch, getState) => {
    axios.interceptors.request.use(
        (request) => {
            // if (request.url.includes('token')) {
            //     delete request.headers['Authorization'];
            //     request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            //     return request;
            // }

            if (authorization_valid()) {
                var auth = authorization_get();
                request.headers['Authorization'] = auth.token_type + ' ' + auth.access_token;
            }

            // var {isAuthenticated, token} = getState().authenticationStore;
            // if (isAuthenticated === true)
            //     request.headers['Authorization'] = token.token_type + ' ' + token.access_token;

            if (!!!request.headers['Content-Type'])
                request.headers['Content-Type'] = 'application/json';
            console.log("RESQUEST -> ",request);
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
        return dispatch(refresh_token())
            .then(() => error.config)
            .catch(() => Promise.reject(error))
    }

    // if (error.response.status === 401) {
    //     const data = {grant_type: 'refresh_token', refresh_token: getState().authenticationStore.token.refresh_token};
    //     return dispatch(token(data))
    //         .then(() => error.config)
    //         .catch(() => Promise.reject(error))
    // }

    // if (error.response.status === 400 && error.config.url.includes('token')) {
    //     dispatch({type: 'AUTHENTICATION_LOGOUT', payload: error});
    //     return Promise.reject(error);
    // }

    dispatch({type: 'CONNECTION_RESPONSE_ERROR', payload: error});
    return Promise.reject(error);
}

const refresh_token=()=> (dispatch, getState) => {
    var auth = authorization_get();
    if (!!!auth.refresh_token) return Promise.reject();

    let url = 'token';
    let data = queryString.stringify({grant_type: 'refresh_token', refresh_token: auth.refresh_token});
    let config = {headers: {'Content-Type': 'application/x-www-form-urlencoded'}};

    let reducer = 'ACCOUNT_LOGIN';
    dispatch({type: reducer + '_REQUEST', payload: 'refresh_token'});
    return post(url,data,config)
        .then(x => {
            console.log("x",x);
            dispatch({type: reducer + '_SUCCESS', payload: x.data});
            return x;
        })
        .catch(x => {
            console.log("x error ",x);
            dispatch({type: reducer + '_FAILURE'});
            return Promise.reject(x);
        })
}

export const token=(data)=>(dispatch, getState) => {
    var grantType = '';
    (data.grant_type === 'refresh_token')?'_REFRESH':'_GET';
    dispatch({type: 'AUTHENTICATION_TOKEN'+grantType, payload: data.grant_type});
    return axios.post(urlBase + 'token', queryString.stringify(data))
        .then(response => {
            dispatch({type: 'AUTHENTICATION_TOKEN'+grantType+'_SUCCESS', payload: response.data});
            return response.data;
        })
        .catch(error => {
            dispatch({type: 'AUTHENTICATION_TOKEN'+grantType+'_FAILURE', payload: error});
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

// export const post=(url,data,config) => (dispatch, getState) => {
//     url = urlBase + url;
//     return axios.post(url, data, config)
//         .then(response => Promise.resolve(response.data))
//         .catch(error => Promise.reject(error))
// }

export const post=(url,data,config)=> {
    url = urlBase + url;
    return axios.post(url, data, config);
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







export const account_login=(data)=>{
    return axios.post(urlBase + 'token', queryString.stringify(data))
}

export const account_password=(data)=>{
    return axios.post(urlBase + 'account' + '/' + 'password', data)
}