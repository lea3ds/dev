//import * as fetchHelper from "../_helpers/fetchHelper";
import * as conn from "../_helpers/connection";

//import { setLocalStorage, getLocalStorage, disp, post } from "../_helpers/dispatchers";


export const startLoadArrays = () => (dispatch, getState) => {
    setInterval(() => {
        var auth = getState().authenticationStore;
        var data = getState().dataArrays;

        if (!!auth && auth.isAuthenticated!==true) return null;

        var syncStateIsFetching = data.syncStateIsFetching;
        var timeToExpired = Math.trunc((data.syncStateExpiredTime - new Date().getTime()) / 1000);

        if (timeToExpired < 0 && !syncStateIsFetching) {
            var reducer = 'DATA_SYNC';
            var url = 'Synchronizator/Sync';
            var data = data.syncState;;
            dispatch({ type: reducer + '_REQUEST', payload: { url, data } });
            conn.post(url, data)
                .then(json => { dispatch({ type: reducer + '_SUCCESS', payload: json }); })
                .catch(error => { dispatch({ type: reducer + '_FAILURE', payload: error }); })
        } else {
            if (syncStateIsFetching) console.log("DATA_SYNC -> Slow connection: ", data.syncStateExpiredInterval - timeToExpired);
            if (!syncStateIsFetching && timeToExpired < 0) console.log("DATA_SYNC -> Expired time: ", timeToExpired);
        }
    }, 1000);

}

/*
export const post2 = () => (dispatch, getState) => {
    setInterval(() => {
        var nowTime = new Date().getTime();
        var syncTime = localStorage.getItem("autoSyncTimeSpan");

        if (!!!syncTime || syncTime < nowTime) {
            syncTime = nowTime + 1000 * 10;
            localStorage.setItem("autoSyncTimeSpan", JSON.stringify(syncTime));

            dispatch(post("DATA_SYNC", "SyncData", getState().dataArrays.syncState))
                .then(json => {
                    localStorage.setItem("autoSyncData", JSON.stringify(getState().dataArrays));
                })
                .catch(error => { console.log('Error en POST -> ', error); })
        } else {
            console.log('FALTA FALTA FALTA : ', Math.trunc((syncTime - nowTime) / 1000));
        }


    }, 1000);
}

export const startAutoSync = () => (dispatch, getState) => {
    setInterval(() => {
        dispatch(getLocalStorage("DATA_ARRAY"))
            .then(storageData => {
                if (!!!storageData.syncStateTimeSpan || storageData.syncStateTimeSpan < new Date().getTime()) {
                    dispatch(post("DATA_SYNC", "SyncData", storageData.syncState))
                        .then(json => { dispatch(setLocalStorage("DATA_ARRAY", getState().dataArrays)); })
                        .catch(error => { console.log('Error en POST -> ', error); })
                } else {
                    console.log('FALTA FALTA FALTA', (storageData.syncStateTimeSpan - new Date().getTime()) / 1000);
                }
            })
            .catch(error => {
                console.log('INICIALIZO STORAGE', error);
                dispatch(setLocalStorage("DATA_ARRAY", getState().dataArrays))
            })

    }, 2000);

}
*/