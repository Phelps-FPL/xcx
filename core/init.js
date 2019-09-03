const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager{
    static InitCore(app){
        //入口方法
        InitManager.app = app
        InitManager.InitLoadRouters(app)
    }

    static InitLoadRouters() {  
        //path config
        // process.cwd()  nojdejs获取当前路径的内置函数
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
}
module.exports = InitManager