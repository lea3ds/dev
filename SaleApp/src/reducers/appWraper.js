
const initialState = {
    drawerOpened: false,
    loggedIn: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case "DRAWER_OPEN": return { ...state, drawerOpened: true };
        case "DRAWER_CLOSE": return { ...state, drawerOpened: false };

        default: return state
    }
}

export default reducer;
