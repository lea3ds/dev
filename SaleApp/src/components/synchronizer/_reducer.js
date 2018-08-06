
const initialState = {
    account: [],
    income: [],
    incomeCategory: [],
    operationType: [],
    payment: [],
    paymentCategory: [],
    stocktaking: [],
    user: [],
    waytopay: [],
    waytopayType: [],

    syncStateIsFetching: false,
    syncStateExpiredInterval: 60,
    syncStateExpiredTime: 0,
    syncState: [
        { "key": "account", "version": 0 },
        { "key": "xxxxxxxxxxx", "version": 0 },
        { "key": "income", "version": 0 },
        { "key": "incomeCategory", "version": 0 },
        { "key": "operationType", "version": 0 },
        { "key": "payment", "version": 0 },
        { "key": "paymentCategory", "version": 0 },
        { "key": "stocktaking", "version": 0 },
        { "key": "user", "version": 0 },
        { "key": "waytopay", "version": 0 },
        { "key": "waytopayType", "version": 0 }
    ],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "DATA_SYNC_REQUEST": return { ...state, syncStateIsFetching: true };
        case "DATA_SYNC_SUCCESS":
            var tables = {};
            var syncState = state.syncState.map(syncStateItem => {
                let obj = action.payload.find(x => x.key === syncStateItem.key);
                if (obj.version > 0 && !!obj.data) tables[obj.key] = obj.data;
                return { key: obj.key, version: obj.version };
            });
            var syncStateExpiredTime = new Date().getTime() + 1000 * state.syncStateExpiredInterval
            return { ...state, ...tables, syncState, syncStateIsFetching: false, syncStateExpiredTime };
        case "DATA_SYNC_FAILURE": return { ...state, syncStateIsFetching: false };


        // Capturo cuando hay que forzar updates
        case 'PAYMENT_MODIFIED': return { ...state, syncStateExpiredTime: new Date().getTime() };
        case 'PAYMENT_CATEGORY_MODIFIED': return { ...state, syncStateExpiredTime: new Date().getTime() };
        case 'WAYTOPAY_MODIFIED': return { ...state, syncStateExpiredTime: new Date().getTime() };
        case 'WAYTOPAY_TYPE_MODIFIED': return { ...state, syncStateExpiredTime: new Date().getTime() };

        default: return state
    }
}

export default reducer;
