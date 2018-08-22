import React from 'react';
import {Typography } from '@material-ui/core';

const styles = {
    flex: {
        flexGrow: 1,
        textAlign: 'center',
    },
};

class Component extends React.Component {

    render() {
        return <Typography variant="title" color="inherit" style={styles.flex}>
            {this.props.title}
        </Typography>;
    }
}

export default (Component);