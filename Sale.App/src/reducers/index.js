
import {combineReducers} from 'redux';

import {reducer as synchronizerStore } from '../components/synchronizer';

import {reducer as paymentStore } from '../components/pages/Payment';

import {reducer as account } from '../components/account';

export default combineReducers({
    dataArrays: synchronizerStore,
    paymentStore,
    account,
});
