import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { routes } from './';
import * as actions from "./_actions";
import * as mui from '@material-ui/core';
import * as table from "../_helpers/table";
import {PlayArrow as GoIcon} from '@material-ui/icons';


class Component extends React.Component {
    render() {
        let list = this.props.dataArrays.waytopayType;

        return <div className={this.props.match.path.replace(/^\//, '').replace(/\/$/, '').replace(/\//g, '-')}>
            <br />
            <mui.Button variant="outlined" ><Link to={{ pathname: routes.CreateView.path }} >new</Link></mui.Button>
            <br /><br />
            <mui.Table>
                <mui.TableHead>
                    <mui.TableRow>
                        <table.CellId >Id</table.CellId>
                        <table.CellTextFull>Name</table.CellTextFull>
                        <table.CellText>Disabled</table.CellText>
                        <table.CellButton></table.CellButton>
                    </mui.TableRow>
                </mui.TableHead>
                <mui.TableBody>
                    {list.map(x =>
                        <mui.TableRow key={x.id}>
                            <table.CellId>{x.id}</table.CellId>
                            <table.CellTextFull>{x.name}</table.CellTextFull>
                            <table.CellText><mui.Switch color="Secondary" checked={x.disabled} /></table.CellText>
                            <table.CellButton><Link to={{ pathname: routes.EditView.path +'/'+ x.id }} ><GoIcon /></Link></table.CellButton >
                        </mui.TableRow >
                    )}
                </mui.TableBody >
            </mui.Table >
        </div >;
    }
}


const mapDispatchToProps = {...actions};
const mapStateToProps = store => ({ dataArrays: store.dataArrays });
export default connect(mapStateToProps, mapDispatchToProps)(Component);
