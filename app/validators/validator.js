const {LinValidator,Rule} = require('../../core/lin-validator-v2')
const {User} = require('../models/user')
const {LoginType,ArtType} = require('../lib/enum')
    // 使用该项目的invalidator校验器
    // 判断是否是正整数的校验器
class PositiveIntegerValidator extends LinValidator{
        constructor(){
            super()   
            this.id = [//可以定义多个规则
                 //Rule是校验规则,要实例化
                 //自动把字符串转型num
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
        this.nickname = [
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
        //验证邮箱是否重复
        async validateEmail(vals){
            const email = vals.body.email
            const user = await User.findOne({//使用的是Sequlize的内置方法
                where:{
                    email:email
                }
            })
            if(user){
                throw new Error('email已存在')
            }
        }
}

        //令牌token的验证器
    class TokenValidator extends LinValidator {
        constructor(){
            //内容账号
            super()
            this.account = [
                new Rule('isLength','不符合账号规则',{
                        min:4,
                        max:32
                })
            ]
            //密码
            this.secret =[
                //isOptional该项目自己封装的函数
                new Rule('isOptional'),
                new Rule('isLength','至少6个字符',{
                    min:6,
                    max:128
                })
            ]                           
        }
            //设置用户登陆方式的校验器
        validateLoginType(vals){
        if(!vals.body.type){
            throw new Error('type是必须参数')
        }
        if(!LoginType.isThisType(vals.body.type)){
            throw new Error('type参数不合法')
        }
            }
    }
    
    //校验验证token不能为空
    class NotEmptyValidator extends LinValidator{
        constructor(){
            super()
            this.token = [
                new Rule('isLength','不允许为空',{min:1})
            ]
        }
    }
    //类型检测
    class Checker{
        constructor(type){
            this.enumType = type
        }
        // /对类型判断进行封装
        check(vals){
            let type = vals.body.type ||  vals.path.type
            if(!type){ 
                throw new Error('type是必须参数')
            }
            type = parseInt(type)
            if(!this.enumType.isThisType(type)){
                throw new Error('type参数不合法')
            }
                }
    }

    //对类型判断进行封装
    function checkType(vals){
        let type = vals.body.type ||  vals.path.type
        if(!type){ 
            throw new Error('type是必须参数')
        }
        type = parseInt(type)
        if(!LoginType.isThisType(type)){
            throw new Error('type参数不合法')
        }
            }
    //对Art的类型判断
    function checkArtType(vals){
        let type = vals.body.type ||  vals.path.type
        if(!type){ 
            throw new Error('type是必须参数')
        }
        type = parseInt(type)
        if(!ArtType.isThisType(type)){
            throw new Error('type参数不合法')
        }
            }


    

    //点赞的校验器
    class LikeValidator extends PositiveIntegerValidator{
        constructor(){
            super()
            this.validateType = checkArtType
            // const checker  = new Checker(ArtType)
            // this.validateType = checker.check.bind(checker)//把this指向checker
        }
    }
    //详情点赞信息校验器
    class ClassicValidator extends LikeValidator{

    }

   

module.exports = {
    PositiveIntegerValidator,
    RegisterValidator,
    TokenValidator,
    NotEmptyValidator,
    LikeValidator,
    ClassicValidator
}