/**
 * Created by luckyjing on 16/5/3.
 */
// 异步线程总是在js线程之后进行执行，所以我们会观察到`in loop`会先于任何`console.log(i)`执行
// 事件队列，FIFO
for (var i = 0; i < 3; i++) {
    console.log('in loop');
    setTimeout(function () {
        console.log(i);
    }, 0);
}
// let 用在for循环里,为每一次迭代都创建了新的副本值
for (let i = 0; i < 3; i++) {
    console.log('in loop');
    setTimeout(function () {
        console.log(i);
    }, 0);
}