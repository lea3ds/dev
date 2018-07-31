const initialState = {
    incomeArray: [], incomeArray_isFetching: false,
    incomeCategoryArray: [], incomeCategoryArray_isFetching: false,
    //waytopayArray

   
}

const reducer = (state = initialState, action) => {

    switch (action.type) {

        // ****************************************************************************************
        // **   Income Array            ***********************************************************
        // ****************************************************************************************

        case "INCOME_ARRAY_GET_REQUEST": return { ...state, incomeArray_isFetching: true };
        case "INCOME_ARRAY_GET_SUCCESS": return { ...state, incomeArray_isFetching: false, incomeArray: action.payload };
        case "INCOME_ARRAY_GET_FAILURE": return { ...state, incomeArray_isFetching: false };

        // ****************************************************************************************
        // **   Income Category Array   ***********************************************************
        // ****************************************************************************************

        case "INCOMECATEGORY_ARRAY_GET_REQUEST": return { ...state, incomeCategoryArray_isFetching: true };
        case "INCOMECATEGORY_ARRAY_GET_SUCCESS": return { ...state, incomeCategoryArray_isFetching: false, incomeCategoryArray: action.payload };
        case "INCOMECATEGORY_ARRAY_GET_FAILURE": return { ...state, incomeCategoryArray_isFetching: false };

        // ****************************************************************************************
        // **   Waytopay Array   ******************************************************************
        // ****************************************************************************************

        case "WAYTOPAY_ARRAY_GET_REQUEST": return { ...state, waytopayArray_isFetching: true };
        case "WAYTOPAY_ARRAY_GET_SUCCESS": return { ...state, waytopayArray_isFetching: false, waytopayArray: action.payload };
        case "WAYTOPAY_ARRAY_GET_FAILURE": return { ...state, waytopayArray_isFetching: false };

        // ****************************************************************************************
        // ****************************************************************************************
        // ****************************************************************************************

        default: return state
    }
}

export default reducer;
