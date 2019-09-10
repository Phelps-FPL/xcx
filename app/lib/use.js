const {db} = require('../../core/db')//导入sequelize实例  :db,重命名
//还要导入的Sequelize对象
const {Sequelize,Model} = require('sequelize')

class User extends Model{

}

User.init({
    //注册 User ID 设计 id编号系统600001 60002 XXXX
    //自动增长编号 1 2 3
    //数字 字符串  随机字符串 最好不是用字符串记录用户唯一性
    //并发 1000注册是用自动增长会比自己ID编号系统好
    //接口保护 权限 访问接口 Token
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
    //用户 == 小程序  openid 不变且唯一 对一个小程序说
    //  你 A openid1 你 b openid2 
    //你 小程序  公众号 使用unionID 可以跨
})