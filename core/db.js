const { dbName, username, password, port, host, islogging} = require('../config/config').dbConfig
const Sequelize = require('sequelize')

/* 实例化Sequelize */
const sequelize = new Sequelize(dbName,username,password,{
    host,
    port,
    logging: islogging,
    timezone:'+8:00',
    dialect:'mysql',
    define:{
        paranoid:true,
        createdAt: 'created_at',
        updatedAt: 'update_at',
        deletedAt: 'deleted_at',
        underscored: true
    }
})

sequelize.sync(
    {
        force: false
    }
)


module.exports = {
    sequelize
}
