const {Movie,Sentence,Music} = require("./classic")
class Art{
    static async getData(art_id,type){//根据id和type获取实体的值
        
        let art = null
        const finder = {
            where:{
                id:art_id
            }
        }
        switch(type){
            case 100:
                art = await Movie.findOne(finder)
                break
            case 200:
                art = await Music.findOne(finder)
                break
            case 300:
                art = await Sentence.findOne(finder)
                break
            case 400:

                break
        }
        return art
    }
}
module.exports = {
    Art
}