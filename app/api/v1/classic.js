const Router = require('koa-router')
const router = new Router({
  prefix:'/v1/classic'
})
const {Auth} = require('../../../middlewares/auth')
const {Flow} =  require('../../models/flow')
const {Art} =  require('../../models/art')
const {Favor} =  require('../../models/favor')



const {PositiveIntegerValidator} = require('../../validators/validator')

router.get('/latest',new Auth().m, async (ctx,next)=>{
    
    //获取期刊最新一期
    const flow = await Flow.findOne({
      // 排序 正序和倒序index
      order:[
        ['index','DESC']
      ]
    })
    //获取根据id获取实体模型
    const art = await Art.getData(flow.art_id,flow.type)
    //获取favor模型的点赞状态
    const likeLatest = await Favor.userLikeIt(flow.art_id,flow.type,ctx.auth.uid)
    // flow模型添加到art
    art.setDataValue('index',flow.index)
    //favor模型点赞状态添加到art
    art.setDataValue('like_status',likeLatest)
    ctx.body = art
    //思考,  为什么KOA会直接返回art类里的datavalue的值
})

module.exports = router 