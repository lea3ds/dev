import { disp } from "../_helpers/dispatchers";

export function openDrawer() {
    return disp("DRAWER_OPEN");
}

export function closeDrawer() {
    return disp("DRAWER_CLOSE");
}

export function pushHistory(data) {
    return disp("DRAWER_CLOSE", data);
}