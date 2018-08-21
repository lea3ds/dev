
const Component = (props) => {
    var {children, isPublic,isAuthenticated,history,authPath} = props;
    if (isPublic !== true && isAuthenticated !== true) {
        history.push(authPath);
        return null;
    }
    return children;
}

export default Component;