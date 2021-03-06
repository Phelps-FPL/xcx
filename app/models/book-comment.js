const {sequelize} = require('../../core/db')
const {
    Sequelize,
    Model,
} = require('sequelize')

class Comment extends Model{

    static async addComment(bookID,content){
        
        //点赞+1 输入的和数据库的相同评论+1
        const comment = await Comment.findOne({
            where:{
                book_id:bookID,
                content
            }
        })
        if(!comment){
            //不存在 创建新评论
            return await Comment.create({
                book_id:bookID,
                content,
                nums:1
            })
        }else{
            return await comment.increment('nums',{
                by:1
            })
        }
    }

    static async getComments(bookID){
        const comments = await Comment.findAll({
            where:{
                book_id:bookID
            }
        })
        return comments
    }
    // toJSON(){
    //     return{
    //         content:this.getDataValue('content'),
    //         nums:this.getDataValue('nums')
    //     }
    // }
}

Comment.init({
    content:Sequelize.STRING(12),
    nums:{
        type:Sequelize.INTEGER,
        defaultValue:0
    },
    book_id:Sequelize.INTEGER
},{
    sequelize,
    tableName:'comment'
})

module.exports = {
    Comment
}