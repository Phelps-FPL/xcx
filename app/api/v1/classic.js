const Router = require('koa-router')
const router = new Router({
  prefix:'/v1/classic'
})
const {Auth} = require('../../../middlewares/auth')
const {Flow} =  require('../../models/flow')
const {Art} =  require('../../models/art')
const {Favor} =  require('../../models/favor')
const {PositiveIntegerValidator,
  ClassicValidator} =  require('@validator')

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

//获取下一期的接口
router.get('/:index/next',new Auth().m,async (ctx)=>{
  const v = await new PositiveIntegerValidator().validate(ctx,{
    id:'index'//别名id转化为index
  })
  const index = v.get('path.index')//因为是从路径上获取参数,所以使用path
  const flow = await Flow.findOne({
    where:{
      index:index + 1 //找的是下一期,所以要+1
    } 
  })
  if(!flow){
    throw new global.errs.NotFound()
  }
  //获取根据id获取实体模型
  const art = await Art.getData(flow.art_id,flow.type)
  //获取favor模型的点赞状态
  const likeNext = await Favor.userLikeIt(flow.art_id,flow.type,ctx.auth.uid)
  // flow模型添加到art
  art.setDataValue('index',flow.index)
  //favor模型点赞状态添加到art
  art.setDataValue('like_status',likeNext)
  ctx.body = art
})
//上一期的接口
router.get('/:index/previous',new Auth().m, async (ctx)=>{
  const v = await new PositiveIntegerValidator().validate(ctx,{
    id:'index'//别名id转化为index
  })
  const index = v.get('path.index')//因为是从路径上获取参数,所以使用path
  const flow = await Flow.findOne({
    where:{
      index:index + -1 //找的是上一期,所以要-1
    } 
  })
  if(!flow){
    throw new global.errs.NotFound()
  }
  //获取根据id获取实体模型
  const art = await Art.getData(flow.art_id,flow.type)
  //获取favor模型的点赞状态
  const likeNext = await Favor.userLikeIt(flow.art_id,flow.type,ctx.auth.uid)
  // flow模型添加到art
  art.setDataValue('index',flow.index)
  //favor模型点赞状态添加到art
  art.setDataValue('like_status',likeNext)
  ctx.body = art
})

//获取点赞的详情信息
router.get('/:type/:id', new Auth().m, async ctx=>{
  const v = await new ClassicValidator().validate(ctx)
  const id = v.get('path.id')
  const type = parseInt(v.get('path.type'))
  
  const artDetail =  await new Art(id,type).getDetail(ctx.auth.uid)
  artDetail.art.setDataValue('like_status',artDetail.like_status)
  ctx.body = artDetail.art
})

//每种期刊的用户点赞信息接口
router.get('/:type/:id/favor',new Auth().m, async (ctx) => {
  const v = await new ClassicValidator().validate(ctx)
  const id = v.get('path.id')
  const type = parseInt(v.get('path.type'))
  const artDetail =  await new Art(id,type).getDetail(ctx.auth.uid)
  ctx.body = {
    fav_nums: artDetail.fav_nums,
    like_status:artDetail.like_status
  }
})

//获取用户所以喜欢的列表接口
router.get('/favor', new Auth().m, async ctx =>{
    const uid = ctx.auth.uid
    ctx.body = await Favor.getMyClassicFavors(uid)
})



module.exports = router 