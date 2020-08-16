const Router = require('koa-router')
const jwt = require('jsonwebtoken')
const { ParameterException, Success } = require('../../../core/http-exception')

const { secret, expiresIn } = require('../../../config/config').tokenConfig

/* 数据库 */
const { User } = require('../../../Model/UserModel')

const router = new Router({
    prefix: '/api/v1'
})

/* 注册 */
router.post('/register', async (ctx, next) => {
    /* 校验 */
    ctx.verifyParams({
        username: { type: 'string', required: true },
        password1: { type: 'string', required: true },
        password2: { type: 'string', required: true },
        email: { type: 'string', required: true },
    })

    /* 判断pwd1和pw2是否一致 */
    const { password1, password2, username,email } = ctx.request.body;

    if (password1 !== password2) {
        throw new ParameterException('两次密码不一致，请重新输入', 100, 412)
    }

    const jw_token = jwt.sign({ username, email }, secret,{expiresIn})
    ctx.response.set({
        token: jw_token
    })

    await  User.create({
        username,
        password:password1,
        email 
    })

    throw new Success('注册成功')
})




module.exports = router