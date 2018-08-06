import axios from "axios";
import { storageKey } from '../components/authentication';
var urlBase = process.env.REACT_APP_SERVER_ADDR;

export const configure = () => {
    axios.interceptors.request.use(
        (request) => {
            if (!request.headers['Authorization']) {
                var auth = storageGet(storageKey);
                if (!!auth) request.headers['Authorization'] = auth['token_type'] + ' ' + auth['access_token'];
            }
            if (!request.headers['Content-Type']) request.headers['Content-Type'] = 'application/json';
            return request;
        },
        (error) => {
            console.log("axios.interceptors.request[error]", error);
            return Promise.reject(error);
        }
    );

    axios.interceptors.response.use(
        (response) => {
            return response;
        }, (error) => {
            if (401 === error.response.status) {
                storageSet(storageKey);
                console.log('ERROR 401 - Clear [' + storageKey + ']');
            }
            console.log("axios.interceptors.response[error]", error);
            return Promise.reject(error);
        });
}

export function get(url, key) {
    key = !!key ? '/' + key : '';
    url = urlBase + url+key;
    return axios.get(url)
        .then(response => Promise.resolve(response.data))
        .catch(error => Promise.reject(error))
}

export function post(url,data,config) {
    url = urlBase + url;
    return axios.post(url,data,config)
        .then(response => Promise.resolve(response.data))
        .catch(error => Promise.reject(error))
}

export function put(url,key,data,config) {
    key = !!key ? '/' + key : '';
    url = urlBase + url+key;
    return axios.put(url,data,config)
        .then(response => Promise.resolve(response.data))
        .catch(error => Promise.reject(error))
}

export function storageGet(key) {
    var data = localStorage.getItem(key);
    if (!!!data) return null;
    return JSON.parse(data);
}

export function storageSet(key, data) {
    if (!!data) data = JSON.stringify(data); else data = null;
    localStorage.setItem(key, data);
}
