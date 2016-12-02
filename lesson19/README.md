《nodejs常见的异常处理》
1.Nodejs异常处理
2.Nodejs异步异常处理
3.domain介绍
4.domain的API介绍
5.domain异步异常特例


1.try{
    //执行代码
  }catch(err){
   //抛出异常
}

但是这种方式不是所有异常都能捕获 他能捕获到同步执行代码的异常，但是对于异步的异常没办法捕获

2.process.on(‘uncaughtException’，function(){})
通过process.on(‘uncaughtException’)的内置函数，虽然我们可以记录下这个错误的日志，而且进程也不会异常退出，但是我们是没有办法对发现错误的请求友好返回的，只能够让它超时返回。
这样可能导致系统内存不断上涨，如果在大量访问的情况下可能出现程序崩溃的情况

3.利用nodejs提供的domian模块
node在v0.8+版本的时候，发布了一个模块domain。这个模块做的就是try catch所无法做到的：捕捉异步回调中出现的异常。

domain模块，把处理多个不同的IO的操作作为一个组。注册事件和回调到domain，当发生一个错误事件或抛出一个错误时，domain对象 会被通知，不会丢失上下文环境，也不导致程序错误立即推出，与process.on(‘uncaughtException’)不同。
基本概念

隐式绑定: 把在domain上下文中定义的变量，自动绑定到domain对象
显式绑定: 把不是在domain上下文中定义的变量，以代码的方式绑定到domain对象
API介绍
domain.create(): 返回一个domain对象
domain.run(fn): 在domain上下文中执行一个函数，并隐式绑定所有事件，定时器和低级的请求。
domain.members: 已加入domain对象的域定时器和事件发射器的数组。
domain.add(emitter): 显式的增加事件
domain.remove(emitter): 删除事件
domain.bind(callback): 以return为封装callback函数
domain.intercept(callback): 同domain.bind，但只返回第一个参数
domain.enter(): 进入一个异步调用的上下文，绑定到domain
domain.exit(): 退出当前的domain，切换到不同的链的异步调用的上下文中。对应domain.enter()
domain.dispose(): 释放一个domain对象，让node进程回收这部分资源