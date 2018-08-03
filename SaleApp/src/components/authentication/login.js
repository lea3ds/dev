import React from 'react';
import { connect } from "react-redux";
import {autoLogin,login} from "./_actions";

class Component extends React.Component {
    componentDidMount() {
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


const mapDispatchToProps = {autoLogin,login};
const mapStateToProps = store => ({ authentication: store.authenticationStore });
export default connect(mapStateToProps, mapDispatchToProps)(Component);
