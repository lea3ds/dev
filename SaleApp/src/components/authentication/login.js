import React from 'react';
import { connect } from "react-redux";
import {autoLogin, login} from "./_actions";
import {withRouter} from "react-router-dom";

class Component extends React.Component {
    componentDidMount() {
        console.log(this)
        this.props.autoLogin(this.props.history);
    }

    render() {
        return <div>
            <button onClick={e => {
                const data = {grant_type: 'password', username: 'Leandro', password: 'nadanada'};
                this.props.login(data,this.props.history);
            }}>Login
            </button>
        </div>;
    }
}

const mapDispatchToProps = {autoLogin ,login};
const mapStateToProps = store => ({ authentication: store.authenticationStore });
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component));
