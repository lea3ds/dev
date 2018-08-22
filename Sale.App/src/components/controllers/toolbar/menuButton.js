import React from 'react';
import {IconButton } from '@material-ui/core';
import {Menu as MenuIcon,} from '@material-ui/icons';


const styles = {
    left: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class Component extends React.Component {

    render() {
        return <div>
            <IconButton
                color="inherit"
                aria-label="Menu"
                style={styles.left}
                onClick={() => {
                    window.showMenu();
                }}
            >
                <MenuIcon/>
            </IconButton>
        </div>;
    }
}

export default (Component);