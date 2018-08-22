import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { routes } from './';
import * as actions from "./_actions";
import * as mui from '@material-ui/core';
import * as miuIcons from '@material-ui/icons';
import * as reg from "../_helpers/regularExpresion";

class Component extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            current: null,
            isFetching: false,
        };

        var urlKey = this.props.location.pathname.substr(this.props.match.path.length + 1);
        this.props.loadPayment(urlKey)
            .then(json => { this.setState({ current: json }) })
            .catch(error => console.log("ERROR [loadPayment]: ", error))

        this.handleSave = this.handleSave.bind(this);
        this.handleAddPending= this.handleAddPending.bind(this);
        this.handleDelPending= this.handleDelPending.bind(this);
    }

    handleSave() {
        this.setState({ isFetching: true });
        this.props.savePayment(this.state.current.id, this.state.current)
            .then(json => {
                this.setState({ isFetching: false });
                this.props.history.push(routes.Root.path);
            })
            .catch(error => console.log("ERROR [savePayment]: ", error))
    }

    handleDelPending(obj) {
        if (this.state.current.pendings.length<=1) return;
        var pendings = this.state.current.pendings.filter(x=>x.id!==obj);
        this.setState({current: {...this.state.current, pendings: pendings }});
    }

    handleAddPending() {
        var newObj = {id:0, date:null, amount:0, waytopay:null};
        this.state.current.pendings.map(x=>x.id>=newObj.id?newObj.id=x.id+1:0);
        this.setState({current: {...this.state.current,pendings: [...this.state.current.pendings,newObj ] }});
    }

    errorsObject (current) {
        var er = {
            date:       !(current.date),
            amount:     !(reg.intReg.test(current.amount)&& current.amount>=0),
            fees:       !(current.fees>0),
            //waytopay:   !(current.waytopay)||!(current.waytopay.id),
            category:   !(current.category)||!(current.category.id),
            detail:     !(reg.textNullReg.test(current.detail)),
            pendings:   [],
        };
        current.pendings.map(x=>
            er.pendings.push({
                id          : x.id,
                amount:     !(reg.intReg.test(x.amount)&& x.amount>=0),
                //date:       !(x.date),
                waytopay:   !(x.waytopay)||!(x.waytopay.id),
            })
        );
        return er;
    }

    errorsTextArray (obj) {
        var res = [];
        Object.keys(obj).map(x=> x==='pendings'?null:obj[x] ? res.push(x) : null);

        if (!!obj.pendings[0]) {
            Object.keys(obj.pendings[0]).map(x=>!!obj.pendings.find(f=>f[x]===true)?res.push('pendings.'+x) : null);
        }
        return !!res.length?res:null;
    }

    render() {

        const { current, isFetching } = this.state; // state
        const categorys = [{ id: 0, name: <em>Seleccionar</em> }, ...this.props.dataArrays.paymentCategory.filter(x=>!x.disabled)];
        const waytopays = [{ id: 0, name: <em>Seleccionar</em> }, ...this.props.dataArrays.waytopay.filter(x=>!x.disabled)];

        if (!!!current) return <div></div>;

        var errorsObject = this.errorsObject(current);
        var errorsText = this.errorsTextArray(errorsObject);

        return <div style={{minWidth:400}}>

            <mui.TextField label="Id" style={{ width: "25%", marginTop: 15 }}
                value={current.id}
            />

            <mui.TextField label="Date" type="date" InputLabelProps={{ shrink: true, }} style={{ width: "40%", marginTop: 15 }}
               value={current.date}
               error = {errorsObject.date}
               onChange={e => this.setState({ current: {...current, date: e.target.value} })}
            />

            <mui.TextField label="Amount" style={{ width: "25%", marginTop: 15 }}
                value={current.amount}
                error = {errorsObject.amount}
            />

            <mui.TextField label="Fees" style={{ width: "10%", marginTop: 15 }}
                value={current.fees}
                error = {errorsObject.fees}
            />

            <mui.FormControl error = {errorsObject.category} fullWidth style={{ marginTop: 15 }}>
                <mui.InputLabel htmlFor="Category">Category</mui.InputLabel>
                <mui.Select inputProps={{ id: 'Category', }}
                    value={!!!current.category ? 0 : current.category.id}
                    onChange={e => this.setState({ current: { ...current, category: { id: e.target.value } }})}
                >
                    {categorys.map(x =><mui.MenuItem key={x.id} value={x.id}>{x.name}</mui.MenuItem>)}
                </mui.Select>
            </mui.FormControl>

            <mui.TextField label="Detail" fullWidth multiline rowsMax="4" style={{ marginTop: 15 }}
                value={current.detail}
                   error = {errorsObject.detail}
                   onChange={e => this.setState({ current: { ...current, detail: e.target.value} })}
            />

            <div style={{ marginTop: 30 }}>
                {current.pendings.map(x => <div key={x.id}>

                    <mui.TextField
                        value={x.date}
                        error = {errorsObject.pendings.find(f=>f.id===x.id).date}
                        onChange={e => {
                            let obj = current.pendings.map(p => p.id !== x.id ? p : { ...p, date: e.target.value });
                            this.setState({ current: { ...current, pendings: obj } })
                        }}
                        label="Date" type="date" InputLabelProps={{ shrink: true, }} style={{ width: "30%" }}
                    />

                    <mui.TextField
                       value={x.amount}
                        error = {errorsObject.pendings.find(f=>f.id===x.id).amount}
                        onChange={e => {
                            let obj = current.pendings.map(p => p.id !== x.id ? p : { ...p, amount: e.target.value });
                            this.setState({ current: { ...current, pendings: obj } })
                        }}
                       label="Amount" style={{ width: "20%"}}
                    />

                    <mui.FormControl error = {errorsObject.pendings.find(f=>f.id===x.id).waytopay} fullWidth style={{  width: "40%" }}>
                        <mui.InputLabel htmlFor="Waytopay">Waytopay</mui.InputLabel>
                        <mui.Select inputProps={{ id: 'Waytopay', }}
                            value={!!!x.waytopay ? 0 : x.waytopay.id}
                            onChange={e => {
                                let obj = current.pendings.map(p => p.id !== x.id ? p : { ...p, waytopay: { id: e.target.value } });
                                this.setState({ current: { ...current, pendings: obj } });
                            }}
                        >
                            {waytopays.map(x =><mui.MenuItem key={x.id} value={x.id}>{x.name}</mui.MenuItem>)}
                        </mui.Select>
                    </mui.FormControl>

                    <mui.IconButton aria-label="Delete" color="secondary"  style={{width: "10%"}} onClick={e=>this.handleDelPending(x.id) }><miuIcons.Delete/></mui.IconButton>
                </div>)}

                <div style={{paddingLeft:'90%', paddingTop:15, textAlign: 'center', width:'10%'}}>
                    <mui.Button variant="fab" color="primary" aria-label="Add" mini onClick={this.handleAddPending}><miuIcons.Add /></mui.Button>
                </div>
            </div>

            <div style={{width:'100%', padding:15, textAlign: 'center'}}>
                {!!isFetching? <li key={'edit.isfetching'}>edit.isfetching</li>:null}
                {!!errorsText? errorsText.map(x=> <li key={x}>validation.error.{x}</li>):null}
            </div>

            <div style={{width:'100%', padding:15, textAlign: 'center' }}>
                <mui.Button component={Link} to={routes.Root.path} style={{ margin: 10 }}  variant="contained" size="large" >Close</mui.Button>
                <mui.Button disabled={isFetching || errorsText} style={{ margin: 10 }}  variant="contained" size="large" color="primary" onClick={this.handleSave}>Save</mui.Button>
            </div>

        </div>
    }
}
// connect to store
const mapDispatchToProps = {...actions };
const mapStateToProps = store => ({ dataArrays: store.dataArrays });
export default connect(mapStateToProps, mapDispatchToProps)(Component);