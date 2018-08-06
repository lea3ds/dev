
const Component = (props) => {

    if (props.route.isPublic !== true && props.isAuthenticated !== true) {
        props.history.push(props.authPath.path);
        return null;
    }

    return props.children;
}

export default Component;