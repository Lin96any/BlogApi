const Koa = require('koa')
const parameter = require('koa-parameter')
const bodyParser = require('koa-bodyparser');
const { initManager } = require('./core/init')
const { catchError} = require('./middlewares/catchError')
const app  = new Koa()


/* 校验 */
app.use(parameter(app))

/* 全局错误处理 */
app.use(catchError)

/* bodyParser */
app.use(bodyParser())

/* 自动路由注册以及全局配置文件设置 */
initManager.initCore(app)
/* 初始化数据库 */
require('./Model/UserModel')



app.listen(3000,()=>{
    console.log('服务已启动');
})