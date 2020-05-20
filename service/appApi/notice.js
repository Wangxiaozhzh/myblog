// 公告数据操作

const query = require('../config/mysql');

const NoticeApi = {
    // 前端获取所有公告get
    getAllShowNotice:async(ctx)=>{
        try{
            let _sql = `select * from notice where isShow = 1`;
             let result = await query(_sql);
             if(result){
                 if(result.length>0){
                     ctx.body={
                         code:200,
                         message:result
                     }
                     return 
                 }else if(result.length==0){
                     ctx.body={
                         code:201,
                         message:'暂无公告'
                     }
                     return 
                 }
             }else{
                 ctx.body={
                     code:500,
                     message:'获取数据失败'
                 }
                 return 
             }
             
         }catch(error){
             ctx.body={
                 code:500,
                 message:error
             }
         }
    },
    // 管理端获取所有公告get
    getAllNotice:async(ctx)=>{
        try{
            let _sql = `select * from notice`;
             let result = await query(_sql);
             if(result){
                 if(result.length>0){
                     ctx.body={
                         code:200,
                         message:result
                     }
                     return 
                 }else if(result.length==0){
                     ctx.body={
                         code:201,
                         message:'暂无公告'
                     }
                     return 
                 }
             }else{
                 ctx.body={
                     code:500,
                     message:'获取数据失败'
                 }
                 return 
             }
             
         }catch(error){
             ctx.body={
                 code:500,
                 message:error
             }
         }
    },
    // 新增公告post
    addNotice:async(ctx)=>{
        try{
            let {content} = ctx.request.body;
            if(!content){
                return ctx.body={
                    code:1,
                    message:'缺少参数:content'
                }
            }
            let inserts = [content]
            let _sql = `insert into notice (content) values (?)`;
            let result = await query(_sql,inserts);
            if(result){
                ctx.body={
                    code:200,
                    message:'新增公告成功'
                }
            }else{
                ctx.body={
                    code:500,
                    message:'新增公告失败'
                }
                return 
            }
        }catch(error){
            ctx.body={
                code:500,
                message:error
            }
        }
    },
    // 修改公告post
    updateNoticeById:async(ctx)=>{
        try{
            let {id,content,isShow} = ctx.request.body;
            if(!id || !content || !isShow){
                return ctx.body={
                    code:1,
                    message:'缺少参数'
                }
            }
            let inserts = [content,isShow,id]
            let _sql = `update notice set content = ?,isShow = ? where id = ?`;
            let result = await query(_sql,inserts);
            if(result){
                ctx.body={
                    code:200,
                    message:'更新公告成功'
                }
            }else{
                ctx.body={
                    code:500,
                    message:'更新公告失败'
                }
                return 
            }
        }catch(error){
            ctx.body={
                code:500,
                message:error
            }
        }
    },
    // 删除公告post
    deleteNoticeById:async(ctx)=>{
        try{
            let {id} = ctx.request.body;
            if(!id){
                return ctx.body={
                    code:1,
                    message:'缺少参数:id'
                }
            }
            let inserts = [id]
            let _sql = `delete from notice where id = ? `;
            let result = await query(_sql,inserts);
            if(result){
                ctx.body={
                    code:200,
                    message:'删除公告成功'
                }
            }else{
                ctx.body={
                    code:500,
                    message:'删除公告失败'
                }
                return 
            }
        }catch(error){
            ctx.body={
                code:500,
                message:error
            }
        }
    },
    // 根据id获取公告详情post
    getNoticeById:async(ctx)=>{
        try{
            let {id} = ctx.request.body;
            if(!id){
                return ctx.body={
                    code:1,
                    message:'缺少参数:id'
                }
            }
            let inserts = [id]
            let _sql = `select * from notice where id = ? `;
            let result = await query(_sql,inserts);
            if(result){
                ctx.body={
                    code:200,
                    message:result
                }
            }else{
                ctx.body={
                    code:500,
                    message:'获取公告失败'
                }
                return 
            }
        }catch(error){
            ctx.body={
                code:500,
                message:error
            }
        }
    }

}

module.exports = NoticeApi;