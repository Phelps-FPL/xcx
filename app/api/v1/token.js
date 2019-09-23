const Router = require('koa-router')
const {TokenValidator} = require('../../validators/validator')
const {LoginType} = require('../../lib/enum')
const {User} = require('../../models/user') 
const {generateToken} = require('../../../core/util')
const {Auth} = require('../../../middlewares/auth')
const {WXManager} = require('../../services/wx')

const router = new Router(
    {prefix : '/v1/token'}
)//可以添加路由前缀 

//获取令牌是查询操作,可以用get,用post会安全一些

//业务逻辑,  在模型model里,  在API接口编写 
//业务分层 Model , Service 越复杂,就越好可以分层
router.post('/',async (ctx)=>{
    const v = await new TokenValidator().validate(ctx)
    let token
    //type登录类型 email 小程序
    //非公开api必须携带令牌
    switch(v.get('body.type')){
        case LoginType.USER_EMAIL:
            //获取邮箱登陆账号密码
          token = await emailLogin(v.get('body.account'),v.get('body.secret'))  
            break;
        case LoginType.USER_MINI_PROGRAM:
            //获取openid
        token =  await WXManager.codeToToken(v.get('body.account'))
            break;
        case LoginType.ADMIN_EMAIL:
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
    return token = generateToken(user.id,Auth.USER)//普通用户的权限是8
}
module.exports = router
