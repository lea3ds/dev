import React from 'react';
import { connect } from "react-redux";

class Component extends React.Component {

    componentWillMount() {
    }

    render() {
        return <div>homepage</div>;
    }
}


// connect to store
const mapDispatchToProps = {  };
const mapStateToProps = store => ({ dataArrays: store.dataArrays });
export default connect(mapStateToProps, mapDispatchToProps)(Component);