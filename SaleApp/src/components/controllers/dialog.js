import React from 'react';
import {strings} from "../../localization/strings";
import {Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Button} from '@material-ui/core';

class Component extends React.Component {
    state = {
        open: false,
        title: '',
        message: '',
        callback: null
    };

    componentDidMount() {
        window.showDialog = (content, callback) => {
            this.setState({
                open: true,
                title: content ? content.title : '',
                message: content ? content.message : '',
                callback: callback,
            })
        };
    }

    handleClose = () => {
        this.setState({open: false});
        this.state.callback && this.state.callback();
    };

    render() {

        return <Dialog
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                open={this.state.open}
            >
                <DialogTitle id="alert-dialog-title">{this.state.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {this.state.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary" >{strings.dialog_confirm}</Button>
                </DialogActions>
            </Dialog>
    }
}

export default Component;