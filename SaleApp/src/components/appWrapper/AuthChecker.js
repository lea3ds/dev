
const Component = (props) => {
    console.log("isAuthenticated",props.isAuthenticated)
    if (props.route.isPublic !== true && props.isAuthenticated !== true) {
        props.history.push(props.authPath.path);
        return null;
    }

    return props.children;
}

export default Component;