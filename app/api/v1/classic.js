const Router = require('koa-router')
const router = new Router()

const {PositiveIntegerValidator} = require('../../validators/validator')

router.post('/v1/:id/classic/latest', (ctx,next)=>{
    const path = ctx.params
    const query = ctx.request.query
    const header = ctx.request.header
    const body = ctx.request.body

  var v = new PositiveIntegerValidator() //进行实例化
  v.validate(ctx)//所有的参数path,query等都是保存在ctx里,要把ctx参数传到validate里才能校验


  const id = v.get('path.id')
  ctx.body = 'success'

})

module.exports = router 