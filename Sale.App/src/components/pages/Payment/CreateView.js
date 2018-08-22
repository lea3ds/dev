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
        }

        this.props.loadEmptyPayment()
            .then(json => { this.setState({ current: json }); })
            .catch(error => console.log("ERROR [loadEmptyPayment]: ", error))

        this.handleCreate = this.handleCreate.bind(this)

    }

    handleCreate() {
        this.setState({isFetching: true});
        this.props.createPayment(this.state.current)
            .then(json => {
                this.setState({isFetching: false});
                this.props.history.push(routes.EditView.path + '/' + json.id);
            })
            .catch(error => console.log("ERROR [createPayment]: ", error))
    }

    errorsObject (current) {
        var er = {
            date:       !(current.date),
            amount:     !(reg.intReg.test(current.amount)&& current.amount>=0),
            fees:       !(current.fees>0),
            waytopay:   !(current.waytopay)||!(current.waytopay.id),
            category:   !(current.category)||!(current.category.id),
            detail:     !(reg.textNullReg.test(current.detail)),
        };
        return er;
    }

    errorsTextArray (obj) {
        var res = [];
        Object.keys(obj).map(x=> obj[x] ? res.push(x) : null);
        return !!res.length?res:null;
    }

    render() {
        const { current, isFetching } = this.state; // state
        const categorys = [{ id: 0, name: <em>Seleccionar</em> }, ...this.props.dataArrays.paymentCategory.filter(x=>!x.disabled)];
        const waytopays = [{ id: 0, name: <em>Seleccionar</em> }, ...this.props.dataArrays.waytopay.filter(x=>!x.disabled)];

        if (!!!current) return <div></div>;

        var errorsObject = this.errorsObject(current);
        var errorsText = this.errorsTextArray(errorsObject);

        return <div>

            <mui.TextField label="Date" type="date" InputLabelProps={{ shrink: true, }} style={{ width: "50%", marginTop: 15 }}
                value={current.date}
                error = {errorsObject.date}
                onChange={e => this.setState({current: {...current, date: e.target.value} })}
            />

            <mui.TextField label="Amount" style={{ width: "25%", marginTop: 15 }}
                value={current.amount}
                error = {errorsObject.amount}
                onChange={e => this.setState({current: {...current, amount: e.target.value}})}
            />

            <mui.TextField label="Fees" style={{ width: "25%", marginTop: 15 }}
                value={current.fees}
                error = {errorsObject.fees}
                onChange={e => this.setState({current: { ...current, fees: e.target.value}})}
            />

            <mui.FormControl error = {errorsObject.waytopay} fullWidth style={{ marginTop: 15 }}>
                <mui.InputLabel htmlFor="Waytopay">Waytopay</mui.InputLabel>
                <mui.Select inputProps={{ id: 'Waytopay', }}
                    value={!!!current.waytopay ? 0 : current.waytopay.id}
                    onChange={e => this.setState({current: { ...current, waytopay: { id: e.target.value } }})}
                >
                    {waytopays.map(x =><mui.MenuItem key={x.id} value={x.id}>{x.name}</mui.MenuItem>)}
                </mui.Select>
            </mui.FormControl>

            <mui.FormControl error = {errorsObject.category} fullWidth style={{ marginTop: 15 }}>
                <mui.InputLabel htmlFor="Category">Category</mui.InputLabel>
                <mui.Select inputProps={{ id: 'Category', }}
                    value={!!!current.category ? 0 : current.category.id}
                    onChange={e => this.setState({current: { ...current, category: { id: e.target.value } }})}
                >
                    {categorys.map(x =><mui.MenuItem key={x.id} value={x.id}>{x.name}</mui.MenuItem>)}
                </mui.Select>
            </mui.FormControl>

            <mui.TextField label="Detail" fullWidth multiline rowsMax="4" style={{ marginTop: 15 }}
                value={current.detail}
                error = {errorsObject.detail}
                onChange={e => this.setState({current: { ...current, detail: e.target.value}})}
            />


            <div style={{width:'100%', padding:15, textAlign: 'center'}}>
                {!!isFetching? <li key={'create.isfetching'}>edit.isfetching</li>:null}
                {!!errorsText? errorsText.map(x=> <li key={x}>validation.error.{x}</li>):null}
            </div>

            <div style={{width:'100%', padding:15, textAlign: 'center' }}>
                <mui.Button component={Link} to={routes.Root.path} style={{ margin: 10 }}  variant="contained" size="large" >Cancelar</mui.Button>
                <mui.Button disabled={isFetching || errorsText} style={{ margin: 10 }}  variant="contained" size="large" color="primary" onClick={this.handleCreate}>Create</mui.Button>
            </div>

        </div>
    }
}
// connect to store
const mapDispatchToProps = {...actions };
const mapStateToProps = store => ({ dataArrays: store.dataArrays });
export default connect(mapStateToProps, mapDispatchToProps)(Component);