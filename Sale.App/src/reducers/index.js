
import {combineReducers} from 'redux';

import {reducer as authenticationStore } from '../components/authentication';
import {reducer as synchronizerStore } from '../components/synchronizer';

import {reducer as paymentStore } from '../components/pages/Payment';

import {reducer as account } from '../components/account';

export default combineReducers({
    authenticationStore,
    dataArrays: synchronizerStore,
    paymentStore,
    account,
});
