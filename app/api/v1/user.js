const Router = require('koa-router')
const {RegisterValidator} = require('../../validators/validator')

const router = new Router(
    {prefix : '/v1/user'}
)//可以添加路由前缀 


// 注册  新增数据 post

router.post('/register',async (ctx)=>{
    //思维路径
    //参数接收 email password1 2 nickname
    const v = new RegisterValidator().validate(ctx)
})

module.exports  = router
