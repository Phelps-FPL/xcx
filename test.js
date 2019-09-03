

//机制  监听任何异常
//全局异常处理

function func1() { 
        func2()
 }
async function func2() { 
     try{
     await  func3()//await 会对所等待的表达式求值
     } catch(error){
         console.log('error')
     }
  }
  function func3() { 
    return new Promise((resolve, reject)=>{
        setTimeout(function () { 
           const r = Math.random()
           if(r < 0.6){
                reject('error')
           }
         })
    })
}

func1()

   //没有发生异常,正确返回结果
//    发生了异常

// 函数设计
// 判断出异常 return false null  一般都不适用return返回异常
//多是使用 throw new Error 编程规范 throw