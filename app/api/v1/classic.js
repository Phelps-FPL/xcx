const Router = require('koa-router')
const router = new Router({
  prefix:'/v1/classic'
})
const {Auth} = require('../../../middlewares/auth')

const {PositiveIntegerValidator} = require('../../validators/validator')

router.post('/latest',new Auth().m, async (ctx,next)=>{
    ctx.body = ctx.auth.uid
    //权限  限制token 角色
    //分级 scope   设置权限9  小于9不能访问, 大于可以访问

})

module.exports = router 