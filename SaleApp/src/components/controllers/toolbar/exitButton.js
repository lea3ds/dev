import React from 'react';
import {IconButton } from '@material-ui/core';
import {ExitToApp as ExitIcon,} from '@material-ui/icons';

class Component extends React.Component {

    render() {
        return <div>
            <IconButton color="inherit" aria-label="Menu" onClick={this.props.clickHandle}><ExitIcon /></IconButton>
        </div>;
    }

}

export default (Component);