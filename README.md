# JavaScript异步流程
![async-flow](https://github.com/luckyjing/learn-async/raw/master/screenshots/main.jpg)
这里包含了一些有用的例子帮助你去理解，去测试异步流程，你可以按照自己的需求去使用

- `for_with_setTimeout`主要描述了`setTimeout`的执行和主线程之间的先后顺序
- `async` 简单的介绍了`async`异步流程库对异步流程的控制
- `exception` 展示了在异步流程中发生异常，无法正常捕捉堆栈信息的情况
- `promise` 介绍了`es6 Promise`对异步流程的处理
- `co`文件夹里包括了`co`源码，`test`主要测试了当`yield`一个`Promise`对象的时候会返回什么
- `es7-async`介绍了使用`es7`语法`async`和`await`执行异步任务，需要使用`babel-cli`以及`babel-preset-stage-3`
