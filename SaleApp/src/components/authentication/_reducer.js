import {storageSet} from "../../actions/connection";

const initialState = {
    isAuthenticated: false,
    isAuthenticating: false,
    token: null,
};

const initialStorage = () => {
    try {
        let data = localStorage.getItem('AUTHENTICATION');
        data = JSON.parse(data);
        data.isAuthenticated = (!!data.token.token_type && !!data.token.token_type); // validar EXPIRACION
        return data;
    }
    catch(error) {
        return {};
    }
}

const updateStorage=(newState) =>{
    storageSet('AUTHENTICATION', newState);
}

const reducer = (state = {...initialState,...initialStorage() }, action) => {
    let newState = {...state};
    switch (action.type) {

        case 'AUTHENTICATION_TOKEN' :
            updateStorage(newState); return newState;

        case 'AUTHENTICATION_TOKEN_SUCCESS' :
            newState = {...state, isAuthenticated: true, isAuthenticating: false, token: action.payload};
            updateStorage(newState); return newState;

        case 'AUTHENTICATION_TOKEN_FAILURE' :
            newState =  {...state, isAuthenticated: false, isAuthenticating: false, token: null};
            updateStorage(newState); return newState;


        case 'AUTHENTICATION_LOGOUT' :
            newState =  {...state, isAuthenticated: false, isAuthenticating: false, token: null};
            updateStorage(newState); return newState;

        case 'CONNECTION_RESPONSE_ERROR' :
            if (!!action.payload.response && action.payload.response.status === 401)
                newState =  {...state, isAuthenticated: false, isAuthenticating: false, token: null};
            updateStorage(newState); return newState;

        default:
            return state;
    }

}

export default reducer;
