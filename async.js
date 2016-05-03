let async = require('async');
let fs = require('fs');
// 并行，任务A和B没有关联
function test1() {
    async.parallel([
    function(cb) {
        fs.readFile('./data/a.json','utf-8',(err,data)=>{
            console.log('任务A 结束')
            cb(err,data);
        })
    },function (cb) {
        fs.readFile('./data/b.json','utf-8',(err,data)=>{
            console.log('任务B 结束')
            cb(err,data);
        })
    }
],(err,data)=>{
    if(err){
        throw err;
    }else{
        console.log(data);
    }
});
}
// 任务出错的情况，会中断未执行任务，继续完成已执行任务
function test2() {
    async.parallel([
    function(cb) {
        fs.readFile('./data/a.json','utf-8',(err,data)=>{
            console.log('任务A 结束')
            cb(err,data);
        })
    },function (cb) {
        fs.readFile('./data/1b.json','utf-8',(err,data)=>{
            console.log('任务B 结束')
            cb(err,data);
        })
    }
],(err,data)=>{
    if(err){
        throw err;
    }else{
        console.log(data);
    }
});
}
// 串行作业
function test3() {
    async.series([
    function(cb) {
        fs.readFile('./data/a.json','utf-8',(err,data)=>{
            console.log('series 任务A 结束,随后紧接着进行任务B')
            cb(err,data);
        })
    },function (cb) {
        fs.readFile('./data/b.json','utf-8',(err,data)=>{
            console.log('series 任务B 结束')
            cb(err,data);
        })
    }
],(err,data)=>{
    if(err){
        throw err;
    }else{
        console.log(data);
    }
});
}
// 如果产生异常，那么会中断所有未执行的任务，因为是串行，所以后续任务都不会执行
function test4() {
    async.series([
    function(cb) {
        fs.readFile('./data/1a.json','utf-8',(err,data)=>{
            console.log('series 任务A 结束,随后紧接着进行任务B')
            cb(err,data);
        })
    },function (cb) {
        fs.readFile('./data/1b.json','utf-8',(err,data)=>{
            console.log('series 任务B 结束')
            cb(err,data);
        })
    }
],(err,data)=>{
    if(err){
        throw err;
    }else{
        console.log(data);
    }
});
}

// 瀑布式，一个任务的执行依赖于前一个的参数
function test5() {
    async.waterfall([
    function(cb) {
        fs.readFile('./data/a.json','utf-8',(err,data)=>{
            console.log('waterfall 任务A 结束,将其获得的结果组装好送给B');
            let people = JSON.parse(data);
            cb(err,people);
        })
    },function (people,cb) {
        fs.readFile('./data/b.json','utf-8',(err,data)=>{
            console.log('waterfall 任务B 结束')
            cb(err,Object.assign(people,JSON.parse(data)));
        })
    }
],(err,people)=>{
    if(err){
        throw err;
    }else{
        console.log(people);
    }
});
}
