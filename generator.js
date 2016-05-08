function * fibonacci(){
    let [older,old] = [0,1];
    while (true) {
        yield old+older;
        [older,old] = [old,older+old];
    }
}
let g = fibonacci();
let log = console.log;
log(g.next());
log(g.next());
log(g.next());
log(g.next());

function* g1() {
    yield 'hello';
    yield 'Lucky Jing';
}
for (value of g1()) {
    log(value);
}
// yield expressioon 总是没有返回值的，如果需要传入返回值，在next方法里面传入，它会将值当做yield * 的返回值，赋给左值
// next里面的参数表示上一个yield语句的返回值，所以第一个.next()不需要参数
function* g2() {
    let a  = yield 'lucky jing';
    return a;
}
let gen2 = g2();
log(gen2.next());
log(gen2.next());

log('---------------');
// 遍历器的相互嵌套
// 对于yield* 语句，它需要的参数为另一个遍历器，所以当执行next的时候，会进入内部的遍历器，遍历完毕以后再出来
// yield* 等价于执行 for of ，所以 .next()会忽略掉 return 语句，但是return语句的值将作为yield*的返回值
function * inner(){
    yield 'Lucky';
    yield 'Jing';
    return '被代理的Generator函数的返回值将会当做yield*的返回值';
}
function * outer(){
    yield 'Hello';
    let r = yield* inner();
    yield r;
}
let out = outer();
// for(let v of outer()){
//     log(v);
// }
log(out.next());
log(out.next());
log(out.next());
log(out.next());