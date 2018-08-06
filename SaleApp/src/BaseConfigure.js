import React from 'react';
import { connect } from "react-redux";
import { configure } from "./_helpers/connection";
import { autoLogin } from "./components/authentication";
import { sync } from "./components/synchronizer";


class Component extends React.Component {

    state = {isReady: false}

    componentDidMount() {
        configure();
        this.props.autoLogin();
        this.startSynchronizer();
        this.setState({isReady: true});
    }

    startSynchronizer() {
        setInterval(() => {
            if (this.props.authentication.isAuthenticated === true && this.state.isReady === true) this.props.sync()
        }, 1000);
    }

    render() {
        if (!this.state.isReady) return null;
        return this.props.children;
    }
}
const mapDispatchToProps = { autoLogin,sync };
const mapStateToProps = store => ({ authentication: store.authenticationStore });
export default connect(mapStateToProps, mapDispatchToProps)(Component);
