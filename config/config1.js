module.exports = {
    //环境prod dev
    environment:'dev',
    database:{
        dbName:'book',
        host:'localhost',
        port:'3306',
        user:'root',
        password:'123456'
    },
    security:{
        secretKey:'abcdefg',//平时这设置是需要很复杂的
        expiresIn:60*60*24*30
    },
    wx:{
        appId:'wxb8c081910233a30f',
        appSecret:'xcxfpl26629855',
        loginUrl:'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    }
}