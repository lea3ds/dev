import React from 'react';
import { connect } from "react-redux";
import { openDrawer, closeDrawer } from "../../actions/appWraper";
import { withRouter } from "react-router-dom";

import { Link } from 'react-router-dom';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';


const Component = (props) => {
    var links = props.links.slice();
    if (props.authentication.isAuthenticated)
        links.push({ name: 'Logout', href: '/authentication/logout' });

    return <Drawer open={props.appWraper.drawerOpened} onClose={e => props.closeDrawer()}>
        <div tabIndex={0} role="button" onClick={e => props.closeDrawer()} onKeyDown={e => props.closeDrawer()} >
            {links.map((x,index) => x.id === 0
                ? <Divider />
                : <List key={index}>
                    <Link to={{ pathname: x.href  }} >
                        {x.name}
                    </Link>
                </List>)}
        </div>
    </Drawer>;
}


const mapDispatchToProps = { openDrawer, closeDrawer };
const mapStateToProps = store => ({ appWraper: store.appWraper, authentication: store.authenticationStore });
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Component));