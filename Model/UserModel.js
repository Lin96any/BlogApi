/* 创建用户表 */
const { sequelize } = require('../core/db')
const {Sequelize,Model} = require('sequelize')

/* 加盐 */
const bcrypt = require('bcryptjs')


class User extends Model{

}

User.init({
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    username:Sequelize.STRING,
    password:{
        type: Sequelize.STRING,
        set(val){
            const salt = bcrypt.genSaltSync(10);
            const pwd = bcrypt.hashSync(val,salt);
            this.setDataValue('password',pwd);
        }
    },
    email:{
        type:Sequelize.STRING(64),
        unique:true
    },
    userPic:{
        type:Sequelize.STRING,
        defaultValue:'http://qiniu.attribute.top/default_blog_pic.png'
    },
    phone:{
        type: Sequelize.STRING(64),
        defaultValue:'',
        unique:true
    }
},
{
    sequelize,
    tableName:'user',
    timestamps:true
})


module.exports = {
    User
}