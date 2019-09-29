const {sequelize} = require('../../core/db')
const {
    Sequelize,
    Model,
    Op
} = require('sequelize')
const {Favor} = require('./favor')

class HotBook extends Model{
    static async getAll(){
        const books = await HotBook.findAll({
            order:[
                'index'
            ]
        })
        //找数据的所有用户的点赞信息favor
        const ids = []
        books.forEach((book)=>{
            ids.push(book.id)
        })
        //要查 Favor的数量
        const favors = await Favor.findAll({
            where:{
                art_id:{
                    [Op.in]:ids,
                    type:400
                }
            },
            group:['art_id'],
            // 数据库语法
            attributes:['art_id',[Sequelize.fn('COUNT','*'),'count']]
        })
        // 循环书籍获取对应书籍的状态
        books.forEach(book=>{
            HotBook._getEachBookStatus(book,favors)
        })
        return books
    }
    //循环所有书籍的状态和点赞信息，
    static _getEachBookStatus(book,favors){
        let count = 0
        favors.forEach(favor=>{
            // 若书籍与点赞信息相同，则把数量保存
            if(book.id === favor.art_id){
                count = favor.get('count')
            }
        })
        book.setDataValue('count',count)
        return book
    }
}

HotBook.init({//不用调用详情信息,是点进详情信息才需要的
    index:Sequelize.INTEGER,  //index用来排序的数据
    image:Sequelize.STRING,
    author:Sequelize.STRING,
    title:Sequelize.STRING

},{
    sequelize,
    tableName:'hot_book'
})

module.exports=  {
    HotBook
}
