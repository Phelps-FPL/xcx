const util = require('util')
const axios = require('axios')
const {User} = require('../models/user')
const {generateToken} = require('../../core/util')
const {Auth}  = require('../../middlewares/auth')
class WXManager{
    static async codeToToken(code){
        const url = util.format(global.config.wx.loginUrl,global.config.wx.appId,
            global.config.wx.appSecret,code)
            
        const result = await axios.get(url)//获取地址,返回的是promise
        if(result.status != 200){ //没有获取到结果
            throw new global.errs.AuthFailed('openid获取失败')
        }
        const errcode = result.data.errcode
        const errmsg = result.data.errmsg
        if(errcode){//等于0才是合法
            throw new global.errs.AuthFailed('openid获取失败:'+errmsg)
        }
        //openid 写入user表,
        //先数据库查有没有openid,没有的话才重新创建
        let user = await User.getUserByOpenid(result.data.openid)
        if(!user){
            user = await User.registerByOpenid(result.data.openid)
        }
        return generateToken(user.id,Auth.USER)
    }
}

module.exports = {
    WXManager
}