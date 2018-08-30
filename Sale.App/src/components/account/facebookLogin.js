import React from 'react';

class Component extends React.Component {

    handleStatusChange = (authResponse) => {
        if (authResponse.status === "connected") {
            this.props.login(this.props,authResponse.authResponse.accessToken);
        }

        // if (authResponse.status === "connected") {
        //     var token = authResponse.authResponse.accessToken;
        //     var data = authResponse;
        //     this.props.logged(token, null, data); // si solo interesa el token
        //     window.FB.api('/me', { fields: 'id,name,email' }, user => this.props.login(token, user, data)); // genero otra llamada para los datos del user
        // }
        // if (authResponse.status === "unknown" || authResponse.status === "not-authorized") {
        //     this.props.handleUserLogOut();
        // }
    }

    componentDidMount() {
        this.props.loadClient(this.props,"https://connect.facebook.net/en_US/sdk.js")
            .then(x => {
                window.FB.init({
                    appId: '2099098913677463',
                    cookie: true,
                    xfbml: true,
                    version: 'v2.7',
                });

                window.FB.Event.subscribe('auth.statusChange', this.handleStatusChange);

                //window.FB.getLoginStatus(response => { console.log(response); })                   
                this.props.initialized(this.props);
            })
            .catch(error => this.props.initialized(this.props,error))
    }

    render() {
        return <div
            className="fb-login-button"
            data-max-rows="1"
            data-size="large"
            //data-button-type="continue_with"
            data-button-type="login_with"
            data-show-faces="false"
            //scope="email"
            //response-type="code"
            data-auto-logout-link="false"
            data-use-continue-as="false"
            width='240'
        />
    }

}

export default Component;





































    // componentDidMount(){

    //     this.props.dispatch(loadClient("https://connect.facebook.net/en_US/sdk.js","FACEBOOK"))
    //         .then(() => {
    //             this.props.dispatch(facebookApiInit)
    //                 .then(()=>{
    //                     window.FB.Event.subscribe('auth.statusChange',(response)=>{
    //                         console.log("FB",window.FB);
    //                         console.log(response);
    //                         if(response.status === "connected" && this.props.userStore.user === null){
    //                             //this.props.dispatch(logInGoogleAction(userInfo,clientName));
    //                         }else if(response.status === "unknown" || response.status === "not-authorized"){
    //                             //this.props.handleUserLogOut();
    //                         }
    //                     })
    //                 })
    //         });
    // }



          // window.FB.getLoginStatus((response)=>{
        //     this.props.dispatch(attemptAutoLogIn(clientName,response.status === "connected"))
        //         .then(()=>{
        //             window.FB.api('/me',{ fields: 'name, email' }, (userInfo) => {
        //                 console.log(response);
        //                 console.log("user",userInfo);
        //                 this.props.dispatch(logInGoogleAction(userInfo,clientName));
        //                 this.props.handleUserLogIn();
        //             });
        //         })
        //         .catch(()=>console.log("No Fb user logged in"))
        //         .finally(()=>{
        //             window.FB.Event.subscribe('auth.statusChange',(response)=>{

        //                 if(response.status === "connected" && this.props.userStore.user === null){
        //                     window.FB.api('/me',{ fields: 'name, email' }, (userInfo) => {
        //                         this.props.dispatch(logInGoogleAction(userInfo,clientName));
        //                         this.props.handleUserLogIn();
        //                     });
        //                 }else if(response.status === "unknown" || response.status === "not-authorized"){
        //                     this.props.handleUserLogOut();
        //                 }
        //             })
        //         });
        // });