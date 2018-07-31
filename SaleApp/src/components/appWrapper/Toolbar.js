import React from 'react';
import { connect } from "react-redux";
import { openDrawer } from "../../actions/appWraper";
import Button from '@material-ui/core/Button';


const Component = (props) => {
    return <Button onClick={e => props.openDrawer()}>Open Left</Button>;
}


const mapDispatchToProps = { openDrawer };
const mapStateToProps = store => ({ appWraper: store.appWraper });
export default connect(mapStateToProps, mapDispatchToProps)(Component);