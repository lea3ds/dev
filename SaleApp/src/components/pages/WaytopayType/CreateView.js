import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { routes } from './';
import * as actions from "./_actions";
import * as mui from '@material-ui/core';
import * as reg from "../_helpers/regularExpresion";

class Component extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            current: null,
            isFetching: false,
            errors: {name:true},
        }

        this.props.loadEmpty()
            .then(json => { this.setState({ current: json }); })
            .catch(error => console.log("ERROR [loadEmpty]: ", error))

        this.handleCreate = this.handleCreate.bind(this)

    }

    handleCreate() {
        this.setState({isFetching: true});
        this.props.create(this.state.current)
            .then(json => {
                this.setState({isFetching: false});
                this.props.history.push(routes.EditView.path + '/' + json.id);
            })
            .catch(error => console.log("ERROR [create]: ", error))
    }

    errorsObject (current) {
        var er = {
            name:       !(reg.textReg.test(current.name)),
        };
        return er;
    }

    errorsTextArray (obj) {
        var res = [];
        Object.keys(obj).map(x=> obj[x] ? res.push(x) : null);
        return !!res.length?res:null;
    }

    render() {
        const { current, isFetching } = this.state;

        if (!!!current) return <div></div>;

        var errorsObject = this.errorsObject(current);
        var errorsText = this.errorsTextArray(errorsObject);

        return <div className={this.props.match.path.replace(/^\//, '').replace(/\/$/, '').replace(/\//g, '-')}>

            <mui.TextField label="Name" fullWidth style={{ marginTop: 15 }}
                       value={current.name}
                       error = {errorsObject.name}
                       onChange={e => this.setState({current: { ...current, name: e.target.value}})}
            />

            {isFetching? <div style={{ textAlign: 'center', marginTop: 5 }}>Creating</div>:null}
            {!!errorsText? <div style={{ textAlign: 'center', marginTop: 5 }}>{errorsText.map(x=> <li>Complete {x}</li>)}</div>:null}

            <div style={{ textAlign: 'center', marginTop: 30 }}>
                <mui.Button variant="outlined" size="large" color="primary" style={{ marginRight: 20 }}>
                    <Link to={routes.Root.path}>Cancelar</Link>
                </mui.Button>
                {!isFetching && !errorsText?
                    <mui.Button variant="contained" size="large" color="primary" style={{ marginLeft: 20 }} onClick={this.handleCreate}>
                        Create
                    </mui.Button>
                    :null}
            </div>

        </div>
    }
}

// connect to store
const mapDispatchToProps = { ...actions };
const mapStateToProps = store => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Component);