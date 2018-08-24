import React from 'react';
import { connect } from "react-redux";
import {} from "./_actions";
import { Form, Toolbar, Loader } from '../controllers';
import {routes, strings} from "./index";

class Component extends React.Component {
    state = {password:'',passwordRetry:'', confirming:false};

    confirmHandle=()=> {
        this.setState({confirming: true});
        setTimeout(() => {
            window.showDialog({title: strings.account_recovery_success_title,message: strings.account_recovery_success_message}, () => this.props.history.push(routes.root.path));
            this.setState({confirming: false});
        }, 1000);
    }

    componentDidMount(){
        var searchParams = new URLSearchParams(this.props.location.search);
        if (!!!searchParams.get("id")) this.props.history.push(routes.root.path);
    }

    render() {

        return <div>

            <Toolbar
                title={strings.account_recovery_title}
                backButton={()=>this.props.history.push(routes.root.path)}
            />

            {this.state.confirming ? <Loader/> : null}

            <div>

                <Form type='password' label={strings.account_recovery_password}
                      value={this.state.password}
                      onChange={e => this.setState({password: e.target.value})}
                />

                <Form type='password' label={strings.account_recovery_passwordRetry}
                      value={this.state.passwordRetry}
                      error={!(!!this.state.password && (this.state.password === this.state.passwordRetry))}
                      onChange={e => this.setState({passwordRetry: e.target.value})}
                />

                <Form type='button' label={strings.account_recovery_confirm} color="primary"
                      disabled={!(!!this.state.password && (this.state.password === this.state.passwordRetry))}
                      onClick={this.confirmHandle}
                />

            </div>

        </div>;
    }
}

const mapDispatchToProps = {};
const mapStateToProps = store => ({ });
export default connect(mapStateToProps, mapDispatchToProps)(Component);


