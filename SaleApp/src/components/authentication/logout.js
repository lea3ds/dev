import React from 'react';
import { connect } from "react-redux";
import {logout} from "./_actions";

class Component extends React.Component {
    componentDidMount() {
        this.props.logout(this.props.history)
    }

    render() {
        return <div>Logout</div>;
    }
}

const mapDispatchToProps = {logout};
const mapStateToProps = store => ({ });
export default connect(mapStateToProps, mapDispatchToProps)(Component);
