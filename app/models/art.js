const {Movie,Sentence,Music} = require("./classic")
const {Op} = require('sequelize')
const {flatten} = require('lodash')
 //循环导入就会出现错误，art导入favor，favor导入art

//class ArtCollection 专门定义集合给对象
class Art{
    constructor(art_id,type){
        this.art_id = art_id
        this.type = type
    }

    async getDetail(uid){
        const {Favor} = require('./favor')
        const art = await Art.getData(this.art_id,this.type)
        if(!art){//如果期刊不存在
            throw new global.errs.NotFound()
        }
        //获取favor模型的点赞状态
        const like = await Favor.userLikeIt(this.art_id,this.type,uid)
        //合并成对象返回
        return{
            art,
            like_status:like
        }
    }
    //获取一组arts实体对象
        static async getList(artInfoList){
            //in [ids]
            const artInfoObj = {
                100:[],
                200:[],
                300:[],
            }
            for(let artInfo of artInfoList){//of循环数组    
                // 可以switch方法
                //更简洁的，各自类型中插入id
                artInfoObj[artInfo.type].push[artInfo.art_id]
            }
            //循环artonfoObj， 选择类型
            const arts = []
            for(let key in artInfoObj){
                const ids = artInfoObj[key]
                if(ids.length === 0){//遍历artInfoObj可能是空数组，要为0，不能非空
                    continue
                }
                //循环里面尽量用封装的函数，不要用业务
                key = parseInt(key)
                //数组添加数组会成为二维数组、
                arts.push(await Art._getListByType(ids,key))//obj的属性都是key是字符串
            }
            return flatten(arts)//flatten可以把二维一维，是loadash插件的方法
        }
    static async _getListByType(ids,type){
            //如何根据type，id进行查询
            let arts = []//接收的是数组
            const finder = {
                where:{
                    id:{
                        [Op.in]:ids//in 查询
                    }
                }
            }
            const scope = 'bh'
            switch(type){
                case 100:
                    arts = await Movie.scope(scope).findAll(finder)
                    break
                case 200:
                    arts = await Music.scope(scope).findAll(finder)
                    break
                case 300:
                    arts = await Sentence.scope(scope).findAll(finder)
                    break
                case 400:
    
                    break
            }
            return arts
        }
    
    static async getData(art_id,type,useScope=true){//根据id和type获取实体的值
        
        let art = null
        const finder = {
            where:{
                id:art_id
            }
        }
        const scope = useScope?'bh':null
        switch(type){
            case 100:
                art = await Movie.scope(scope).findOne(finder)
                break
            case 200:
                art = await Music.scope(scope).findOne(finder)
                break
            case 300:
                art = await Sentence.scope(scope).findOne(finder)
                break
            case 400:

                break
        }
        return art
    }
}
module.exports = {
    Art
}