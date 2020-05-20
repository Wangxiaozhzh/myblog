// 评论表
const query = require('../config/mysql');

const CommentApi = {
    // 获取所有的评论列表get
    getCommentsList:async(ctx)=>{
        try {
            let _sql = `select a.id as id, a.add_time as add_time,a.content as content ,a.from_name as from_name,a.to_name as to_name,a.email as email,a.status as status,b.title as title from comments as a,article as b where a.article_id = b.id`;
            let result = await query(_sql);
            if(result){
                if(result.length>0){
                    ctx.body={
                        code:200,
                        message:result
                    }
                    return
                }else{
                    ctx.body={
                        code:201,
                        message:'当前评论数为0'
                    }
                }
            }else{
                ctx.body={
                    code:500,
                    message:'获取评论列表失败'
                }
            }
        } catch (error) {
            ctx.body={
                code:500,
                message:error
            }
        }
    },
    // 通过文章id获取对应的评论列表post
    getAllComments:async(ctx)=>{
        try {
            let articleId = ctx.request.body.articleId;
            let insert = [articleId];
            let _sql = `select comments.id, comments.add_time ,comments.content ,comments.from_name ,comments.to_name,comments.email from comments where article_id = ? and status = 1`;
            let result = await query(_sql,insert);
            if(result){
                if(result.length>0){
                    ctx.body={
                        code:200,
                        message:result
                    }
                    return
                }else{
                    ctx.body={
                        code:201,
                        message:'当前评论数为0'
                    }
                }
            }else{
                ctx.body={
                    code:500,
                    message:'获取评论列表失败'
                }
            }
        } catch (error) {
            ctx.body={
                code:500,
                message:error
            }
        }
    },
    // 新增评论post
    addComments:async(ctx)=>{
        try {
            // to_name:为空的时候，表示@别人
            let {content,add_time,article_id,from_name,to_name,email} = ctx.request.body;
            if(!content || !add_time || !article_id || !from_name  || !email || (to_name==undefined&&to_name=='')){
                ctx.body={
                    code:1,
                    message:'缺少参数'
                }
                return
            }
            let inserts = [content,add_time,article_id,from_name,to_name,email];
            let _sql = `insert into comments (content,add_time,article_id,from_name,to_name,email) values (?,?,?,?,?,?)`;
            let result = await query(_sql,inserts);
            if(result){
                ctx.body={
                    code:200,
                    message:'新增评论成功'
                }
                return
            }else{
                ctx.body={
                    code:500,
                    message:'新增评论失败'
                }
            }
        } catch (error) {
            ctx.body={
                code:500,
                message:error
            }
        }
    },
    // 删除评论post
    deleteCommentById:async(ctx)=>{
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
            let _sql = `delete from comments where id = ?`;
            let result = await query(_sql,inserts);
            if(result){
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
                            message:'找不到要删除的评论'
                        }
                    }
                }else{
                    ctx.body={
                        code:500,
                        message:'删除评论失败'
                    }
                }
            }
        } catch (error) {
            ctx.body={
                code:500,
                message:error
            }
        }
    },
    // 更改评论状态post
    updateCommentStatus:async(ctx)=>{
        try {
            let { id,status } = ctx.request.body;
            if(!id || !status){
                return ctx.body={
                    code:1,
                    message:'缺少参数'
                }
            }
            let inserts = [status,id]
            let _sql = `update comments set status = ? where id = ?`;
            let result = await query(_sql,inserts);
            if(result){
                return ctx.body={
                    code:200,
                    message:'修改评论状态成功'
                }
            }else{
                return ctx.body={
                    code:500,
                    message:'修改评论状态失败'
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



module.exports = CommentApi


/**
 * 
 * 
  CREATE TABLE IF NOT EXISTS `comments`(
   `id` INT UNSIGNED AUTO_INCREMENT,
   `article_id` int(11) NOT NULL,
   `add_time` int(11) NOT NULL,
   `content` text NOT NULL,
   `from_name` varchar(40) not null,
   `email` varchar(40) not null,
   `to_name` varchar(40) not null,
   `status` int(11) not null,
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
insert into comments(article_id,add_time,content,from_name,email,to_name,status) values (1,'1586425345','这是一条评论...','admin','12@test.com','',1);
alter table comments alter column to_name set default '';
 */

 /*
CREATE TABLE IF NOT EXISTS `comments_type`(
    `id` INT UNSIGNED AUTO_INCREMENT,
    `state` varchar(11) NOT NULL,
    PRIMARY KEY ( `id` )
 )ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into comments_type(state) values ('show');
insert into comments_type(state) values ('hidden');

 */
