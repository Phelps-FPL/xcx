//定义一个参数返回的中间件 //Error继承是要在错误将参数作为Error抛出 Error是自带的
class HttpException extends Error{
    constructor(msg ='服务器异常',errorCode = 10000, code =400){
            super()//用super调用基类的函数
            this.errorCode = errorCode
            this.code = code
            this.msg = msg
    }
}

class ParameterExcepiton extends HttpException{
    constructor(msg, errorCode){
        super()
        this.errorCode = errorCode || 10000
        this.msg = msg || '参数错误'
        this.code = 400
    }
}

module.exports = {
    HttpException,
    ParameterExcepiton
}