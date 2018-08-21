import React from 'react';
import {IconButton, Menu,MenuItem } from '@material-ui/core';
import {AccountCircle as AccountIcon,} from '@material-ui/icons';

class Component extends React.Component {
    state = {
        anchorEl: null,
    }

    handleChange = (event, checked) => {
        this.setState({auth: checked});
    };

    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
        this.props.clickHandle();
    };


    render() {
        const {anchorEl} = this.state;
        const open = Boolean(anchorEl);


        return <div>
            <IconButton
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
            >
                <AccountIcon/>
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
            >
                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleClose}>My account</MenuItem>
            </Menu>

        </div>;
    }
}

export default (Component);