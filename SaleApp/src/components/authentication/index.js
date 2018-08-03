import reducer from './_reducer';
import login from './login';
import logout from './logout';
export { reducer }

export const routesRoot = '/authentication';
export const remoteUrl = 'authentication';
export const remoteTokenUrl = 'token';
export const storageKey = 'AUTHENTICATION';

export const routes = {
    login: { path: routesRoot + "/login", component: login, isPublic: true },
    logout: { path: routesRoot + "/logout", component: logout, isPublic: true },
    root: { path: routesRoot, component: login, isPublic: true },
}





