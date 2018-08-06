import React from 'react';
import { connect } from "react-redux";
import {autoLogin, login, logout} from "./_actions";
import {withRouter} from "react-router-dom";

class Component extends React.Component {
    componentDidMount() {
        this.props.logout();
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

const mapDispatchToProps = {autoLogin ,login, logout};
const mapStateToProps = store => ({ authentication: store.authenticationStore });
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component));
