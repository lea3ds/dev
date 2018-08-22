import * as conn from "../../../_helpers/connection";
import { remoteUrl } from './';

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
            dispatch({type: 'WAYTOPAY_TYPE_MODIFIED', payload: json});
            return Promise.resolve(json);
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

export const save = (key, data) => (dispatch, getState) => {
    return conn.put(remoteUrl + '/Edit', key, data)
        .then(json => {
            dispatch({type: 'WAYTOPAY_TYPE_MODIFIED', payload: json});
            return Promise.resolve(json);
        })
        .catch(error => {
            return Promise.reject(error);
        })
}
