let {log,readFile} = require('./util');


let read_series = async function(){
    let data1 = await readFile('./data/a.json');
    let data2 = await readFile('./data/b.json');
    log(data1);
    log(data2);
}


// read_series();

let read_parallel = async function(){
    let read = ['./data/a.json','./data/b.json'];
    read = read.map(fileName=>{
        return readFile(fileName);
    })
    let data = await Promise.all(read);
    log(data);
}
read_parallel();

let read_waterfall = async function(){
    let data = await readFile('./data/a.json');
    let data2 = await readFile('./data/b.json').then(_data=>{
        return Object.assign({},{first:data},{second:_data});
    });
    log(data2);
}
// read_waterfall();
let hasError = async function(){
    try{
        let data = await readFile('./data/c.json');
        return data;
    }catch(e){
        log(e);
    }
}
// hasError();
let hasError_catch = async function () {
    let data = await readFile('./data/c.json').catch(err=>{return err});
    log(data);
}
// hasError_catch();