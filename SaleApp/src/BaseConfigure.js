import React from 'react';
import { connect } from "react-redux";
import { configure } from "./_helpers/connection";
import { actions } from "./components/authentication";
//import { startLoadArrays } from "./actions/dataArrays";
import * as conn from "./_helpers/connection";

class Component extends React.Component {

    state = {isReady: false}

    componentDidMount() {
        console.log(this.props)
        configure(); // dentro de props no anda ... wtf???
        this.props.autoLogin();
        //if (verifyAuthentication()) this.props.startLoadArrays();
        this.setState({isReady: true});
    }


    startLoadArray() {
        setInterval(() => {
            var auth = this.props.authentication;
            var data = this.props.dataArrays;

            if (!!auth && auth.isAuthenticated!==true) return null;

            var syncStateIsFetching = data.syncStateIsFetching;
            var timeToExpired = Math.trunc((data.syncStateExpiredTime - new Date().getTime()) / 1000);

            if (timeToExpired < 0 && !syncStateIsFetching) {
                var reducer = 'DATA_SYNC';
                var url = 'Synchronizator/Sync';
                var data = data.syncState;
                dispatch({ type: reducer + '_REQUEST', payload: { url, data } });
                conn.post(url, data)
                    .then(json => { dispatch({ type: reducer + '_SUCCESS', payload: json }); })
                    .catch(error => { dispatch({ type: reducer + '_FAILURE', payload: error }); })
            } else {
                if (syncStateIsFetching) console.log("DATA_SYNC -> Slow connection: ", data.syncStateExpiredInterval - timeToExpired);
                if (!syncStateIsFetching && timeToExpired < 0) console.log("DATA_SYNC -> Expired time: ", timeToExpired);
            }
        }, 1000);
    }


    render() {
        console.log("BASE RENDER", this.props.authentication.isAuthenticated)
        if (this.state.isReady)
            return this.props.children;
        else
            return null;
    }
}
const mapDispatchToProps = {...actions };
//const mapDispatchToProps = { startLoadArrays ,autoLogin};
const mapStateToProps = store => ({ dataArrays: store.dataArrays, authentication:store.authenticationStore });
export default connect(mapStateToProps, mapDispatchToProps)(Component);
