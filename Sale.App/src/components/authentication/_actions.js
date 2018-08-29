import * as conn from "../../actions/connection";
import { remoteTokenUrl, storageKey } from './';

//public
const goHome=(history)=>{
    if (!!history)
        //history.goBack();
        history.push('/');
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
    console.log(history)
    // return dispatch(conn.token(data))
    //     .then(json => {
    //         goHome(history);
    //     })
    //     .catch(error => {
    //         console.log("LOGIN ERROR ", error)
    //     })
}
