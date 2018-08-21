import home from './home';

const routesRoot = '';
export const routes = {
    //other: {path: routesRoot + "/other", component: other, isPublic: true},
    home: {path: routesRoot + "/home", component: home, isPublic: true},
    root: {path: routesRoot, component: home, isPublic: true},
}





