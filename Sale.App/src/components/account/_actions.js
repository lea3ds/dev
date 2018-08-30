import {post,getTokenPassword} from "../../actions/connection";

export const login = (username,password) => (dispatch, getState) => {
    let data = {username: username, password: password};
    return dispatch(getTokenPassword(data));
}

export const logout = () => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        dispatch({type: 'TOKEN_KILL'});
        setTimeout(resolve, 2000);
    })
}

export const password = (passwordOld,passwordNew) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        let url = 'account/password';
        let data = {passwordOld: passwordOld, passwordNew: passwordNew};
        let reducer = 'ACCOUNT_PASSWORD';

        dispatch({type: reducer + '_REQUEST'});
        return post(url,data)
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
        let data = {username: username, password: password};
        let reducer = 'ACCOUNT_SIGNIN';

        dispatch({type: reducer + '_REQUEST'});
        return post(url,data)
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