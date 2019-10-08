const {sequelize} = require('../../core/db')
const {
    Sequelize,
    Model
} = require('sequelize')
// music movie sentence
//共同字段  image,title,content,fav_nums,pubdate发布日期 type分类
//url music
//base 基类存放共同字段， 子类各自不同，
const classicFields = {
    image:{
        type:Sequelize.STRING, 
    },
    content: Sequelize.STRING,
    pubdate: Sequelize.DATEONLY,
    fav_nums:{
        type:Sequelize.INTEGER,
        defaultValue:0
    },
    title: Sequelize.STRING,
    type: Sequelize.TINYINT,
}
// 电影
class Movie extends Model {

}
Movie.init(classicFields,{
    sequelize,
    tableName:'movie'
})
// 句子表
class Sentence extends Model {

}
Sentence.init(classicFields,{
    sequelize,
    tableName:'sentence'
})
// 音乐表
class Music extends Model {

}
// 音乐独有的链接属性
const musicFields = Object.assign({
    url:Sequelize.STRING

},classicFields) 
Music.init(musicFields,{
    sequelize,
    tableName:'music'
})

module.exports = {
    Movie,
    Sentence,
    Music
}