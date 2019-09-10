const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager{
    static InitCore(app){
        //入口方法
        InitManager.app = app
        InitManager.InitLoadRouters()
        InitManager.loadHttpException()
        InitManager.loadConfig()
    }


    //导入查询是什么环境
    static loadConfig(path = '') {
        const configPath = path || process.cwd() + '/config/config.js'
        const config = require(configPath)
        global.config = config
    }

    static InitLoadRouters() {  
        //path config
        // process.cwd()  获取当前路径的内置函数
        const apiDirectory = `${process.cwd()}/app/api`
        requireDirectory(module, apiDirectory,{
        visit: whenLoadModule
            })

        function whenLoadModule(obj) { 
        if(obj instanceof Router){
            InitManager.app.use(obj.routes())
                }
            }
        }
    
    static  loadHttpException(){
        const errors =  require('./http-exception')
        global.errs =errors
    }
}
module.exports = InitManager