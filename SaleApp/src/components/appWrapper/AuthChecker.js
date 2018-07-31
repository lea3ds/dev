import { connect } from "react-redux";
import { withRouter } from "react-router-dom";


const Component = (props) => {

    if (props.route.requireAuth === true && props.loggedIn !== true) {
        props.history.push('/Authentication');
        return null;
    }

    return props.children;

}

const mapDispatchToProps = {};
const mapStateToProps = store => ({ appWraper: store.appWraper });
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Component));

