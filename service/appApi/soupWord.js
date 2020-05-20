const query = require('../config/mysql')

const soupWordApi = {
    // 获取所有鸡汤get
    getSoupWord:async(ctx)=>{
        try{
            let _sql = `select * from soupword`;
            let result = await query(_sql);
            if(result){
                ctx.body={
                    code:200,
                    message:result
                }
            }
        }catch(error){
            console.log(error);
            ctx.body={
                code:500,
                message:error
            }
        }
    },
    // 随机获取一条鸡汤get
    getOneSoupWord:async(ctx)=>{
        try {
            let _sql = `SELECT * FROM soupword WHERE id >= ((SELECT MAX(id) FROM soupword)-(SELECT MIN(id) FROM soupword)) * RAND() + (SELECT MIN(id) FROM soupword) LIMIT 1`;
            let result = await query(_sql);
            if(result && result.length>0){
                ctx.body={
                    code:200,
                    message:result
                }
            }else{
                ctx.body={
                    code:500,
                    message:'获取鸡汤失败'
                }
            }
            
        } catch (error) {
            console.log(error);
            ctx.body={
                code:500,
                message:error
            }
        }
    },
    // 新增一条鸡汤post
    addSoupWord:async(ctx)=>{
        try {
            let content = ctx.request.body.content;
            if(!content){
                ctx.body={
                    code:1,
                    message:'缺少参数:content'
                }
            }
            // 鸡汤查重
            let Repeat = await checkRepeat(content);
            if(Repeat && Repeat.length>0){
                ctx.body={
                    code:2,
                    message:'鸡汤已存在，请重新倒一碗'
                }
                return
            }
            let inserts = [content];
            let _sql = `insert into soupword (content) values (?)`;
            let result = await query(_sql,inserts);
            if(result){
                ctx.body={
                    code:200,
                    message:"成功倒入一碗鸡汤"
                }
            }else{
                ctx.body={
                    code:500,
                    message:'鸡汤倒洒了'
                }
            }
        } catch (error) {
            ctx.body={
                code:500,
                message:error
            }
        }
    },
    // 根据id获取鸡汤详情post
    getSoupWordById:async(ctx)=>{
        try {
            let id = ctx.request.body.id;
            if(!id){
                ctx.body={
                    code:1,
                    message:'缺少参数:content'
                }
            }
            let inserts = [id];
            let _sql = `select * from soupword where id = ?`;
            let result = await query(_sql,inserts);
            if(result){
                ctx.body={
                    code:200,
                    message:result
                }
            }else{
                ctx.body={
                    code:500,
                    message:'获取鸡汤详情失败'
                }
            }
        } catch (error) {
            ctx.body={
                code:500,
                message:error
            }
        }
    },
    // 根据id删除对应的鸡汤post
    deleteSoupById:async(ctx)=>{
        try {
            let Id = ctx.request.body.id;
            if(!Id){
                ctx.body={
                    code:2,
                    message:'缺少参数:id'
                }
                return
            }
            let inserts = [Id];
            let _sql=`delete from soupword where id = ?`;
            let result = await query(_sql,inserts);
            if(result&&result.affectedRows!=0){
                ctx.body={
                    code:200,
                    message:'成功倒掉一碗鸡汤'
                }
            }else{
                ctx.body={
                    code:200,
                    message:'删除鸡汤失败'
                }
            }
    
        } catch (error) {
            ctx.body={
                code:500,
                message:error
            }
        }
    },
    // 根据id修改鸡汤内容post
    editSoupWord:async(ctx)=>{
        try {
            let Id = ctx.request.body.id;
            let content = ctx.request.body.content;
            if(!Id){
                ctx.body={
                    code:2,
                    message:'缺少参数:id'
                }
                return
            }
            if(!content){
                ctx.body={
                    code:2,
                    message:'缺少参数:content'
                }
                return
            }
    
            // 查重
            let reactSoup = await checkRepeat(content);
            if(reactSoup&&reactSoup.length>0){
                ctx.body={
                    code:2,
                    message:'鸡汤已存在，请重新输入'
                }
                return
            }
            let inserts = [content,Id];
            let _sql = `update soupword set content = ? where id = ?`;
            let result = await query(_sql,inserts);
            if(result){
                ctx.body={
                    code:200,
                    message:'鸡汤调味成功'
                }
            }else{
                ctx.body={
                    code:500,
                    message:'鸡汤修改失败'
                }
            }
            
        } catch (error) {
            ctx.body={
                code:500,
                message:error
            }
        }
    }

}

// 检查鸡汤是否重复
const checkRepeat = async (content)=>{
    let inserts=[content]
    let _sql=`select * from soupword where content = ?`;
    let result =  await query(_sql,inserts);
    return result
}


module.exports = soupWordApi;