import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthenticationChecker from "../authentication/routeChecker"

export const Component = (props) => {
    return <Switch>
        {props.routes.map((x, index) =>
            <Route
                key={index}
                exact={x.exact === false ? false : true}
                path={x.path}
                //component = {e =>React.createElement(x.component, { ...e })}
                render={e =>
                    <AuthenticationChecker
                        isPublic = {x.isPublic}
                        history={props.history}
                        authPath={props.authPath.path}
                        isAuthenticated={props.isAuthenticated}>
                        {React.createElement(x.component, {...e})}
                    </AuthenticationChecker>
                }
                //render={e => React.createElement(x.component, { ...e, ...x.props })}
            />
        )}
    </Switch>;
}

export default Component;
