const {sequelize} = require('../../core/db')
const {Sequelize,Model} = require('sequelize')
//业务模型 一期一期的期刊 index 期刊的序号， 


class Flow extends Model{

}
Flow.init({
    //art_id 实体的ID号  
    // type区分music，movie，sentence表
    index:Sequelize.INTEGER,
    art_id:Sequelize.INTEGER,
    type:Sequelize.INTEGER
},{
    sequelize,
    tableName:'flow'
})

module.exports = {
    Flow
}
