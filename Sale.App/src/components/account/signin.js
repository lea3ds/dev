import React from 'react';
import { connect } from "react-redux";
import {signin} from "./_actions";
import {routes, strings} from './index';
import { Form, Toolbar, Loader } from '../controllers';

class Component extends React.Component {
    state = {username: '',password:'',passwordRetry:'', confirming:false};

    confirmHandle=()=> {
        this.setState({confirming: true});
        this.props.signin(this.state.username, this.state.password)
            .then(() => {
                window.showDialog({title: strings.account_signin_success_title, message: strings.account_signin_success_message}, () => this.props.history.push(routes.rootApp.path));
                this.setState({confirming: false});
            })
            .catch(() => {
                window.showDialog({title: strings.account_signin_failure_title, message: strings.account_signin_failure_message});
                this.setState({confirming: false});
            })
    }

    render() {

        return <div>

            <Toolbar
                title={strings.account_signin_title}
                backButton={()=>this.props.history.push(routes.root.path)}
            />

            {this.state.confirming ? <Loader/> : null}

            <div>

                <Form type='email' label={strings.account_signin_username}
                      value={this.state.username}
                      onChange={e => this.setState({username: e.target.value})}
                />

                <Form type='password' label={strings.account_signin_password}
                      value={this.state.password}
                      onChange={e => this.setState({password: e.target.value})}
                />

                <Form type='password' label={strings.account_signin_passwordRetry}
                      value={this.state.passwordRetry}
                      error={(this.state.password !== this.state.passwordRetry)}
                      onChange={e => this.setState({passwordRetry: e.target.value})}
                />

                <Form type='button' label={strings.account_signin_confirm} color="primary"
                      disabled={!(!!this.state.username && !!this.state.password && (this.state.password === this.state.passwordRetry))}
                      onClick={this.confirmHandle}
                />

            </div>

        </div>;
    }
}

const mapDispatchToProps = {signin};
const mapStateToProps = store => ({ });
export default connect(mapStateToProps, mapDispatchToProps)(Component);


