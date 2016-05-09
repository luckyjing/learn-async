let co = require('co');
let {readFile,log} = require('../util');
// 等价于async中的series


co(function*(){
    console.log(1);
    let data = yield readFile('data/a.json');
    console.log(2);
    let data1 = yield readFile('data/b.json');
    console.log(3);
    return {
        data,data1};
}).then(data=>{
    console.log(data);
});


// 等价于async中的waterfull
// co(function*(){
//     let data = yield readFile('data/a.json');
//     let data1 = yield (function(data){
//         console.log(data);
//         return readFile('data/b.json');
//     })(data);
//     return {
//         data,data1};
// }).then(data=>{
//     console.log(data);
// });
//等价于async中的parallel
co(function*(){
    return yield [
        readFile('data/a.json'),
        readFile('data/b.json')
    ]
}).then(res=>{
    log(res);
})
// 其实是上述形式的一个语法糖，整个的fn就等价于co(function*),只不过提前包装好罢了
let fn = co.wrap(function*(url){
    return yield Promise.resolve(url);
});
