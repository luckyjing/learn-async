// 运行之后，我们可以看到错误的栈信息并没有捕捉到外面的第一层setTimeout
setTimeout(()=>{
    setTimeout(()=>{
        throw new Error('出错啦');
    },0)
},0);

try{
    setTimeout(()=>{
        let;
    },0);
}catch(e){
    console.error(e);
}
// 运行上述代码，我们发现`new Error('出错啦')`被吞没了，怎么破，怎么会丢呢？且看其真实的执行顺序：
//     (==1==)
// setTimeout(()=>{
//     (==4==)
//     setTimeout(()=>{
//         throw new Error('出错啦');
//     },0)
// },0);

// try{
//     (==2==)
//     setTimeout(()=>{
//     (==5==)
//         let;
//     },0);
// }catch(e){
//     (==3==)
//     console.error(e);
// }
// 我们着重看第二步，可以得出try catch 只会捕捉同步代码，所以当异步代码执行的时候，其实就直接流向了原始的错误处理器
// 同时还可以观察到第四步的时候，又往执行队列里添加了内容，但是这个内容还没来得及执行，就被第五步的错误`let`弄挂掉了。

// 所以在这种情境下，node往往采用将错误当做回调参数一并返回
var fs = require('fs');
fs.readFile('demo.txt',(err,data)=>{
    if(err){
        // do sth
    }
})