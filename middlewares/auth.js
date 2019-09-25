const basicAuth =  require('basic-auth')
const jwt = require('jsonwebtoken')

class Auth {
    constructor(level){
        //权限, 用户8  管理员16
        this.level = level || 1
        Auth.USER = 8
        Auth.ADMIN = 16 
    }
    get m(){
        return async(ctx,next)=>{ 
            const userToken = basicAuth(ctx.req)
            let errMsg = 'token不合法'
            //如果令牌不存在
            if(!userToken || !userToken.name){
                throw new global.errs.Forbbiden(errMsg)
            }
            try {
                // 用jsonwebtoken校验//会返回一个变量
             var decode =  jwt.verify(userToken.name,global.config.security.secretKey)//校验用户传递过来的令牌
            } catch(error){
                //token 不合法
                //token 过期
                if(error.name == 'TokenExpireError'){
                    errMsg = 'token已过期'
                    
                }
                throw new global.errs.Forbbiden(errMsg)
            }

            if(decode.scope < this.level){
                errMsg = '权限不足'
                throw new global.errs.Forbbiden(errMsg)

            }
            //uid,scope
            ctx.auth ={
                uid:decode.uid,
                scope:decode.scope
            }

            await next()
            //koa Node.js
            //node.js的封装对象req
            // ctx.request koa request
            //token 检测
            //token 开发者 传递令牌
            //前后台约定token在哪携带, body,header
            //HTTP里规定HttpBasicAuth
        
        }
    }
    //验证token是否正确
    static verifyToken(token){
        try{
            jwt.verify(token, 
                global.config.security.secretKey)
            return true
        }
        catch (error){
            return false
        }

    }
}
module.exports = {
    Auth
}