const {sequelize} = require('../../core/db')//导入sequelize实例  :db,重命名
//还要导入的Sequelize对象
const {Sequelize,Model} = require('sequelize')

class User extends Model{

}

User.init({
   
    id:{// 如果不设置主键的话,系统会自动创一个主键为ID的主键
        type:Sequelize.INTEGER,
        primaryKey:true, //设为主键 唯一性不能重复,不能为空
        autoIncrement:true  //自动增长编号
    },
    nickName:Sequelize.STRING,
    email:Sequelize.STRING,
    password:Sequelize.STRING,
    openid:{//小程序的openid
        type:Sequelize.STRING(64),//设置最长字符为64
        unique:true  //设置为唯一的
    }
    
},{sequelize,tableName:'user'})