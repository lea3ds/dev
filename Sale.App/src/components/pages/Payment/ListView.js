import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { routes } from './';
import * as actions from "./_actions";
import * as mui from '@material-ui/core';
import * as table from "../_helpers/table";
import {PlayArrow as GoIcon} from '@material-ui/icons';
import * as converter from "../_helpers/converters";

class Component extends React.Component {

    render() {
        let list = this.props.dataArrays.payment;

        return <div>
            <br />
            <mui.Button variant="outlined" ><Link to={{ pathname: routes.CreateView.path }} >new</Link></mui.Button>
            <br /><br />
            <mui.Table>
                <mui.TableHead>
                    <mui.TableRow>
                        <table.CellId >Id</table.CellId>
                        <table.CellDate>Date</table.CellDate>
                        <table.CellMoney>Mount</table.CellMoney>
                        <table.CellTextFull>Detail</table.CellTextFull>
                        <table.CellText>Categ</table.CellText>
                        <table.CellButton></table.CellButton>
                    </mui.TableRow>
                </mui.TableHead>
                <mui.TableBody>
                    {list.map(x =>
                        <mui.TableRow key={x.id}>
                            <table.CellId>{x.id}</table.CellId>
                            <table.CellDate>{converter.dateToString(x.date, 'dmy-')}</table.CellDate>
                            {/* <CellMoney>{intToDecimal(x.amount)}</CellMoney> */}
                            <table.CellMoney>{x.amount}</table.CellMoney>
                            <table.CellTextFull>{x.detail}</table.CellTextFull>
                            <table.CellText>{!!x.category ? x.category.name : null}</table.CellText>
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










































