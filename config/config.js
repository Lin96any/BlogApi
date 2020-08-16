const environment = 'dev'

const dbConfig = {
    port: environment === 'dev' ? 3306 : 10080,
    host: environment === 'dev' ? 'localhost' :'cdb-4kqw27pk.cd.tencentcdb.com',
    username:'root',
    dbName:'island',
    password: environment === 'dev'?'112233lq':'112233lqlqw',
    islogging: environment === 'dev' 
}

const tokenConfig = {
    secret:'FyIHTjZ6eKSGgEp2m7vh',
    expiresIn:60*60
}

module.exports = {
    environment,
    dbConfig,
    tokenConfig
}