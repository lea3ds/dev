import React from 'react';
import { connect } from "react-redux";
import {} from "./_actions";
import {routes, strings} from './index';
import { Form, Toolbar, Loader } from '../controllers';

class Component extends React.Component {
    state = {username: '',passwordNew:'',passwordRetry:'', confirming:false};

    confirmHandle=()=> {
        this.setState({confirming: true});
        setTimeout(() => {
            window.showDialog({title: strings.account_signin_success_title,message: strings.account_signin_success_message}, () => this.props.history.push(routes.rootApp.path));
            this.setState({confirming: false});
        }, 1000);
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
                      value={this.state.passwordNew}
                      onChange={e => this.setState({passwordNew: e.target.value})}
                />

                <Form type='password' label={strings.account_signin_passwordRetry}
                      value={this.state.passwordRetry}
                      error={(this.state.passwordNew !== this.state.passwordRetry)}
                      onChange={e => this.setState({passwordRetry: e.target.value})}
                />

                <Form type='button' label={strings.account_signin_confirm} color="primary"
                      disabled={!(!!this.state.username && !!this.state.passwordNew && (this.state.passwordNew === this.state.passwordRetry))}
                      onClick={this.confirmHandle}
                />

            </div>

        </div>;
    }
}

const mapDispatchToProps = {};
const mapStateToProps = store => ({ });
export default connect(mapStateToProps, mapDispatchToProps)(Component);


