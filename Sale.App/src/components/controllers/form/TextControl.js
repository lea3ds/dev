import React from 'react';
import {TextField} from '@material-ui/core';

class Component extends React.Component {

    state = {error: false}

    onChangeHandle = (value) => {
        let {regex, allowEmpty} = this.props;
        let error = false;
        if (allowEmpty !== true && !!!value) error = true;
        if (!!regex && !regex.test(value)) error = true;
        if (error !== this.state.error) this.setState({error: error});
    }

    render() {
        let {id, label, type, value, error, onChange, size, disabled} = this.props;
        console.log(this.props)
        return <div className={"centered-element-container"}>
            <TextField
                id={id}
                label={label}
                type={type}
                value={value}
                disabled={disabled}
                onChange={e => {
                    this.onChangeHandle(e.target.value);
                    onChange(e);
                }}
                //fullWidth={true}
                style={{
                    width: size
                }}
                error={error!==undefined?error:this.state.error}
            />
        </div>;
    }
}

export default Component;