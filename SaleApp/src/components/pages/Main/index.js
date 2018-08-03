import React from 'react';
import { connect } from "react-redux";
import {  } from "./../../../actions/dataArrays";
import * as conn from "../../../_helpers/connection";

class Component extends React.Component {

    componentWillMount() {
       // conn.get("Waytopay")
       //     .then(x=> console.log("then",x))
       //     .catch(x=> console.log("catch",x))
    }

    render() {
        return <div>homepage</div>;
    }
}


// connect to store
const mapDispatchToProps = {  };
const mapStateToProps = store => ({ dataArrays: store.dataArrays });
export default connect(mapStateToProps, mapDispatchToProps)(Component);