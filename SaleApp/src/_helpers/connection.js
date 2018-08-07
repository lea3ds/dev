/*

import axios from "axios";

export function get(url, key) {
    key = !!key ? '/' + key : '';
    url = url+key;
    return axios.get(url)
        .then(response => Promise.resolve(response.data))
        .catch(error => Promise.reject(error))
}

export function post(url,data,config) {
    return axios.post(url,data,config)
        .then(response => Promise.resolve(response.data))
        .catch(error => Promise.reject(error))
}

export function put(url,key,data,config) {
    key = !!key ? '/' + key : '';
    url = url+key;
    return axios.put(url,data,config)
        .then(response => Promise.resolve(response.data))
        .catch(error => Promise.reject(error))
}
*/