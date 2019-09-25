const {sequelize} = require('../../core/db')
const {
    Sequelize,
    Model
} = require('sequelize')
// music moive sentence
//共同字段  image,title,content,fav_nums,pubdate发布日期 type分类
//url music
//base 基类存放共同字段， 子类各自不同，
const classicFields = {
    image:Sequelize.STRING,
    content: Sequelize.STRING,
    pubdate: Sequelize.DATEONLY,
    fav_nums:Sequelize.INTEGER,
    title: Sequelize.STRING,
    type: Sequelize.TINYINT,
}
// 电影
class Moive extends Model {

}
Moive.init(classicFields,{
    sequelize,
    tableName:'moive'
})
// 句子表
class Sentence extends Model {

}
Sentence.init(classicFields,{
    sequelize,
    tableName:'sentence'
})
// 音乐表
class music extends Model {

}
// 音乐独有的链接属性
const musicFields = Object.assign({
    url:sequelize.STRING

},classicFields) 
Music.init(musicFields,{
    sequelize,
    tableName:'sentence'
})

module.exports = {
    Moive,
    Sentence,
    Måusic
}