import React from 'react';
import { connect } from "react-redux";
import LogIn from "./login";


class Component extends React.Component {

    render() {
        //if ('esta autenticado!!!') { 'voy al home' }
        return <LogIn />
    }
}

// connect to store
const mapDispatchToProps = { };
const mapStateToProps = store => ({ data: store.data });
export default connect(mapStateToProps, mapDispatchToProps)(Component);