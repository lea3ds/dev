import React from 'react';
import { connect } from "react-redux";
import {} from "./_actions";
import { routes } from './index';
import { Form, Toolbar, Loader } from '../controllers';

class Component extends React.Component {
    state = {username: '', confirming:false};

    confirmHandle=()=> {
        this.setState({confirming:true});
        setTimeout(() => window.showDialog({title: 'LOGIN', message: 'OK!'}, this.confirmSuccess), 1000);
    }

    confirmSuccess=()=> {
        this.setState({confirming:true});
        this.props.history.push(routes.root.path);
    }

    render() {
        return <div>

            <Toolbar
                title={'RECOVERY'}
                backButton={()=>this.props.history.push(routes.root.path)}
            />

            {this.state.confirming ? <Loader/> : null}

            <div>

                <Form type='email' label='username'
                      value={this.state.username}
                      onChange={e => this.setState({username: e.target.value})}
                />

                <Form type='button' label='CONFIRM' color="primary"
                      disabled={!!!this.state.username}
                      onClick={this.confirmHandle}
                />

            </div>

        </div>;
    }
}

const mapDispatchToProps = {};
const mapStateToProps = store => ({ });
export default connect(mapStateToProps, mapDispatchToProps)(Component);


