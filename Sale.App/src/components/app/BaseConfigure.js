import React from 'react';
import { connect } from "react-redux";
import { configure } from "../../actions/connection";
import { autoLogin } from "../authentication/index";
import { sync } from "../synchronizer/index";


class Component extends React.Component {

    state = {isReady: false}

    componentDidMount() {
        this.props.configure();
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

const mapDispatchToProps = {autoLogin, sync, configure };
const mapStateToProps = store => ({ authentication: store.authenticationStore });
export default connect(mapStateToProps, mapDispatchToProps)(Component);
