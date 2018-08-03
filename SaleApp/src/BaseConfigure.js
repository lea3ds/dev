import React from 'react';
import { connect } from "react-redux";
import { configure } from "./_helpers/connection";
import { startLoadArrays } from "./actions/dataArrays";

class Component extends React.Component {

    state = {isReady: false}

    componentDidMount() {
        configure(); // dentro de props no anda ... wtf???
        this.props.startLoadArrays();
        this.setState({isReady: true});
    }

    render() {
        if (this.state.isReady)
            return this.props.children;
        else
            return null;
    }
}
const mapDispatchToProps = { startLoadArrays };
const mapStateToProps = store => ({ dataArrays: store.dataArrays });
export default connect(mapStateToProps, mapDispatchToProps)(Component);
