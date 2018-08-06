import * as conn from "../../_helpers/connection";
import { remoteTokenUrl, storageKey } from './';
import * as queryString from 'querystring'

//public

export const logout = (history) => (dispatch, getState) => {
    dispatch({type: 'AUTHENTICATION_LOGOUT'});
    _logout(history);
}

export const autoLogin = (history) => (dispatch, getState) => {
    var localData =  conn.storageGet(storageKey);
    dispatch({type: 'AUTHENTICATION_LOGIN', payload: 'autoLogin'});
    if (!!localData && !!localData['access_token']) {
        dispatch({type: 'AUTHENTICATION_LOGIN_SUCCESS', payload: 'autoLogin'});
        _login(null, history);
    } else {
        dispatch({type: 'AUTHENTICATION_LOGIN_FAILURE', payload: 'autoLogin'});
        _logout();
    }
}

export const login = (data,history) => (dispatch, getState) => {
    dispatch({type: 'AUTHENTICATION_LOGIN', payload: data.grant_type});
    return conn.post(remoteTokenUrl, queryString.stringify(data), { headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
        .then(json => {
            dispatch({type: 'AUTHENTICATION_LOGIN_SUCCESS', payload: json});
            _login(json, history);
        })
        .catch(error => {
            dispatch({type: 'AUTHENTICATION_LOGIN_FAILURE', payload: error});
            _logout();
        })
}




//Private

const _login = (data,history) => {
    if (!!data) conn.storageSet(storageKey, data);
    if (!!history) history.push('/');
}

const _logout = (history) => {
    conn.storageSet(storageKey, null);
    if (!!history) history.push('/');
}

