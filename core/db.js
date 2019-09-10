const Sequelize = require('sequelize')
//把数据库导入进来减少实例化的代码量
const {
    dbName,
    host,
    port,
    user,
    password
} = require('../config/config').database

const sequelize = new Sequelize(dbName,user,password,{
    dialect:'mysql', //指定数据库类型就链接什么类型
    host,
    port,
    logging:true,//显示sql具体操作为true
    timezone:'+08:00',//北京
    define:{

    }
})

module.exports = {
    db:sequelize //修改名称
}