import React from 'react';
import { connect } from "react-redux";
import {logout} from "./_actions";
import { routes } from './index';
import { Toolbar,Loader } from '../controllers';

class Component extends React.Component {
    state = {confirming: true};

    componentDidMount() {
        this.props.logout()
            .then(() => {
                this.setState({confirming: false});
                this.props.history.push(routes.root.path);
            })
    }

    render() {
        return <div>
            <Toolbar title={'LOGOUT'}/>
            {this.state.confirming ? <Loader/> : null}
        </div>;
    }
}

const mapDispatchToProps = {logout};
const mapStateToProps = store => ({ });
export default connect(mapStateToProps, mapDispatchToProps)(Component);


