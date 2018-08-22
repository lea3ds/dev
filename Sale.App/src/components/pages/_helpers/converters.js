
export function intToDecimal(value) {
    if (!!!value) value = '000';
    value = value.toString()
    if (value.length===1) value = '00'+value;
    if (value.length===2) value = '0'+value;
    value = value.slice(0,value.length-2) + "." + value.slice(-2);
    return value;
}

export function dateToString(value,format) {
    if (!!!format) format = "ymd-";
    if (!!!value) value = new Date();
    value =  new Date(value+' '); // sin el espacio resta un dia...

    let strDate;

    if (format === 'dmy-') {
        strDate = "" 
            + ("00" + value.getDate()).substr(-2, 2)
            + "-" + ("00" + (value.getMonth() + 1)).substr(-2, 2)
            + "-" + value.getFullYear()
    }

    if (format === 'dmy-hms') {
        strDate = "" 
            + ("00" + value.getDate()).substr(-2, 2)
            + "-" + ("00" + (value.getMonth() + 1)).substr(-2, 2)
            + "-" + value.getFullYear()
            + " " + ("00" + value.getHours()).substr(-2, 2)
            + ":" + ("00" + value.getMinutes()).substr(-2, 2)
            + ":" + ("00" + value.getSeconds()).substr(-2, 2)
    }

    if (format === 'ymd-') {
        strDate = "" 
            + "-" + value.getFullYear()
            + "-" + ("00" + (value.getMonth() + 1)).substr(-2, 2)
            + ("00" + value.getDate()).substr(-2, 2)
    }

    if (format === 'ymd-hms') {
        strDate = "" 
            + "-" + value.getFullYear()
            + "-" + ("00" + (value.getMonth() + 1)).substr(-2, 2)
            + ("00" + value.getDate()).substr(-2, 2)
            + " " + ("00" + value.getHours()).substr(-2, 2)
            + ":" + ("00" + value.getMinutes()).substr(-2, 2)
            + ":" + ("00" + value.getSeconds()).substr(-2, 2)
    }


    return strDate;
}