const { HTTPException } = require('../core/http-exception')

const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        if (error instanceof HTTPException) {
            ctx.body = {
                msg: error.msg,
                errorCode: error.errorCode,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = error.stateCode
        } else {
            console.log(error);
            ctx.body = {
                msg: error.message || "we made a mistake",
                errors: error.errors || {},
                params: error.params || {},
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = error.statusCode || 500
        }
    }
}


module.exports = {
    catchError
}