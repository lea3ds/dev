/*

var urlBase = process.env.REACT_APP_SERVER_ADDR;

export function fetchGetAll(url) {
    var request = new Request(urlBase+'/'+url,{
        method: 'GET',
        headers: { 'Content-Type':'application/json' },
    });

    return fetch(request).then(response=> {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
    });
}

export function fetchGet(url, key) {
    if (!!!url) throw Error('url is empty');
    url = '/'+url;
    key = !!key?'/'+key:'';
    
    var request = new Request(urlBase+url+key,{
        method: 'GET',
        headers: { 'Content-Type':'application/json' },
    });

    return fetch(request).then(response=> {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
    });
}

export function fetchPost(url, data) {
    var request = new Request(urlBase+'/'+url,{
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type':'application/json' },
    });

    return fetch(request).then(response=> {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
    });
}

export function fetchPut(url, key, data) {
    var request = new Request(urlBase+'/'+url+'/'+key,{
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type':'application/json' },
    });

    return fetch(request).then(response=> {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
    });

     //ejemplos de usos de Request
        //body: JSON.stringify(7),                  // int      -> Post([FromBody] int value)
        //body: JSON.stringify("hola"),             // string   -> Post([FromBody] string value)
        //body: JSON.stringify({id:7,name:"hola"}),   // class    -> Post(int id, [FromBody] demoClass value)
        //mode: 'cors',
        //credentials : 'include', // tiene problemas con Access-Control-Allow-Origin
        // headers: {
        //     'Content-Type':'application/json',//; charset=utf-8
            //'Content-Type':'multipart/form-data',
            //"Content-Length": '250',
            //'Access-Control-Allow-Origin': 'http://localhost:3000/',
            //'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
            //'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        // },
        //headers: new Headers({"Content-Type": "application/json","Content-Length": payload.length.toString()}),
}
*/