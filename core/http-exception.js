//定义一个参数返回的中间件 //Error继承是要在错误将参数作为Error抛出 Error是自带的
class HttpException extends Error{
    constructor(msg ='服务器异常',errorCode = 10000, code =400){
            super()//用super调用基类的函数
            this.errorCode = errorCode
            this.code = code
            this.msg = msg
    }
}

class ParameterException extends HttpException{
    constructor(msg, errorCode){
        super()
        this.errorCode = errorCode || 10000
        this.msg = msg || '参数错误'
        this.code = 400
    }
}

//定义一个成功获取数据的异常
class Success extends HttpException{
    constructor(msg,errorCode){
        super()
        this.code = 201
        this.msg = msg || 'ok'
        this.errorCode = errorCode || 0
    }
}

//定义资源未找到的异常中间件
class NotFound extends HttpException{
    constructor(msg,errorCode){
        super()
        this.code = 404
        this.msg = msg || '资源未找到'
        this.errorCode = errorCode || 10000
    }
}
//密码不正确授权失败的异常
class AuthFailed extends HttpException{
    constructor(msg,errorCode){
        super()
        this.code = 401
        this.msg = msg || '授权失败'
        this.errorCode = errorCode || 10004
    }
}
//禁止访问异常
class Forbbiden extends HttpException{
    constructor(msg,errorCode){
        super()
        this.code = 403
        this.msg = msg || '禁止访问'
        this.errorCode = errorCode || 10006
    }
}
//已经点赞过了错误
class LikeError extends HttpException{
    constructor(msg,errorCode){
        super()
        this.code = 400
        this.msg = msg || '你已经点赞过'
        this.errorCode = errorCode || 60001
    }
}
//已取消点赞
class DislikeError extends HttpException{
    constructor(msg,errorCode){
        super()
        this.code = 400
        this.msg = msg || '你已取消点赞'
        this.errorCode = errorCode || 60002
    }
}
module.exports = {
    HttpException,
    ParameterException,
    Success,
    NotFound,
    AuthFailed,
    Forbbiden,
    LikeError,
    DislikeError
}