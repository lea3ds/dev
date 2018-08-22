import {get} from "../_helpers/dispatchers";

export function getIncomeArray() {
    return get("INCOME_ARRAY_GET", "IncomeArray");
}

export function getIncomeCategoryArray(key) {
    return get("INCOMECATEGORY_ARRAY_GET", "IncomeCategoryArray", key);
}

export function getWaytopayArray(key) {
    return get("WAYTOPAY_ARRAY_GET", "WaytopayArray", key);
}















































// ************************************************************************************************
// **   Income                  *******************************************************************
// ************************************************************************************************


// export function getIncome(key) {
//     var url = "Income";
//     var reducer = "INCOME_GET";
//     return (dispatch, getState) => {
//         dispatch({ type: reducer + '_REQUEST' });
//         fetchHelper.fetchGet(url, key)
//             .then(json => dispatch({ type: reducer + '_SUCCESS', payload: json }))
//             .catch(error => dispatch({ type: reducer + '_FAILURE', payload: error }))
//     }
// }s

// export function addIncome(data) {
//     var url = "Income";
//     var reducer = "INCOME_ADD";
//     return (dispatch, getState) => {
//         dispatch({ type: reducer + '_REQUEST' });
//         fetchHelper.fetchPost(url, data)
//             .then(json => dispatch({ type: reducer + '_SUCCESS', payload: json }))
//             .catch(error => dispatch({ type: reducer + '_FAILURE', payload: error }))
//     }
// }

// export function updIncome(key, data) {
//     var url = "Income";
//     var reducer = "INCOME_UPD";
//     return (dispatch, getState) => {
//         dispatch({ type: reducer + '_REQUEST' });
//         fetchHelper.fetchPut(url, key, data)
//             .then(json => dispatch({ type: reducer + '_SUCCESS', payload: json }))
//             .catch(error => dispatch({ type: reducer + '_FAILURE', payload: error }))
//     }
// }



















// function get(reducer, url, key) {
//     return (dispatch, getState) => {
//         dispatch({ type: reducer + '_REQUEST' });
//         fetchHelper.fetchGet(url, key)
//             .then(json => dispatch({ type: reducer + '_SUCCESS', payload: json }))
//             .catch(error => dispatch({ type: reducer + '_FAILURE', payload: error }))
//     }
// }

// export function getIncomeCategoryArray(key) {
//     return get("INCOMECATEGORY_ARRAY_GET", "IncomeCategoryArray", key);
// }

// export function getIncomeCategoryArray(key) {
//     var url = "IncomeCategoryArray";
//     var reducer = "INCOMECATEGORY_ARRAY_GET";
//     return (dispatch, getState) => {
//         dispatch({ type: reducer + '_REQUEST' });
//         fetchHelper.fetchGet(url, key)
//             .then(json => dispatch({ type: reducer + '_SUCCESS', payload: json }))
//             .catch(error => dispatch({ type: reducer + '_FAILURE', payload: error }))
//     }
// }
