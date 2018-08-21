import React from 'react';
import {TextField,Button} from '@material-ui/core';

class Component extends React.Component {
    state= { error : false };

    onChangeHandle=(value)=> {
        var {type} = this.props;

        if (type === 'email') {
            if (!!!value) this.setState({error: true});
            else this.setState({error: false});
        }

        if (type === 'password') {
            if (!!!value) this.setState({error: true});
            else this.setState({error: false});
        }
    }

    render() {
        let {id, label, type, value, error, color, onChange,onClick, size,variant,disabled} = this.props;
        // button - color [default,primary,secondary]
        // button - variant [outlined,contained,fab,extendedFab]
        if (type === 'button') {
            return <div className={"centered-element-container"}>
                <Button
                    id={id}
                    color={color}
                    onClick={onClick}
                    variant={variant}
                    disabled={disabled}
                    style={{
                        width: size
                    }}
                >
                    {label}
                </Button>

            </div>;
        }

        return <div className={"centered-element-container"}>
            <TextField
                id={id}
                label={label}
                type={type}
                value={value}

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









