import * as conn from "../../../actions/connection";
import { remoteUrl } from './';
import * as queryString from 'querystring'

export const loadEmpty = (key) => (dispatch, getState) => {
    var emptyObject = { 'id': 0, 'name': '', 'disabled': false }
    return Promise.resolve(emptyObject);
}

export const load = (key) => (dispatch, getState) => {
    return conn.get(remoteUrl + '/Get', key)
        .then(json => {
            return Promise.resolve(json);
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

export const create = (data) => (dispatch, getState) => {
    return conn.post(remoteUrl + '/Create', data)
        .then(json => {
            dispatch({type: 'WAYTOPAY_MODIFIED', payload: json});
            return Promise.resolve(json);
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

export const save = (key, data) => (dispatch, getState) => {
    return conn.put(remoteUrl + '/Edit', key, data)
        .then(json => {
            dispatch({type: 'WAYTOPAY_MODIFIED', payload: json});
            return Promise.resolve(json);
        })
        .catch(error => {
            return Promise.reject(error);
        })
}


export const getToken = (data) => (dispatch, getState) => {
    dispatch({type: 'TOKEN_GET', payload: data});
    return conn.post('Token', queryString.stringify(data), {headers:  {'Content-Type': 'application/x-www-form-urlencoded'}})
        .then(json => {
            dispatch({type: 'TOKEN_GET_SUCCESS', payload: json});
            return Promise.resolve(json);
        })
        .catch(error => {
            dispatch({type: 'TOKEN_GET_FAILURE', payload: error});
            return Promise.reject(error);
        })
}
