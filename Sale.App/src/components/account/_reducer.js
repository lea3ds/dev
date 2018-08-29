import {authorization_set, authorization_valid, storageSet,storageAuthenticating} from '../../actions/connection';

const initialState = {
    isAuthenticated: authorization_valid(),
};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case 'AUTHENTICATION_LOGOUT' :
            authorization_set();
            return {...state, isAuthenticated: authorization_valid()};


        case 'ACCOUNT_LOGIN_REQUEST' :
            authorization_set();
            return {...state, isAuthenticated: authorization_valid()};

        case 'ACCOUNT_LOGIN_SUCCESS' :
            authorization_set({...action.payload});
            return {...state, isAuthenticated: authorization_valid()};

        case 'ACCOUNT_LOGIN_FAILURE' :
            authorization_set();
            return {...state, isAuthenticated: authorization_valid()};


        case 'REFRESH_TOKEN_REQUEST' :
            authorization_set();
            storageSet(storageAuthenticating, true);
            return {...state, isAuthenticated: authorization_valid()};

        case 'REFRESH_TOKEN_SUCCESS' :
            authorization_set({...action.payload});
            storageSet(storageAuthenticating, false);
            return {...state, isAuthenticated: authorization_valid()};

        case 'REFRESH_TOKEN_FAILURE' :
            storageSet(storageAuthenticating, false);
            return {...state, isAuthenticated: authorization_valid()};

        default:
            return state;
    }

}

export default reducer;
