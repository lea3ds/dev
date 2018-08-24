import {authorization_set, authorization_valid} from '../../actions/connection';

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

        default:
            return state;
    }

}

export default reducer;
