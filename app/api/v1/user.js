const Router = require('koa-router')
const jwt = require('jsonwebtoken')
/* 加盐 */
const bcrypt = require('bcryptjs')
const { HTTPException, ParameterException, Success } = require('../../../core/http-exception')

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
        MobilePhone: { type: 'string', required: true }
    })

    /* 判断pwd1和pw2是否一致 */
    const { password1, password2, username, email, MobilePhone } = ctx.request.body;

    if (password1 !== password2) {
        throw new ParameterException('两次密码不一致，请重新输入', 100, 412)
    }

    const jw_token = jwt.sign({ username, email, MobilePhone }, secret, { expiresIn })
    ctx.response.set({
        token: jw_token
    })

    await User.create({
        username,
        password: password1,
        email,
        phone: MobilePhone
    })

    throw new Success('注册成功')
})

/* 登录 */
router.post('/login', async (ctx, next) => {
    ctx.verifyParams({
        MobilePhone: { type: 'string', required: true },
        password: { type: 'string', required: true },
    })

    const { password: pwd, MobilePhone } = ctx.request.body;

    /* 查询数据库中有无当前用户 */
    const find = await User.findOne({
        where: {
            phone: MobilePhone
        },
        attributes:['password','phone','username']
    })


    /* 生成jwt */
    const jw_token = jwt.sign({ pwd, MobilePhone }, secret, { expiresIn })
    ctx.response.set({
        token: jw_token
    })


    if (!find) {
        throw new HTTPException('此用户不存在', 1001, 401)
    } else {
        const { password } = find
        /* 比较数据库中的密码 */
        const isPwd = bcrypt.compareSync(pwd, password)
        if (isPwd) {
            throw new Success('登录成功')
        } else {
            throw new ParameterException('手机号或密码错误', 403, 1001)
        }
    }

})


module.exports = router