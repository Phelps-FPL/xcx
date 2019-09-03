const Koa = require('koa')
const parser = require('koa-bodyparser')
const InitManager = require('./core/init')
const catchError = require('./middlewares/excepiton')

const app = new Koa()
//  require自动化
// process.cwd()//找到绝对路径node
app.use(parser())
app.use(catchError)
InitManager.InitCore(app)
//全局异常处理调用

//思考,能不能简化,提高


        
app.listen(3000)