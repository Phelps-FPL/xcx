//创建一个中间件做全局异常监听
const catchError = async (ctx,next)=>{
    try{
       await next()
    }
    catch(error){
        ctx.body = '服务器有点问题,请等一下'
    }
}

module.exports = catchError