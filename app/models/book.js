const {sequelize} = require('../../core/db')
const util= require('util')
const axios = require('axios')
const {generateToken} = require('../../core/util')
const {
    Sequelize,
    Model,
    Op
} = require('sequelize')
const {Favor} = require('@models/favor')

class Book extends Model{
    constructor(id){
        super()
        this.id = id
    }
    async detail(){
        const url = util.format(global.config.yushu.detailUrl, this.id)
        const detail  = await axios.get(url)
        return detail.data
    }
    //搜索的业务逻辑
    static async searchFromYuShu(q,start,count,summary=1){
        const url = util.format(//encodeURI 中文搜索有效
            global.config.yushu.keywordUrl,encodeURI(q),count,start,summary)
            const result = await axios.get(url)
            return result.data
    }
    //喜欢的书籍数量
    static async getMyFavorBookCount(uid){
        const count = await Favor.count({//Favor的count方法,查询数量
            where:{
                type:400,
                uid
            }
        })
        return count
    }
}
Book.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true //主键
    },
    //业务数据,只需要点赞情况
    fav_nums:{
        type:Sequelize.INTEGER,
        defaultValue:0
    }
},{
    sequelize,
    tableName:'book'
})

module.exports = {
    Book
}