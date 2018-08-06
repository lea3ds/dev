import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Drawer from './Drawer';
import Router from './Router'
import Toolbar from './Toolbar'

// ROUTES

import Main from '../../components/pages/Main';
import { routes as routesAuthentication } from '../../components/authentication';
import { routes as routesPayment } from '../../components/pages/Payment';
import { routes as routesPaymentCategory } from '../../components/pages/PaymentCategory';
import { routes as routesWaytopay } from '../../components/pages/Waytopay';
import { routes as routesWaytopayType } from '../../components/pages/WaytopayType';


import { actions,authPath  } from '../../components/authentication';

const routes = {
    //Authentication: { path: '/Authentication', component: Authentication, requireAuth: false },
    Main: { path: '/Main', component: Main },
    Root: { path: '/', component: Main },
};

const menuLinks = [
    { name: 'Main', href: '/Main' },
    { name: 'Authentication', href: '/authentication' },
    { name: 'Payment', href: '/Payment' },
    { name: 'Payment Category', href: '/PaymentCategory' },
    { name: 'Waytopay', href: '/Waytopay' },
    { name: 'WaytopayType', href: '/WaytopayType' },
]

class Component extends React.Component {

    state = {
        isReady: false,
        links: menuLinks,
        routes: [].concat(
            Object.values(routesPaymentCategory),
            Object.values(routesWaytopay),
            Object.values(routesWaytopayType),

            Object.values(routesPayment),

            Object.values(routesAuthentication),
            Object.values(routes),
        )
    };

    render() {
        return (
            <section>
                <Toolbar/>
                <Drawer links={this.state.links}/>
                <Router routes={this.state.routes} history={this.props.history} authPath={authPath}
                        isAuthenticated={actions.verifyAuthentication()}/>
            </section>

        );

    }
}

const mapDispatchToProps = { };
const mapStateToProps = store => ({ appWraper: store.appWraper, dataArrays: store.dataArrays,authentication: store.authenticationStore });
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component));
// el [withRouter] aca hace que renderice este componente cada vez que hay un cambio de URL