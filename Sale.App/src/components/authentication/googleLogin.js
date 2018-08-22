import React from 'react';

class Component extends React.Component {

    handleClick = () => {
        window.auth2Client.grantOfflineAccess()
            .then((response) => {
                this.props.login(this.props,response.code);
                // var token = response.code;
                // var data = response;
                // this.props.login(token, null, data); // si solo interesa el token
            })
    };



    componentDidMount = () => {
        this.props.loadClient(this.props,"https://apis.google.com/js/client:platform.js")
            .then(x => {
                window.gapi.load('auth2', () => {
                    window.gapi.auth2.init({
                        client_id: '92629698983-0avocvpdf49br1usj0im3er2equl8fte.apps.googleusercontent.com',
                        scope: 'profile email'
                    })
                        .then((response) => {
                            window.auth2Client = response;

                            window.gapi.signin2.render('google-sign-in', {
                                'scope': 'profile email',
                                // 'width': 240,
                                // 'height': 40,
                                // 'display': "block",
                                'longtitle': true,
                                'theme': 'dark',
                            });

                            this.props.initialized(this.props);
                        })
                        .catch(error => { throw error; })
                })

            })
            .catch(error => this.props.initialized(this.props,error))
    };

    render() {
        return <div 
            id="google-sign-in"
            style={{ width: 240, height: 40, margin: 'auto',}}
            onClick={this.handleClick}
        />
    }
}

export default Component;

