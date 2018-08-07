import * as conn from "../../actions/connection";
import { remoteTokenUrl, storageKey } from './';
import * as queryString from 'querystring'

//public
const goHome=(history)=>{
    if (!!history) history.push('/');
}

export const logout = (history) => (dispatch, getState) => {
    dispatch({type: 'AUTHENTICATION_LOGOUT'});
    goHome(history);
}

export const autoLogin = (history) => (dispatch, getState) => {
    var localData =  conn.storageGet(storageKey);
    dispatch({type: 'AUTHENTICATION_LOGIN', payload: 'autoLogin'});
    if (!!localData && !!localData['access_token']) {
        dispatch({type: 'AUTHENTICATION_LOGIN_SUCCESS', payload: 'autoLogin'});
        goHome(history);
    } else {
        dispatch({type: 'AUTHENTICATION_LOGIN_FAILURE', payload: 'autoLogin'});
    }
}

export const login = (data,history) => (dispatch, getState) => {
    dispatch({type: 'AUTHENTICATION_LOGIN', payload: data.grant_type});
    return dispatch(conn.post(remoteTokenUrl, queryString.stringify(data), { headers: {'Content-Type': 'application/x-www-form-urlencoded'} }))
        .then(json => {
            dispatch({type: 'AUTHENTICATION_LOGIN_SUCCESS', payload: json});
            goHome(history);
        })
        .catch(error => {
            dispatch({type: 'AUTHENTICATION_LOGIN_FAILURE', payload: error});
        })
}
