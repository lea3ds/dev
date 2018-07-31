import {disp, get, post, put } from "../_helpers/dispatchers";

export function initialize() {
    return disp("INITIALIZE_INCOME");
}

export function setHasError(data) {
    return disp("HASERROR_INCOME_SET",data);
}

export function setCurrent(data) {
    return disp("CURRENT_INCOME_SET",data);
}

export function getCurrent(key) {
    return get("CURRENT_INCOME_GET", "Income", key);
}

export function getCurrentEmpty() {
    return disp("CURRENT_INCOME_EMPTY_GET");
}

export function addCurrent(data) {
    return post("CURRENT_INCOME_ADD", "Income", data);
}

export function updCurrent(key, data) {
    return put("CURRENT_INCOME_UPD", "Income", key, data);
}