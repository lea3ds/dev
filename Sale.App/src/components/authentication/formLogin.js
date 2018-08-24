import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Component extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            passwordNew: '',
        }

    }

    handleClick = () => {
        this.props.login(this.props, this.state.username + '|' + this.state.passwordNew);
    };


    render() {
        return <div>

            <TextField
                id="email"
                label="Username"
                onChange={e => this.setState({ username: e.target.value })}
                type={"email"}
                value={this.state.username}
                fullWidth />

            <TextField

                id="password"
                label="Password"
                onChange={e => this.setState({ passwordNew: e.target.value })}
                type={"password"}
                value={this.state.passwordNew}
                fullWidth />

            <div style={{ marginTop: 5 }} />
            <Button label="Login" variant="outlined" color="primary" onClick={this.handleClick} >
                Log in
            </Button>

        </div>

    }

}

export default Component;

