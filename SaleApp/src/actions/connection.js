import axios from "axios";
var urlBase = process.env.REACT_APP_SERVER_ADDR;

export function get(url, key) {
    url = urlBase + '/' + url;
    key = !!key ? '/' + key : '';
    return axios.get(url + '/' + key)
        .then(response => Promise.resolve(response.data))
        .catch(error => Promise.reject(error))
}

export function post(url, data, config) {
    url = urlBase + '/' + url;
    config = !!config ? config : {headers:  {'Content-Type': 'application/json'}};
    return axios.post(url, data, config)
        .then(response => {
            console.log("response--",response);
            return Promise.resolve(response);
        })
        .catch(error => {
            console.log("error--",error);
            return Promise.reject(error);
        })
}

export function put(url, key, data, config) {
    url = urlBase + '/' + url;
    key = !!key ? '/' + key : '';
    config = !!config ? config : {headers:  {'Content-Type': 'application/json'}};
    return axios.put(url + '/' + key, data, config)
        .then(response => Promise.resolve(response.data))
        .catch(error => Promise.reject(error))
}

export function put2(url, key, data, config) {
    url = urlBase + '/' + url;
    key = !!key ? '/' + key : '';
    //config = !!config ? config : {'Content-Type': 'application/json'};
    config = !!config ? config : {headers:  {'Content-Type': 'application/json'}};
    return axios.put(url + '/' + key, data, config)
        .then(response => Promise.resolve(response.data))
        .catch(error => Promise.reject(error))
}