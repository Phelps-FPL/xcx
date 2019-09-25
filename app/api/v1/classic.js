const Router = require('koa-router')
const router = new Router({
  prefix:'/v1/classic'
})
const {Auth} = require('../../../middlewares/auth')

const {PositiveIntegerValidator} = require('../../validators/validator')

router.post('/latest',new Auth().m, async (ctx,next)=>{
    
    //获取期刊最新一期
    const flow = Flow.findOne({
      // 排序 正序和倒序index
      order:[
        ['index','DESC']
      ]
    })
    ctx.body = flow
})

module.exports = router 