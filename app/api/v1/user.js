const Router = require('koa-router')
const {RegisterValidator} = require('../../validators/validator')
const {User} = require('../../models/user')

const router = new Router(
    {prefix : '/v1/user'}
)//可以添加路由前缀 


// 注册  新增数据 post

router.post('/register',async (ctx)=>{
    //实例化
    const v = await new RegisterValidator().validate(ctx)//如果没添加await得到的promise,并不是验证器本身
    //email password token jwt
    //token 就是一串无意义的随机字符串
    //令牌的获取
    //做一个颁布令牌的接口
    const user = {
        nickname:v.get('body.nickname'),
        email:v.get('body.email'),
        password : v.get('body.password2')
    }
   const r = await User.create(user)
    //v.get            数据库 SQL
    //  Model的功能
    throw new global.errs.Success()
})

module.exports  = router
