const CommentApi = require('../appApi/comments');

const CommentRouter = {
    name:'/comments',
    routes:[
        {methods:'get',path:'/getCommentsList',realize:CommentApi.getCommentsList}, //获取所有的评论列表get
        {methods:'post',path:'/getAllComments',realize:CommentApi.getAllComments}, //通过文章id获取对应的评论列表post
        {methods:'post',path:'/addComments',realize:CommentApi.addComments}, //新增评论post
        {methods:'post',path:'/deleteCommentById',realize:CommentApi.deleteCommentById}, //删除评论post
        {methods:'post',path:'/updateCommentStatus',realize:CommentApi.updateCommentStatus}, //更改评论状态post
    ]
}

module.exports = CommentRouter;