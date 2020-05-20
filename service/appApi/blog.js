const query = require('../config/mysql');
const BlogApi = {
    // 获取文章列表get
    getArticleList:async(ctx)=>{
        try {
            let _sql = `select article.id as id,article.title as title,article.introduce as introduce,article.addTime as addTime,article.view_count as view_count,type.typeName as typeName from article left join type on article.type_id = type.id`;
            let result = await query(_sql);
            if(result){
                if(result.length>0){
                    ctx.body={
                        code:200,
                        data:result
                    }
                    return
                }else{
                    ctx.body={
                        code:200,
                        message:"文章列表为空"
                    }
                }
            }else{
                ctx.body={
                    code:500,
                    message:"获取文章列表失败"
                }
            }
        } catch (error) {
            ctx.body={
                code:500,
                message:error
            }
        }
    },

    // 根据id获取文章详情post
    getArticleById:async(ctx)=>{
        try {
            let {id} = ctx.request.body;
            if(!id){
                ctx.body={
                    code:1,
                    message:'缺少参数:id'
                }
                return
            }
            let inserts = [id];
            let _sql = `select article.id as id,article.title as title,article.introduce as introduce,article.article_content as article_content,article.addTime as addTime,article.view_count as view_count,type.typeName as typeName,type.id as typeId from article left join type on article.type_id = type.id where article.id = ?`;
            let result = await query(_sql,inserts);
            if(result&&result.length>0){
                    ctx.body={
                        code:200,
                        datas:{
                            data:result,
                            message:'获取文章信息成功'
                        }
                    }
                    return
            }else{
                cxt.body={
                    code:500,
                    message:'获取文章信息失败'
                }
            }
    
        } catch (error) {
            ctx.body={
                code:500,
                message:error
            }
        }
    },

    // 新增文章post

    addArticle:async(ctx)=>{
        try {
            let tempArticle = ctx.request.body;
            let {type_id,title,article_content,introduce,addTime} = tempArticle;
            if(!type_id || !title || !article_content || !introduce || !addTime){
                ctx.body={
                    code:1,
                    message:'缺少参数'
                }
                return
            }
            let inserts = [type_id,title,article_content,introduce,addTime];
            let _sql = `insert into article (type_id,title,article_content,introduce,addTime) values (?,?,?,?,?)`;
            let result = await query(_sql,inserts);
            if(result){
                ctx.body={
                    code:200,
                    datas:{
                        data:result,
                        message:'新增文章成功'
                    }
                }
            }else{
                ctx.body={
                    code:500,
                    message:'新增文章失败'
                }
            }
        } catch (error) {
            ctx.body={
                code:500,
                message:error
            }
        }
    },
    // 根据id修改文章信息post

    updateArticle:async(ctx)=>{
        try {
            let tempArticle = ctx.request.body;
            let {id,type_id,title,article_content,introduce,addTime} = tempArticle;
            if(!id || !type_id || !title || !article_content || !introduce || !addTime ){
                ctx.body={
                    code:1,
                    message:'缺少参数'
                }
                return
            }
            let inserts = [type_id,title,article_content,introduce,addTime,id];
            let _sql = `update article set type_id = ?,title = ?,article_content = ?,introduce = ?,addTime = ? where id = ?`;
            let result  = await query(_sql,inserts)
            if(result){
                ctx.body={
                    code:200,
                    datas:{
                        message:'修改文章成功',
                        data:result
                    }
                }
            }else{
                ctx.body={
                    code:500,
                    message:'修改文章失败'
                }
            }
        } catch (error) {
            ctx.body={
                code:500,
                message:error
            }
        }
    },
// 根据id删除文章post
    deleteArticleById:async(ctx)=>{
        try {
                let id = ctx.request.body.id;
                if(!id){
                    ctx.body={
                        code:1,
                        message:'缺少参数:id'
                    }
                    return
                }
                let inserts = [id];
                let _sql = `delete from article where id = ?`;
                let result = await query(_sql,inserts);
                if(result){
                    if(result.affectedRows==1){
                        ctx.body={
                            code:200,
                            message:'删除成功'
                        }
                        return
                    }
                    else{
                        ctx.body={
                            code:200,
                            message:'找不到要删除的文章'
                        }
                    }
                }else{
                    ctx.body={
                        code:500,
                        message:'删除文章失败'
                    }
                }
        } catch (error) {
            ctx.body={
                code:500,
                message:error
            }
        }
    },
    // 获取文章类别表信息get
    getTypeInfo:async(ctx)=>{
        try {
            let _sql = `select * from type`;
            let result = await query(_sql);
            if(result){
                ctx.body={
                    code:200,
                    message:result
                }
            }else{
                ctx.body={
                    code:500,
                    message:'获取文章类别信息失败'
                }
            }
        } catch (error) {
            ctx.body={
                code:500,
                message:error
            }
        }
    },

    // 新增文章类别post
    addTypeInfo:async(ctx)=>{
        try {
            let typeName = ctx.request.body.typeName;
            if(!typeName){
                ctx.body={
                    code:1,
                    message:'缺少参数:typeName'
                }
                return
            }
            // 查重
            const repeat = await checkRepeat(typeName);
            if(repeat&&repeat.length>0){
                ctx.body={
                    code:2,
                    message:'文章类型已经存在'
                }
                return
            }
            let inserts = [typeName];
            let _sql = `insert into type(typeName) values (?)`;
            let result = await query(_sql,inserts);
            if(result){
                ctx.body={
                    code:200,
                    message:"新增文章类型成功"
                }
            }else{
                ctx.body={
                    code:500,
                    message:'新增文章内容失败'
                }
            }
        } catch (error) {
            ctx.body={
                code:500,
                message:error
            }
        }
    },
// 修改文章类型post
    updateTypeInfo:async(ctx)=>{
        try {
            let {id,typeName} = ctx.request.body;
            if(!id || !typeName){
                ctx.body={
                    code:1,
                    message:'缺少参数'
                }
                return
            }
            // 查重
            const repeat = await checkRepeat(typeName);
            if(repeat&&repeat.length>0){
                ctx.body={
                    code:2,
                    message:'文章类型已经存在'
                }
                return
            }
            let inserts = [typeName,id];
            let _sql = `update type set typeName = ? where id = ?`;
            let result = await query(_sql,inserts);
            if(result){
                ctx.body={
                    code:200,
                    message:"修改文章类型成功"
                }
            }else{
                ctx.body={
                    code:500,
                    message:'修改文章内容失败'
                }
            }
        } catch (error) {
            ctx.body={
                code:500,
                message:error
            }
        }
    },
    // 删除文章类别post
    deleteTypeInfo:async(ctx)=>{
        try {
            let id = ctx.request.body.id;
            if(!id){
               ctx.body={
                   code:1,
                   message:'缺少参数:id'
               }
               return
           }
            let inserts = [id];
            let _sql = `delete from type where id = ?`;
            let result = await query(_sql,inserts);
            if(result){
                if(result.affectedRows==1){
                    ctx.body={
                        code:200,
                        message:'删除成功'
                    }
                    return
                }
                else{
                    ctx.body={
                        code:200,
                        message:'找不到要删除的文章类别'
                    }
                }
            }else{
                ctx.body={
                    code:500,
                    message:'删除文章类别失败'
                }
            }
       } catch (error) {
           ctx.body={
               code:500,
               message:error
           }
       }
    },
     // 新增浏览次数post
     addViewCount:async(ctx)=>{
        try {
            let {id,count} = ctx.request.body;
            if(!id || !count){
                ctx.body={
                    code:1,
                    message:'缺少参数'
                }
                return
            }
            let inserts = [count,id];
            let _sql = `update article set view_count = ? where id = ?`;
            let result = await query(_sql,inserts);
            if(result){
                ctx.body={
                    code:200,
                    message:"新增浏览次数成功"
                }
                return
            }else{
                ctx.body={
                    code:500,
                    message:"新增浏览次数失败"
                }
            }
    
             
         } catch (error) {
             ctx.body={
                 code:500,
                 message:error
             }
         }
     },

    //  通过浏览次数查询出排行get
    getArticleRankList:async(ctx)=>{
        try {
            //    let _sql = `select article.id,article.type_id,article.title,article.introduce,article.addTime,article.view_count from article order by view_count desc`;
               let _sql = `select article.id,article.title,article.view_count from article order by view_count desc limit 10`;
               let result = await query(_sql);
               if(result){
                   ctx.body={
                       code:200,
                       message:result
                   }
                   return
               }else{
                   ctx.body={
                       code:500,
                       message:"获取文章排行失败"
                   }
               }
            } catch (error) {
                ctx.body={
                    code:500,
                    message:error
                }
            }
    },
    // 查询文章类型是否存在
     checkRepeat: async (typeName)=>{
        let inserts = [typeName];
        let _sql = `select * from type where typeName = ?`;
        let result = await query(_sql,inserts);
        return result
    }

}



module.exports = BlogApi;