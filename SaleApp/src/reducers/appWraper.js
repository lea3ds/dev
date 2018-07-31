// import Authentication from '../components/authentication';
// import Main from '../components/pages/Main';

// import Income from '../components/pages/income';
// import IncomeList from '../components/pages/incomeList';
// import Payment from '../components/pages/payment/editForm'; //editForm
// import PaymentList from '../components/pages/paymentList';

// import PaymentListView from '../components/pages/payment/CreateView';
// import PaymentCreateView from '../components/pages/payment/CreateView';
// import PaymentEditView from '../components/pages/payment/CreateView';





// const routes = {
//     'Authentication': { component: Authentication, path: '/Authentication', requireAuth: false, isExact: true },
//     'Income': { component: Income, path: '/Income/:value', requireAuth: false, isExact: true },
//     'IncomeList': { component: IncomeList, path: '/IncomeList', requireAuth: false, isExact: true },
//     // 'PaymentList': { component: PaymentList, path: '/PaymentList', requireAuth: false, isExact: true },
//     // 'Payment': { component: Payment, path: '/Payment/:value', requireAuth: false, isExact: true },
//     'Main': { component: Main, path: '/' },
// };


// const menuItems = [
//     { id: 1, name: 'Authentication', href: '/Authentication' },
//     { id: 2, name: 'Main', href: '/Main' },
//     { id: 3, name: 'IncomeList', href: '/IncomeList' },
//     { id: 4, name: 'PaymentList', href: '/PaymentList' },
// ];

const initialState = {
    drawerOpened: false,
    // routes: routes,
    // menuItems: menuItems,
    loggedIn: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case "DRAWER_OPEN": return { ...state, drawerOpened: true };
        case "DRAWER_CLOSE": return { ...state, drawerOpened: false };

        default: return state
    }
}

export default reducer;
