import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const Component = (props) => {
    if (props.route.isPublic !== true && props.authentication.isAuthenticated !== true) {
        props.history.push('/Authentication');
        return null;
    }
    return props.children;
}

const mapDispatchToProps = {};
const mapStateToProps = store => ({ authentication: store.authenticationStore });
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Component));

