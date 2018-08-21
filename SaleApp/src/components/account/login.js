import React from 'react';
import { connect } from "react-redux";
import {login} from "./_actions";
import { routes } from './index';
import { Form, Toolbar, Loader } from '../controllers';

class Component extends React.Component {
    state = {username: '',password:'', confirming:false};

    confirmHandle=()=> {
        this.setState({confirming: true});
        this.props.login(this.state.username, this.state.password)
            .then(() => {
                //window.showDialog({title: 'LOGIN', message: 'OK!'}, () => this.props.history.push(routes.rootApp.path));
                this.setState({confirming: false});
                this.props.history.push(routes.rootApp.path);
            })
            .catch(() => {
                window.showDialog({title: 'ERROR', message: 'Ups!'});
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

            <Toolbar title={'LOGIN'} menuButton/>

            {this.state.confirming ? <Loader/> : null}

            <div>

                <Form type='email' label='username'
                      value={this.state.username}
                      onChange={e => this.setState({username: e.target.value})}
                />

                <Form type='password' label='password'
                      value={this.state.password}
                      onChange={e => this.setState({password: e.target.value})}
                />

                <Form type='button' label='LOG IN' color="primary"
                      disabled={!(!!this.state.username && !!this.state.password)}
                      onClick={this.confirmHandle}
                />

                <Form type='button' label='RECOVER'
                      onClick={this.goRecover}
                />

                <Form type='button' label='SIGN IN' variant="contained" color="secondary"
                      onClick={this.goSignin}
                />

            </div>

        </div>;
    }
}

const mapDispatchToProps = {login};
const mapStateToProps = store => ({  });
export default connect(mapStateToProps, mapDispatchToProps)(Component);


