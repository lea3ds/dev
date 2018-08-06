import { withStyles, TableCell } from '@material-ui/core';

export const CellStyle = withStyles(theme => ({
    head: { width: '1%', minWidth: 80, padding: 5, textAlign: 'center', backgroundColor: '#eeeeee', color: '#000000', },
    body: { width: '1%', minWidth: 80, padding: 5, textAlign: 'center', backgroundColor: '#ffffff', color: '#000000', fontSize: 14, },
}))(TableCell);

export const CellId = withStyles(theme => ({ head: { minWidth: 30, }, body: { minWidth: 30, } }))(CellStyle);
export const CellDate = withStyles()(CellStyle);
export const CellMoney = withStyles(theme => ({ body: { textAlign: 'right' } }))(CellStyle);
export const CellText = withStyles(theme => ({ body: { textAlign: 'left' } }))(CellStyle);
export const CellTextFull = withStyles(theme => ({ head: { width: '100%' }, body: { width: '100%', textAlign: 'left' } }))(CellStyle);
export const CellButton = withStyles()(CellStyle);
