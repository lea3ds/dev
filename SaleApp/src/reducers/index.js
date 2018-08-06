
import {combineReducers} from 'redux';

import appWraper from './appWraper';


import {reducer as authenticationStore } from '../components/authentication';
import {reducer as synchronizerStore } from '../components/synchronizer';

import {reducer as paymentStore } from '../components/pages/Payment';

export default combineReducers({

    authenticationStore,
    appWraper,
    dataArrays: synchronizerStore,

    paymentStore,

});
