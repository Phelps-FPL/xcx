const Router = require('koa-router')
const router = new Router()
router.post('/v1/classic/latest', (ctx,next)=>{

    ctx.body = {key: 'classic'}
    throw new Error('API Exception')
    //AOP 面向切面编程
    // 监听错误
    //输出一段有意义的提示信息
})

module.exports = router