import React from 'react';
import { connect } from "react-redux";
import {} from "./_actions";
import { Form, Toolbar, Loader } from '../controllers';
import {routes} from "./index";

class Component extends React.Component {
    state = {username: '',passwordNew:'',passwordRetry:'', confirming:false};

    confirmHandle=()=> {
        this.setState({confirming:true});
        setTimeout(() => window.showDialog({title: 'LOGIN', message: 'OK!'}, this.confirmSuccess), 1000);
    }

    confirmSuccess=()=> {
        this.setState({confirming:true});
        this.props.history.push(routes.rootApp.path);
    }

    render() {

        return <div>

            <Toolbar
                title={'SIGNIN'}
                backButton={()=>this.props.history.push(routes.root.path)}
            />

            {this.state.confirming ? <Loader/> : null}

            <div>

                <Form type='email' label='username'
                      value={this.state.username}
                      onChange={e => this.setState({username: e.target.value})}
                />

                <Form type='password' label='new'
                      value={this.state.passwordNew}
                      onChange={e => this.setState({passwordNew: e.target.value})}
                />

                <Form type='password' label='retry'
                      value={this.state.passwordRetry}
                      error={(this.state.passwordNew !== this.state.passwordRetry)}
                      onChange={e => this.setState({passwordRetry: e.target.value})}
                />

                <Form type='button' label='CONFIRM' color="primary"
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


