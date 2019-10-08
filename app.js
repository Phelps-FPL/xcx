const Koa = require('koa')
const parser = require('koa-bodyparser')
const path = require('path')
const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')
require('module-alias/register')
const static = require('koa-static')



const app = new Koa()
//  require自动化
// process.cwd()//找到绝对路径node
app.use(parser())
app.use(catchError)

InitManager.InitCore(app)
app.use(static(path.join(__dirname,'./static')))
//全局异常处理调用


        
app.listen(3000)