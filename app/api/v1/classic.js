const Router = require('koa-router')
const router = new Router()

const {PositiveIntegerValidator} = require('../../validators/validator')

router.post('/v1/:id/classic/latest', (ctx,next)=>{
    //User系统
    //2部分 通用性  针对小程序
    //账号密码  附属信息  昵称,邮箱,手机
    //用户最重要的操作是注册和登陆
    const path = ctx.params
    const query = ctx.request.query
    const header = ctx.request.header
    const body = ctx.request.body

  const v = new PositiveIntegerValidator().validate(ctx) //进行实例化
  console.log(v)
  //所有的参数path,query等都是保存在ctx里,要把ctx参数传到validate里才能校验


  const id = v.get('path.id')
  ctx.body = 'success'

})

module.exports = router 