import axios from "axios";
import * as queryString from 'querystring'
var urlBase = process.env.REACT_APP_SERVER_ADDR;
const TOKEN_PATH = 'token';

export const contentTypeHeader = {
    json: 'application/json',
    urlencoded: 'application/x-www-form-urlencoded',
};

export const storageKeys = {
    authorization:'AUTHORIZATION',
    authenticating : 'connection.authenticating',
    transactionId :'connection.transactionId',
}


export const authorization_valid=()=> {
    var data = storageGet(storageKeys.authorization);
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
    return storageGet(storageKeys.authorization);
}

export const authorization_set=(data)=> {
    if (!!data) {
        // if (!!!data.expires_in) data.expires_in = -1;
        // data.expires_in = 20;
        // var now = moment();
        // var requestTime = now.unix();
        // var expireTime = now.add(data.expires_in, 's').unix();
        // storageSet(AUTHORIZATION_STORAGE,{...data,requestTime: requestTime,expireTime: expireTime});
        storageSet(storageKeys.authorization,{...data});
    }else{
        storageSet(storageKeys.authorization);
    }
}

const ping = () => {
    var url = authorization_valid()?'account/ping':'accountPublic/ping';
    get(url)
        //.then(e=>console.log("PING OK: ",url,"DATA: ",e))
        //.catch(e=>console.log("PING ERROR: ",url," -> ",e));
        .catch(e=>null);
}

//++ CONFIGURE
export const configure = () =>  (dispatch, getState) => {
    ping();
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
            console.log('axios.interceptors.request [error]',error);
            return Promise.reject(error);
        });

    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            return dispatch(connectionResponseErrorHandles(error))
                .then(originalRequestEdited => axios(originalRequestEdited))
                .catch(err =>  Promise.reject(err))
        });
}

export const connectionResponseErrorHandles = (error) => (dispatch, getState) => {

    if (error.response.status === 401) { // refresh_token
        return dispatch(getTokenRefresh())
            .then(() => error.config)
            .catch(() => Promise.reject(error))
    }

    if (error.response.status === 400 && error.config.url.includes(TOKEN_PATH)) { // refresh_token
        return dispatch(killToken())
            .then(()=>Promise.reject(error))
    }

    return Promise.reject(error);
}

const errorProcess=(e) => {
    if (!!!e) return null;
    if (!!e.response && !!e.response.status) return {type:'statusCode' + e.response.status}
    if (!!!e.response) return {type:'connectionLost'};
    if (!!e.type) return {type:e.type};
    return null;
}

const inTransaction = async (fun, url, data, config) => {
    var maxRetries = 3;
    var errorResponse;
    let newId = storageGet(storageKeys.transactionId);
    if (!!newId) newId = parseInt(newId) + 1; else newId = 1;
    storageSet(storageKeys.transactionId, newId);

    for (let i = 1; i <= maxRetries; i++) {
        try {
            if (storageGet(storageKeys.authenticating) === true) throw {type: 'authenticating'};
            return await fun(url, {...data, transactionId: newId}, config)
                .then((e) => {
                    let error = errorProcess(e.data.error)
                    if (!!error) throw error;
                    return e;
                });
        } catch (e) {
            errorResponse = errorProcess(e);
            console.warn("Attempt:", i, " Error:", errorResponse);
            if (errorResponse.type === 'authenticating')
                await new Promise(resolve => setTimeout(resolve, 500));
            if (errorResponse.type === 'connectionLost')
                maxRetries=0;
        }
    }

    return Promise.reject(errorResponse);
};
//-- CONFIGURE

//++ TOKEN
export const killToken=()=>(dispatch, getState) => {
    authorization_set();
    storageSet(storageKeys.authenticating, false);
    dispatch({type: 'TOKEN_KILL'});
}

export const getTokenPassword=(data)=> (dispatch, getState) => {
    let url = urlBase + TOKEN_PATH;
    data = {...data, grant_type: 'password'};
    let config = {headers: {'Content-Type': contentTypeHeader.urlencoded}};
    let reducer = 'TOKEN_PASSWORD_GET';

    authorization_set();
    storageSet(storageKeys.authenticating, true);
    dispatch({type: reducer + '_REQUEST'});
    return axios.post(url, data, config)
        .then(x => {
                authorization_set(x.data);
                storageSet(storageKeys.authenticating, false);
                dispatch({type: reducer + '_SUCCESS', payload: x.data});
                return x;
            }
        )
        .catch(x => {
            authorization_set();
            storageSet(storageKeys.authenticating, false);
            dispatch({type: reducer + '_FAILURE'});
            return Promise.reject(x);
        })
}

export const getTokenRefresh=()=> (dispatch, getState) => {
    var auth = authorization_get();
    if (!!!auth || !!!auth.refresh_token) return Promise.reject();

    let url = urlBase + TOKEN_PATH;
    let data = {grant_type: 'refresh_token', refresh_token: auth.refresh_token};
    let config = {headers: {'Content-Type': contentTypeHeader.urlencoded}};

    authorization_set();
    storageSet(storageKeys.authenticating, true);
    let reducer = 'TOKEN_REFRESH_GET';
    dispatch({type: reducer + '_REQUEST'});
    return axios.post(url,data,config)
        .then(x => {
                authorization_set(x.data);
                storageSet(storageKeys.authenticating, false);
                dispatch({type: reducer + '_SUCCESS', payload: x.data});
                return x;
            }
        )
        .catch(x => {
            authorization_set();
            storageSet(storageKeys.authenticating, false);
            dispatch({type: reducer + '_FAILURE'});
            return Promise.reject(x);
        })
}
//-- TOKEN


//++ LocalStorage
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
//-- LocalStorage


//++ REST
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
//-- REST