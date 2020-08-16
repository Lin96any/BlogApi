/* 实现路由自动注册功能 */
const requireDirector = require('require-directory');
const Router = require('koa-router')

class initManager{
    static initCore(app){
        initManager.initLoadRoutes(app)
    }

    /* 路由注册 */
    static initLoadRoutes(app){
        const apiDirector = `${process.cwd()}/app/api`;
        requireDirector(module,apiDirector,{
            visit:whenLoad
        })
        function whenLoad (obj){
            if(obj instanceof Router){
                app.use(obj.routes()).use(obj.allowedMethods())
            }
        }
    }


    


}


module.exports = {
    initManager
}