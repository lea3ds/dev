import * as fetchHelper from "./fetchHelper";
//setInterval(resolve, 5000);

// export function disp(reducer, payload) {
//     return dispatch => { dispatch({ type: reducer, payload: payload }) }
// }

export const disp = (reducer, payload) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: reducer, payload: payload });
        resolve(payload);
    });
}

// export function get(reducer, url, key) {
//     return (dispatch, getState) => {
//         dispatch({ type: reducer + '_REQUEST' });
//         fetchHelper.fetchGet(url, key)
//             .then(json => dispatch({ type: reducer + '_SUCCESS', payload: json }))
//             .catch(error => dispatch({ type: reducer + '_FAILURE', payload: error }))
//     }
// }

export const get2 = (reducer, url, key) => (dispatch, getState) => {
    console.log(reducer, url, key)
    dispatch({ type: reducer + '_REQUEST', payload: { url, key } });
    return fetchHelper.fetchGet(url, key)
        .then(json => { dispatch({ type: reducer + '_SUCCESS', payload: json }); return Promise.resolve(json); })
        .catch(error => { dispatch({ type: reducer + '_FAILURE', payload: error }); return Promise.reject(error); })
}


export const get = (reducer, url, key) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: reducer + '_REQUEST', payload: { url, key } });
        fetchHelper.fetchGet(url, key)
            .then(json => { dispatch({ type: reducer + '_SUCCESS', payload: json }); resolve(json); })
            .catch(error => { dispatch({ type: reducer + '_FAILURE', payload: error }); reject(error); })
    });
}


// export function post(reducer, url, data) {
//     return (dispatch, getState) => {
//         dispatch({ type: reducer + '_REQUEST' });
//         fetchHelper.fetchPost(url, data)
//             .then(json => dispatch({ type: reducer + '_SUCCESS', payload: json }))
//             .catch(error => dispatch({ type: reducer + '_FAILURE', payload: error }))
//     }
// }

export const post = (reducer, url, data) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
         dispatch({ type: reducer + '_REQUEST', payload: { url, data } });
        fetchHelper.fetchPost(url, data)
            .then(json => { dispatch({ type: reducer + '_SUCCESS', payload: json }); resolve(json); })
            .catch(error => { dispatch({ type: reducer + '_FAILURE', payload: error }); reject(error); })
    });
}

// export function put(reducer, url, key, data) {
//     return (dispatch, getState) => {
//         dispatch({ type: reducer + '_REQUEST' });
//         fetchHelper.fetchPut(url, key, data)
//             .then(json => dispatch({ type: reducer + '_SUCCESS', payload: json }))
//             .catch(error => dispatch({ type: reducer + '_FAILURE', payload: error }))
//     }
// }

export const put = (reducer, url, key, data) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: reducer + '_REQUEST', payload: { url, key, data } });
        fetchHelper.fetchPut(url, key, data)
            .then(json => { dispatch({ type: reducer + '_SUCCESS', payload: json }); resolve(json); })
            .catch(error => { dispatch({ type: reducer + '_FAILURE', payload: error }); reject(error); })
    });
}

export const loadClient = (reducer, clientName, clientSrc) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: reducer + '_REQUEST' });
        var js, fjs = document.getElementsByTagName('script')[0];
        if (document.getElementById(clientName)) document.getElementById(clientName).remove();
        js = document.createElement('script');
        js.clientName = clientName;
        js.src = clientSrc;
        fjs.parentNode.insertBefore(js, fjs);
        js.onload = (response) => {
            if (response.error) dispatch({ type: reducer + '_FAILURE', payload: response.error })
            dispatch({ type: reducer + '_SUCCESS', payload: response })
            resolve();
        };
        js.onerror = (error) => {
            dispatch({ type: reducer + '_FAILURE', payload: error })
            reject(error);
        }
    });
}





export const getLocalStorage = (key) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        var reducer = "LOCALSTORE_" + key + "_GET";
        dispatch({ type: reducer + '_REQUEST' });
        try {
            let serializedData = localStorage.getItem(key);
            if (serializedData === null) reject();
            dispatch({ type: reducer + '_SUCCESS', payload: JSON.parse(serializedData) })
            resolve(JSON.parse(serializedData));
        } catch (error) {
            dispatch({ type: reducer + '_FAILURE', payload: error })
            reject(error);
        }
    });
}

export const setLocalStorage = (key, data) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        try {
            let serializedData = JSON.stringify(data);
            localStorage.setItem(key, serializedData);
            resolve();
        } catch (err) {
            reject(err);
        }
    });
}
/*
export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        console.log(err);
    }
};
*/
