import reducer from './_reducer';

import {strings} from "../../localization/strings";

import login from './login';
import signin from './signin';
import logout from './logout';
import password from './password';
import recovery from './recovery';
import validRecovery from './validRecovery';

const routesRoot = '/account';

const routes = {
    login: {path: routesRoot + "/login", component: login, isPublic: true},
    signin: {path: routesRoot + "/signin", component: signin, isPublic: true},
    logout: {path: routesRoot + "/logout", component: logout, isPublic: true},
    password: {path: routesRoot + "/password", component: password},
    recovery: {path: routesRoot + "/recovery", component: recovery, isPublic: true},
    validRecovery: {path: routesRoot + "/validRecovery", component: validRecovery, isPublic: true},
    root: {path: routesRoot, component: login, isPublic: true},
    rootApp: {path: ''},
}


export { reducer, routes, routesRoot, strings, };

