
import {combineReducers} from 'redux';

import appWraper from './appWraper';
import data from './data';
import dataArrays from './dataArrays';
import pageIncome from './pageIncome';

import {reducer as paymentStore } from '../components/pages/Payment';
import {reducer as authenticationStore } from '../components/authentication';

export default combineReducers({
    appWraper,
    data,
    dataArrays,
    pageIncome,
    paymentStore,
    authenticationStore,
});
