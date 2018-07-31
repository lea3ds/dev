import * as fetchHelper from "../../../_helpers/fetchHelper";
import { remoteUrl } from './';

export const loadEmptyPayment = (key) => (dispatch, getState) => {
    var emptyObject = { 'id': 0, 'date': '2018-06-19', 'amount': 0, 'detail': '', 'category': null, 'pendingArray': [], 'fees': 1, }
    return Promise.resolve(emptyObject);
}

export const createPayment = (data) => (dispatch, getState) => {
    return fetchHelper.fetchPost(remoteUrl+'/Create', data)
        .then(json => { dispatch({ type: 'PAYMENT_MODIFIED', payload: json }); return Promise.resolve(json); })
        .catch(error => { return Promise.reject(error); })
}

export const loadPayment = (key) => (dispatch, getState) => {
    return fetchHelper.fetchGet(remoteUrl+'/Get', key)
        .then(json => { return Promise.resolve(json); })
        .catch(error => { return Promise.reject(error); })
}

export const savePayment = (key, data) => (dispatch, getState) => {
    return fetchHelper.fetchPut(remoteUrl+'/Edit', key, data)
        .then(json => { dispatch({ type: 'PAYMENT_MODIFIED', payload: json }); return Promise.resolve(json); })
        .catch(error => { return Promise.reject(error); })
}



