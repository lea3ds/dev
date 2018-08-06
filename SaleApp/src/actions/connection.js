import axios from "axios";
var urlBase = process.env.REACT_APP_SERVER_ADDR;

export const configure = () => (dispatch, getState) => {

    axios.interceptors.request.use(
        (request) => {
            if (!request.headers['Authorization']) {
                let {token_type, access_token} = getState().authentication;
                if (!!auth) request.headers['Authorization'] = token_type + ' ' + access_token;
            }
            if (!request.headers['Content-Type']) request.headers['Content-Type'] = 'application/json';
            return request;
        },
        (error) => Promise.reject(requestErrorHandles(error)));

    axios.interceptors.response.use(
        (response) => response,
        (error) => Promise.reject(responseErrorHandles(error)));

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

export const storageGet=(key)=>{
    var data = localStorage.getItem(key);
    if (!!!data) return null;
    return JSON.parse(data);
}

export const storageSet=(key, data)=>{
    if (!!data) data = JSON.stringify(data); else data = null;
    localStorage.setItem(key, data);
}

const responseErrorHandles=(error)=>{
    if (401 === error.response.status) {
        console.log('ERROR 401');
    }
}

const requestErrorHandles=(error)=>{
    if (401 === error.response.status) {
        console.log('ERROR 401');
    }
}