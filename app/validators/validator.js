const {LinValidator,Rule} = require('../../core/lin-validator')
    // 使用该项目的invalidator校验器
    // 判断是否是正整数的校验器
class PositiveIntegerValidator extends LinValidator{
        constructor(){
            super()   
            this.id = [//可以定义多个规则
                 //Rule是校验规则,要实例化
                new Rule('isInt','需要是正整数',{min:1}) //3个参数,第一个是满足规则,第二个是不满足时提示规则,第三可选参数  
            ]   
        }
}
        //判断注册用户的姓名邮箱密码等
class RegisterValidator extends LinValidator {
    constructor(){
        super()
        this.email = [new Rule('isEmail','不符合Email规范')],//Linvalidator定义了判断邮箱的格式

        this.password1 =[
            new Rule('isLength','密码至少6个字符,最多32个字符',{
                    min:6, 
                    max:32
            }),
            new Rule('matches','密码不符合规范','^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')//Linvalidator定义了判断密码规范
        ],
        this.password2 = this.password1
        this.nickName = [
            new Rule('isLength','昵称最少3个字符',{
                min:3, 
                max:32
        })
        ]
    }
     //多属性校验  可以用自定义校验来关联
     validatePassword(vals){
        const psw1 = vals.body.password1
        const psw2 = vals.body.password2
        if(psw1 !== psw2){
            throw new Error('两个密码必须相同')
        }
    }
}

   

module.exports = {
    PositiveIntegerValidator,
    RegisterValidator
}