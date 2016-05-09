let fs = require('fs');
let log = console.log;
function readFile(url){
    return new Promise((resolve,reject)=>{
        fs.readFile(url,'utf-8',(err,data)=>{
            if(err){
                reject(err);
            }
            resolve(data);
        })
    })
}
module.exports = {
    log,
    readFile
}