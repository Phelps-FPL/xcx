const {sequelize} = require('../../core/db')
const {
    Sequelize,
    Model,
    Op
} = require('sequelize')
const {Art} = require('./art')


class Favor extends Model{
    //业务表
    //点赞
    static async like(art_id,type,uid){
     const favor = await Favor.findOne({
         where:{
            art_id,
            type,
            uid
         }
     })
     //如果已经点过赞
     if(favor){
         throw new global.errs.LikeError()
     }
     //创建点赞 sequelize.transaction
     return sequelize.transaction(async t=>{
         await Favor.create({
            art_id,
            type,
            uid
         },{transaction:t})
        const art = await Art.getData(art_id,type,false)
        await art.increment('fav_nums',{by:1,transaction:t})//点赞数+1
     })
    }
    //取消点赞
    static async disLike(art_id,type,uid){
        const favor = await Favor.findOne({
            where:{
               art_id,
               type,
               uid
            }
        })
        //如果没点过赞,为空
        if(!favor){
            throw new global.errs.DislikeError()
        }
        //取消点赞 sequelize.transaction
        //添加的是往Favor表创建,所以用Favor,
        //删除的是Favor的记录,所以直接小写获取到的记录favor.destroy
        return sequelize.transaction(async t=>{
            await favor.destroy({
                force:true,//物理删除,false 软删除,表里还有
                transaction:t
            })
           const art = await Art.getData(art_id,type,false)
           await art.decrement('fav_nums',{by:1,transaction:t})//点赞数-1
        })
    }
    //用户点赞状态记录
    static async userLikeIt(art_id,type,uid){
        const favor = await Favor.findOne({
            where:{
                uid,
                art_id,
                type
            }
        })
        return favor?true:false //判断favor有返回true,没有返回false
    }
    //查询用户所有点赞的期刊
    static async getMyClassicFavors(uid){
        // type != 400
        const arts = Favor.findAll({
            where:{//排除book的点赞
                uid,
                type:{
                    [Op.not]:400//表示type类型不等于400 sequelize的方法
                }
            }
        })
        if(!arts){
            throw new global.errs.NotFound()
        }
    }
}
    

//点赞表
Favor.init({
    uid:Sequelize.INTEGER,//用户是否点赞
    art_id:Sequelize.INTEGER,
    type:Sequelize.INTEGER
},{
    sequelize,
    tableName:'favor'
})
module.exports = {
    Favor
}