import {authorization_valid} from '../../actions/connection';

const initialState = {
    isAuthenticated: authorization_valid(),
};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        //++ TOKEN

        case 'TOKEN_KILL' :
            return {...state, isAuthenticated: false};

        case 'TOKEN_PASSWORD_GET_REQUEST' :
            return {...state};

        case 'TOKEN_PASSWORD_GET_SUCCESS' :
            return {...state, isAuthenticated: true};

        case 'TOKEN_PASSWORD_GET_FAILURE' :
            return {...state, isAuthenticated: false};

        case 'TOKEN_REFRESH_GET_REQUEST' :
            return {...state};

        case 'TOKEN_REFRESH_GET_SUCCESS' :
            return {...state, isAuthenticated: true};

        case 'TOKEN_REFRESH_GET_FAILURE' :
            return {...state, isAuthenticated: false};

        //-- TOKEN

        default:
            return state;
    }

}

export default reducer;
