
const initialState = {
    current: {
        'id': 0,
        'date': '2018-06-19',
        'amount': 0,
        'detail': '',
        'category': null,
        'pendingArray': [],
        'fees': 1,
    },
    isFetching: false,
    isCreating: false, wasCreated: false,
    isUpdating: false, wasUpdated: false,
}

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case "INITIALIZE_PAYMENT": return { ...initialState };

        case "CURRENT_PAYMENT_SET": return { ...state, current: action.payload };

        case "CURRENT_PAYMENT_GET_REQUEST": return { ...state, isFetching: true };
        case "CURRENT_PAYMENT_GET_SUCCESS": return { ...state, isFetching: false, current: action.payload };
        case "CURRENT_PAYMENT_GET_FAILURE": return { ...state, isFetching: false };

        case "CURRENT_PAYMENT_ADD_REQUEST": return { ...state, isCreating: true, wasCreated: false };
        case "CURRENT_PAYMENT_ADD_SUCCESS": return { ...state, isCreating: false, wasCreated: true, current: action.payload };
        case "CURRENT_PAYMENT_ADD_FAILURE": return { ...state, isCreating: false, wasCreated: false };

        case "CURRENT_PAYMENT_UPD_REQUEST": return { ...state, isUpdating: true, wasUpdated: false };
        case "CURRENT_PAYMENT_UPD_SUCCESS": return { ...state, isUpdating: false, wasUpdated: true, current: action.payload };
        case "CURRENT_PAYMENT_UPD_FAILURE": return { ...state, isUpdating: false, wasUpdated: false };

        default: return state
    }
}

export default reducer;
