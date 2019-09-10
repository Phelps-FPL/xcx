const {LinValidator,Rule} = require('../../core/lin-validator')
    // 使用该项目的invalidator校验器
    // 判断是否是正整数的校验器
class PositiveIntegerValidator extends LinValidator{
        constructor(){
            // super()   
            this.id = [//可以定义多个规则
                 //Rule是校验规则,要实例化
                new Rule('isInt','需要是正整数',{min:1}) //3个参数,第一个是满足规则,第二个是不满足时提示规则,第三可选参数  
            ]   
        }
}

module.exports = {
    PositiveIntegerValidator
}