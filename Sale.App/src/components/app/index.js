import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Router from './router'
import {Dialog, Menu} from '../controllers';

// ROUTES
import { routes as routesAccount } from '../../components/account';
import { routes as routesHome } from '../pages/home';
import { routes as routesPayment } from '../../components/pages/Payment';
import { routes as routesPaymentCategory } from '../../components/pages/PaymentCategory';
import { routes as routesWaytopay } from '../../components/pages/Waytopay';
import { routes as routesWaytopayType } from '../../components/pages/WaytopayType';


const menuLinks = [
    { name: 'Login', href: '/account/login' },
    { name: 'Home', href: '/home' },
    { name: 'HomePrivate', href: '/homePrivate' },


    { name: 'Payment', href: '/Payment' },
    { name: 'Payment Category', href: '/PaymentCategory' },
    { name: 'Waytopay', href: '/Waytopay' },
    { name: 'WaytopayType', href: '/WaytopayType' },
]

class Component extends React.Component {

    allRoutes = [].concat(
        Object.values(routesPaymentCategory),
        Object.values(routesWaytopay),
        Object.values(routesWaytopayType),

        Object.values(routesPayment),

        Object.values(routesAccount),
        Object.values(routesHome),

    ).filter(x=>!!x.component);

    render() {
        return (
            <section>

                <Menu menuLinks={menuLinks} isAuthenticated={this.props.account.isAuthenticated} />

                <Dialog />

                <Router
                    routes={this.allRoutes}
                    history={this.props.history}
                    authPath={routesAccount.root}
                    isAuthenticated={this.props.account.isAuthenticated}
                />


            </section>

        );

    }
}

const mapDispatchToProps = { };
const mapStateToProps = store => ({ appWraper: store.appWraper, account: store.account });
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component));
// el [withRouter] aca hace que renderice este componente cada vez que hay un cambio de URL