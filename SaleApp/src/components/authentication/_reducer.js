
const initialState = { isAuthenticated: false, isAuthenticating: false };

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'AUTHENTICATION_LOGOUT' :
            return {...state, isAuthenticated: false, isAuthenticating: false};
        case 'AUTHENTICATION_LOGIN' :
            return {...state, isAuthenticated: false, isAuthenticating: true};
        case 'AUTHENTICATION_LOGIN_SUCCESS' :
            return {...state, isAuthenticated: true, isAuthenticating: false};
        case 'AUTHENTICATION_LOGIN_FAILURE' :
            return {...state, isAuthenticated: false, isAuthenticating: false};

        default:
            return state
    }
}

export default reducer;
