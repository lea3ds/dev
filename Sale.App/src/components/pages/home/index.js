import home from './home';
import homePrivate from './homePrivate';

const routesRoot = '';
export const routes = {
    //other: {path: routesRoot + "/other", component: other, isPublic: true},
    homePrivate: {path: routesRoot + "/homePrivate", component: homePrivate },
    home: {path: routesRoot + "/home", component: home, isPublic: true},
    root: {path: routesRoot, component: home, isPublic: true},
}





