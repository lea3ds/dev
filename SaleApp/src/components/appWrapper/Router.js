import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthChecker from "./AuthChecker"

export const Component = (props) => {
    return <Switch>
        {props.routes.map((x, index) =>
            <Route
                key={index}
                exact={x.exact === false?false:true}
                path={x.path}
                //component = {e =>React.createElement(x.component, { ...e })}
                render={e => <AuthChecker route={x}>{React.createElement(x.component, { ...e })}</AuthChecker>}
                //render={e => React.createElement(x.component, { ...e, ...x.props })}
            />
        )}
    </Switch>;
}

export default Component;
