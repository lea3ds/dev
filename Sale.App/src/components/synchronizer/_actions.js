import * as conn from "../../actions/connection";
import { remoteUrl } from './';

export const sync = () => (dispatch, getState) => {
    var arrays = getState().dataArrays;
    var syncStateIsFetching = arrays.syncStateIsFetching;
    var timeToExpired = Math.trunc((arrays.syncStateExpiredTime - new Date().getTime()) / 1000);

    if (timeToExpired < 0 && !syncStateIsFetching) {
        var reducer = 'DATA_SYNC';
        var url = 'Synchronizator/Sync';
        var data = arrays.syncState;
        dispatch({ type: reducer + '_REQUEST', payload: { url, data } });
        dispatch(conn.post(url, data))
            .then(json => {dispatch({ type: reducer + '_SUCCESS', payload: json }); })
            .catch(error => {dispatch({ type: reducer + '_FAILURE', payload: error }); })
    } else {
        if (syncStateIsFetching) console.log("DATA_SYNC -> Slow connection: ", arrays.syncStateExpiredInterval - timeToExpired);
        if (!syncStateIsFetching && timeToExpired < 0) console.log("DATA_SYNC -> Expired time: ", timeToExpired);
    }
}
