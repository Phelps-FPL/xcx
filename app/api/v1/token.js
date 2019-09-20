const Router = require('koa-router')
const {TokenValidator} = require('../../validators/validator')
const {LoginType} = require('../../lib/enum')
const {User} = require('../../models/user') 
const {generateToken} = require('../../../core/util')

const router = new Router(
    {prefix : '/v1/token'}
)//可以添加路由前缀 

//获取令牌是查询操作,可以用get,用post会安全一些

router.post('/',async (ctx)=>{
    const v = await new TokenValidator().validate(ctx)
    let token
    //type登录类型 email 小程序
    //非公开api必须携带令牌
    switch(v.get('body.type')){
        case LoginType.USER_EMAIL:
          token = await emailLogin(v.get('body.account'),v.get('body.secret'))  
            break;
        case LoginType.USER_MINI_PROGRAM:
            break
        default:
            throw new global.errs.ParameterException('没有相应的处理函数')
    }
    ctx.body={
        token
    }
})
//验证账号密码是否错误
async function emailLogin(account, secret){
    const user = await User.verifyEmailPassword(account,secret)
    return token = generateToken(user.id,2)
}
module.exports = router
