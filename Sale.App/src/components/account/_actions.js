import * as conn from "../../actions/connection";
import * as queryString from 'querystring'

export const login = (username,password) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        let url = 'token';
        let data = queryString.stringify({grant_type: 'password', username: username, password: password});
        let reducer = 'ACCOUNT_LOGIN';

        dispatch({type: reducer + '_REQUEST', payload: data.grant_type});
        return conn.post(url,data)
            .then(x => {
                dispatch({type: reducer + '_SUCCESS', payload: x.data});
                return resolve(x);
            })
            .catch(x => {
                dispatch({type: reducer + '_FAILURE'});
                return reject(x);
            })
    })
}

export const logout = () => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        let reducer = 'ACCOUNT_LOGOUT';
        dispatch({type: reducer + '_REQUEST'});
        setTimeout(resolve, 2000);
    })
}

export const password = (passwordOld,passwordNew) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        let url = 'account/passwordNew';
        let data = {passwordOld: passwordOld, passwordNew: passwordNew};
        let reducer = 'ACCOUNT_PASSWORD';

        dispatch({type: reducer + '_REQUEST'});
        return conn.post(url,data)
            .then(x => {
                dispatch({type: reducer + '_SUCCESS'});
                return resolve(x);
            })
            .catch(x => {
                dispatch({type: reducer + '_FAILURE'});
                return reject(x);
            })
    })
}

export const signin = (username,password) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        let url = 'accountpublic/signin';
        let data = {username: username, passwordNew: password};
        let reducer = 'ACCOUNT_SIGNIN';

        dispatch({type: reducer + '_REQUEST'});
        return conn.post(url,data)
            .then(x => {
                dispatch({type: reducer + '_SUCCESS', payload: x.data});
                return resolve(x);
            })
            .catch(x => {
                dispatch({type: reducer + '_FAILURE'});
                return reject(x);
            })
    })
}