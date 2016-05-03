let fs = require('fs');
// 一个简单的Promise对象，通过`fulfill`和`reject`来更改Promise的状态，并且在`then`方法里面拿到最终值
let p = new Promise((fulfill, reject) => {
    if (Math.random() < 0.5) {
        fulfill('fulfill_param');
    } else {
        reject('error_param')
    }
});
// 如果赋予then方法的参数不是function，那么将会简单的抛弃这一层then
p
.then(123)
.then(456)
.then(data=>console.log(data));
// 等价于
p.then(data=>console.log(data));
// 可以在then方法里面拿到Promise对象fulfill或者reject的值
// then方法返回全新的Promise对象，如果在前一步then方法体内，返回的不是Promise对象，那么直接传递给后续Promise的fulfill状态，否则则依赖于新的Promise的结果
p.then(param=>{
    console.log(param);
    return 'success';
},param=>{
    console.log(param);
    return 'error';
}).then(param=>{
    console.log(param);
})

//then 返回Promise的链式调用
// 访问文件A，读取成功后，访问文件B，流程等价于 async.series
let p1 = new Promise((fulfill,reject)=>{
    fs.readFile('./data/a.json','utf-8',(err,data)=>{
        if(err){
            reject(err);
        }
        fulfill(data);
    })
});
let p2 = new Promise((fulfill,reject)=>{
    fs.readFile('./data/b.json','utf-8',(err,data)=>{
        if(err){
            reject(err);
        }
        fulfill(data);
    })
});

let result=[];
p1.then(data=>{
    result.push(data);
    return p2;
}).then(data=>{
    result.push(data);
}).then(()=>{
    console.log(result);
});
// 如果不需要存储结果，可以直接如下
p1
.then(()=>{
    return p2;
})
.then(data=>{
    console.log(data);
});


// 捕捉异常
function testException() {
    let p = new Promise((fulfill,reject)=>{
    fs.readFile('./data/b1.json','utf-8',(err,data)=>{
        if(err){
            reject(err);
        }
        fulfill(data);
    })
});
p.then(()=>{},err=>{
    console.log('reject状态');
    console.log(err);
}).catch(err=>{
    console.log('catch 到了错误');
    console.log(err);
})
}
//上述代码可以看到，错误的状态流入了事先写好的reject函数里
// 如果没有对err进行处理，我们会发现这个err被抛弃掉了，运行下面的代码，发现没有抛出任何异常
function testException1() {
    let p = new Promise((fulfill,reject)=>{
    fs.readFile('./data/b1.json','utf-8',(err,data)=>{
        if(err){
        }
        fulfill(data);
    })
});
p.then(()=>{},err=>{
    console.log('reject状态');
    console.log(err);
})
}
// testException1();
// 使用catch语法糖，我们
function testException2() {
    let p = new Promise((fulfill,reject)=>{
    fs.readFile('./data/b1.json','utf-8',(err,data)=>{
        if(err){
            reject(err);
        }
        fulfill(data);
    })
});
p.catch(err=>{
    console.log('catch 到了错误');
    console.log(err);
})
}
// testException2();


// 实现类似于Parallel 的效果，使用Promise.all

function test() {
    let p1 = new Promise((fulfill,reject)=>{
    fs.readFile('./data/a.json','utf-8',(err,data)=>{
        if(err){
            reject(err);
        }
        fulfill(data);
    })
});
let p2 = new Promise((fulfill,reject)=>{
    fs.readFile('./data/b.json','utf-8',(err,data)=>{
        if(err){
            reject(err);
        }
        fulfill(data);
    })
});
Promise.all([p1,p2])
.then(result=>{
    console.log(result);
})
}
test();