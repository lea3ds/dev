import reducer from './_reducer';
import CreateView from './CreateView';
import EditView from './EditView';
import ListView from './ListView';

export { reducer }

export const routesRoot = '/Payment';
export const remoteUrl = 'Payment';

export const routes = {
    ListView: { path: routesRoot + "/ListView", component: ListView },
    CreateView: { path: routesRoot + "/CreateView", component: CreateView },
    EditView: { path: routesRoot + "/EditView", component: EditView, exact: false },
    Root: { path: routesRoot, component: ListView },
}












