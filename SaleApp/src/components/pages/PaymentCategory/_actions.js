import * as fetchHelper from "../../../_helpers/fetchHelper";
import { remoteUrl } from './';

export const loadEmpty = (key) => (dispatch, getState) => {
    var emptyObject = { 'id': 0, 'name': '', 'disabled': false }
    return Promise.resolve(emptyObject);
}

export const load = (key) => (dispatch, getState) => {
    return fetchHelper.fetchGet(remoteUrl+'/Get', key)
        .then(json => { return Promise.resolve(json); })
        .catch(error => { return Promise.reject(error); })
}

export const create = (data) => (dispatch, getState) => {
    return fetchHelper.fetchPost(remoteUrl+'/Create', data)
        .then(json => { dispatch({ type: 'PAYMENT_CATEGORY_MODIFIED', payload: json }); return Promise.resolve(json); })
        .catch(error => { return Promise.reject(error); })
}

export const save = (key, data) => (dispatch, getState) => {
    return fetchHelper.fetchPut(remoteUrl+'/Edit', key, data)
        .then(json => { dispatch({ type: 'PAYMENT_CATEGORY_MODIFIED', payload: json }); return Promise.resolve(json); })
        .catch(error => { return Promise.reject(error); })
}



