const {Sequelize,Model} = require('sequelize')
const {unset, clone} = require('lodash')
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
         paranoid:true,//添加 deletedAt
        underscored:true,//把驼峰命名改为下划线
        createdAt:'created_at',
        updatedAt:'updated_at',
        deletedAt:'deleted_at',
        underscored:true,
        freezeTableName:true,
        scopes:{
            bh:{
                attributes:{
                    exclude:['updated_at','deleted_at','created_at']
                }
            }
        }
 
    }
})

    sequelize.sync({
        force:false //为true时每次发送都会删除数据库
    })
    //直接在数据库里进行toJSON方法转换
    Model.prototype.toJSON =  function () { 
        let data = clone(this.dataValue)
        unset(data,'updated_at')
        unset(data,'created_at')
        unset(data,'deleted_at')
     }

module.exports = {
    sequelize //修改名称
}