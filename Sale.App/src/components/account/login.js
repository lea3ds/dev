import React from 'react';
import { connect } from "react-redux";
import {login} from "./_actions";
import { strings, routes, } from './index';
import { Form, Toolbar, Loader } from '../controllers';

class Component extends React.Component {
    state = {username: '',password:'', confirming:false};

    confirmHandle=()=> {
        this.setState({confirming: true});
        this.props.login(this.state.username, this.state.password)
            .then(() => {
                this.setState({confirming: false});
                //this.props.history.push(routes.rootApp.path);
                this.props.history.push('/homePrivate');
            })
            .catch(() => {
                window.showDialog({title: strings.account_login_failure_title, message: strings.account_login_failure_message});
                this.setState({confirming: false});
            })
    }

    goRecover=()=> {
        this.props.history.push(routes.recovery.path);
    }

    goSignin=()=> {
        this.props.history.push(routes.signin.path);
    }

    render() {
        return <div>

            <Toolbar title={strings.account_login_title} menuButton/>

            {this.state.confirming ? <Loader/> : null}

            <div>

                <Form type='email' label={strings.account_login_username}
                      value={this.state.username}
                      onChange={e => this.setState({username: e.target.value})}
                />

                <Form type='password' label={strings.account_login_password}
                      value={this.state.password}
                      onChange={e => this.setState({password: e.target.value})}
                />

                <Form type='button' label={strings.account_login_confirm} color="primary"
                      disabled={!(!!this.state.username && !!this.state.password)}
                      onClick={this.confirmHandle}
                />

                <Form type='button' label={strings.account_login_goToRecover}
                      onClick={this.goRecover}
                />

                <Form type='button' label={strings.account_login_goToSignin} variant="contained" color="secondary"
                      onClick={this.goSignin}
                />

            </div>

        </div>;
    }
}

const mapDispatchToProps = {login};
const mapStateToProps = store => ({  });
export default connect(mapStateToProps, mapDispatchToProps)(Component);


