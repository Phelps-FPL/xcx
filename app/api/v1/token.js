const Router = require('koa-router')
const {TokenValidator} = require('../../validators/validator')

const router = new Router(
    {prefix : '/v1/token'}
)//可以添加路由前缀 

//获取令牌是查询操作,可以用get,用post会安全一些

router.post('/',async (ctx)=>{
    const v = await new TokenValidator().validate(ctx)
})
module.exports = router
