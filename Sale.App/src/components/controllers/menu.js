import React from 'react';
import {Drawer,Divider,List} from '@material-ui/core';
import { Link } from 'react-router-dom';

class Component extends React.Component {
    state = {
        opened: false,
    };

    componentDidMount() {
        window.showMenu = () => {
            this.setState({opened: true,})
        };
    }

    handleClose = () => {
        this.setState({opened: false});
    };

    render() {

        var {menuLinks, isAuthenticated} = this.props;
        var links = menuLinks.slice();
        if (isAuthenticated) links.push({name: 'Logout', href: '/authentication/logout'});

        return <Drawer open={this.state.opened} onClose={this.handleClose}>
            <div tabIndex={0} role="button" onClick={this.handleClose} onKeyDown={this.handleClose}>
                {links.map((x, index) => x.id === 0
                    ? <Divider/>
                    : <List key={index}>
                        <Link to={{pathname: x.href}}>
                            {x.name}
                        </Link>
                    </List>)}
            </div>
        </Drawer>;
    }
}

export default Component;