import React from 'react';
import { connect } from "react-redux";
import {} from "./_actions";
import { Form, Toolbar, Loader } from '../controllers';
import {routes} from "./index";

class Component extends React.Component {
    state = {passwordNew:'',passwordRetry:'', confirming:false};

    confirmHandle=()=> {
        this.setState({confirming:true});
        setTimeout(() => window.showDialog({title: 'LOGIN', message: 'OK!'}, this.confirmSuccess), 1000);
    }

    confirmSuccess=()=> {
        this.setState({confirming:true});
        this.props.history.push(routes.root.path);
    }

    componentDidMount(){
        var searchParams = new URLSearchParams(this.props.location.search);
        if (!!!searchParams.get("id")) this.props.history.push(routes.root.path);
    }


    render() {

        return <div>

            <Toolbar
                title={'PASSWORD'}
                backButton={()=>this.props.history.push(routes.root.path)}
            />

            {this.state.confirming ? <Loader/> : null}

            <div>

                <Form type='password' label='new'
                      value={this.state.passwordNew}
                      onChange={e => this.setState({passwordNew: e.target.value})}
                />

                <Form type='password' label='retry'
                      value={this.state.passwordRetry}
                      error={!(!!this.state.passwordNew && (this.state.passwordNew === this.state.passwordRetry))}
                      onChange={e => this.setState({passwordRetry: e.target.value})}
                />

                <Form type='button' label='CONFIRM' color="primary"
                      disabled={!(!!this.state.passwordNew && (this.state.passwordNew === this.state.passwordRetry))}
                      onClick={this.confirmHandle}
                />

            </div>

        </div>;
    }
}

const mapDispatchToProps = {};
const mapStateToProps = store => ({ });
export default connect(mapStateToProps, mapDispatchToProps)(Component);


