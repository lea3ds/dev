
const initialState = { }

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'PAYMENT_MODIFIED' : return { ...state };
        default: return state
    }
}

export default reducer;
