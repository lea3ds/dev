import React from 'react';
import { connect } from "react-redux";
import {password} from "./_actions";
import { strings, routes, } from './index';
import { Form, Toolbar, Loader } from '../controllers';

class Component extends React.Component {
    state = {passwordOld: '',passwordNew:'',passwordRetry:'', confirming:false};

    confirmHandle=()=> {
        this.setState({confirming: true});
        this.props.password(this.state.passwordOld, this.state.passwordNew)
            .then(() => {
                window.showDialog({title: strings.account_password_success_title, message: strings.account_password_success_message}, () => this.props.history.push(routes.root.path));
                this.setState({confirming: false});
            })
            .catch(() => {
                window.showDialog({title: strings.account_password_failure_title, message: strings.account_password_failure_message});
                this.setState({confirming: false});
            })
    }

    render() {

        return <div>

            <Toolbar
                title={strings.account_password_title}
                backButton={()=>this.props.history.push(routes.root.path)}
            />

            {this.state.confirming ? <Loader/> : null}

            <div>

                <Form type='password'  label={strings.account_password_old}
                      value={this.state.passwordOld}
                      onChange={e => this.setState({passwordOld: e.target.value})}
                />

                <Form type='password' label={strings.account_password_new}
                      value={this.state.passwordNew}
                      onChange={e => this.setState({passwordNew: e.target.value})}
                />

                <Form type='password' label={strings.account_password_retry}
                      value={this.state.passwordRetry}
                      error={(this.state.passwordNew !== this.state.passwordRetry)}
                      onChange={e => this.setState({passwordRetry: e.target.value})}
                />

                <Form type='button' label={strings.account_password_confirm} color="primary"
                      disabled={!(!!this.state.passwordOld && !!this.state.passwordNew && (this.state.passwordNew === this.state.passwordRetry))}
                      onClick={this.confirmHandle}
                />

            </div>

        </div>;
    }
}

const mapDispatchToProps = {password};
const mapStateToProps = store => ({ });
export default connect(mapStateToProps, mapDispatchToProps)(Component);


