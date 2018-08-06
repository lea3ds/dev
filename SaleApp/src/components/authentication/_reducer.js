const storageData = () => {
    let ret = {token_type: '', access_token: ''};
    let data = localStorage.getItem('AUTHENTICATION');
    if (!!!data) return ret;
    data = JSON.parse(data);
    ret.token_type = data.token_type;
    ret.access_token = data.access_token;
    return ret;
}

const initialState = {
    ...storageData(), // {token_type: '', access_token: ''}
    isAuthenticated: false,
    isAuthenticating: false,
};

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
