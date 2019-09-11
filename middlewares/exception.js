//创建一个中间件做全局异常监听
const {HttpException} = require('../core/http-exception')
const catchError = async (ctx,next)=>{
    try{
       await next()
    }
    catch(error){
        //开发环境
        //生产环境
        
        const isHttpException = error instanceof HttpException
        const isDev = global.config.environment === 'dev'
        //调式错误的话在开发环境下而且不是Http错误才抛出该错误
        if(isDev && !isHttpException){
            throw error
        }
        if(isHttpException){
            ctx.body = {
                msg: error.msg,//Error构造函数传递进去的,因为message是Error里的一个参数,取得时候可以这样
                error_code:error.errorCode,
                request:`${ctx.method}  ${ctx.path}` //ctx参数在error里面 所以可以直接调用
            }
            ctx.status = error.code
        }
        //未知错误异常
        else{
            ctx.body = {
                msg: 'we made a mistake O(n_n)O~~',
                error_code:999,
                request:`${ctx.method}  ${ctx.path}`
            }
            ctx.status = 500
        }
    }
}

module.exports = catchError