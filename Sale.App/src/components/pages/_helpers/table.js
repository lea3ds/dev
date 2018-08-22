import { withStyles, TableCell } from '@material-ui/core';

export const CellStyle = withStyles(style => ({
    head: { width: '1%', minWidth: 80, padding: 5, textAlign: 'center', backgroundColor: '#eeeeee', color: '#000000', },
    body: { width: '1%', minWidth: 80, padding: 5, textAlign: 'center', backgroundColor: '#ffffff', color: '#000000', fontSize: 14, },
}))(TableCell);

export const CellId = withStyles(style => ({ head: { minWidth: 30, }, body: { minWidth: 30, } }))(CellStyle);
export const CellDate = withStyles(style=>{})(CellStyle);
export const CellMoney = withStyles(style => ({ body: { textAlign: 'right' } }))(CellStyle);
export const CellText = withStyles(style => ({ body: { textAlign: 'left' } }))(CellStyle);
export const CellTextFull = withStyles(style => ({ head: { width: '100%' }, body: { width: '100%', textAlign: 'left' } }))(CellStyle);
export const CellButton = withStyles(style=>{})(CellStyle);
