import React from 'react';
import { connect } from "react-redux";
import { routes } from './';
import * as actions from "./_actions";
// import { loadClient } from "../../_helpers/dispatchers";
// import {Link, withRouter} from 'react-router-dom';
// import Button from '@material-ui/core/Button';
// import FormLogin from "./formLogin";
// import FacebookLogin from "./facebookLogin";
// import GoogleLogin from "./googleLogin";


class Component extends React.Component {

    render() {
        return <div>hola
        </div >;
    }
}

//
// class Component extends React.Component {
//
//     componentDidMount() {
//         console.log(this.props);
//         //this.props.configure();
//         //this.props.autoLogin();
//
//     }
//
//     // login = (event, code) => {
//     //     console.log('login client: ' + event.client, code);
//     // }
//     //
//     // loadClient = (event, clientSrc) => {
//     //     return this.props.loadClient('CLIENT_' + event.client + '_LOAD', event.client, clientSrc)
//     // }
//     //
//     // clientInitialized = (event, error) => {
//     //     console.log('Initialized: ' + event.client, error);
//     // }
//
//     render() {
//         if (this.props.authentication.isAuthenticated) this.props.history.push(routes.App.path);
//
//         //if (console.log(this.props.authentication)
//         return <div style={{ width: '80%', margin: 'auto', textAlign: 'center' }} >
//
//             {/*<div style={{ marginTop: 5 }} >*/}
//                 {/*<FormLogin client='FORM' login={this.login} />*/}
//             {/*</div>*/}
//
//             {/*<div style={{ margin: 20}} >*/}
//                 {/*<Link to='/Authentication' style={{ textDecoration: "none", display: 'block', }}><Button color="secondary">Forgot Password</Button></Link>*/}
//                 {/*<Link to='/Authentication' style={{ textDecoration: "none", display: 'block', }}><Button color="primary" >Register</Button></Link>*/}
//             {/*</div>*/}
//
//             {/*<div style={{ marginTop: 5 }} >*/}
//                 {/*O ingresá con alguna de las siguientes opciones*/}
//             {/*</div>*/}
//
//             {/*<div style={{ marginTop: 5 }} >*/}
//                 {/*<FacebookLogin client='FACEBOOK' loadClient={this.loadClient} login={this.login} initialized={this.clientInitialized} />*/}
//             {/*</div>*/}
//             {/*<div style={{ marginTop: 5 }} >*/}
//                 {/*<GoogleLogin client='GOOGLE' loadClient={this.loadClient} login={this.login} initialized={this.clientInitialized} />*/}
//             {/*</div>*/}
//
//         </div>
//     }
// }


// connect to store
const mapDispatchToProps = {...actions};
const mapStateToProps = store => ({ authentication: store.authenticationStore });
export default connect(mapStateToProps, mapDispatchToProps)(Component);