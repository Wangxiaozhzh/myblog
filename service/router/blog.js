const BlogApi = require('../appApi/blog');

const BlogRouter = {
    name:'/blog',
    routes:[
        {methods:'get',path:'/getArticleList',realize:BlogApi.getArticleList}, //获取文章列表
        {methods:'post',path:'/getArticleById',realize:BlogApi.getArticleById}, //根据id获取文章详情
        {methods:'post',path:'/addArticle',realize:BlogApi.addArticle}, //新增文章
        {methods:'post',path:'/updateArticle',realize:BlogApi.updateArticle}, //根据id修改文章信息
        {methods:'post',path:'/deleteArticleById',realize:BlogApi.deleteArticleById}, //根据id删除文章
        {methods:'get',path:'/getTypeInfo',realize:BlogApi.getTypeInfo}, //获取文章类别表信息
        {methods:'post',path:'/addTypeInfo',realize:BlogApi.addTypeInfo}, //新增文章类别
        {methods:'post',path:'/updateTypeInfo',realize:BlogApi.updateTypeInfo}, //修改文章类型
        {methods:'post',path:'/deleteTypeInfo',realize:BlogApi.deleteTypeInfo}, //删除文章类别
        {methods:'post',path:'/addViewCount',realize:BlogApi.addViewCount}, //新增浏览次数
        {methods:'get',path:'/getArticleRankList',realize:BlogApi.getArticleRankList}, //通过浏览次数查询出排行
    ]
}

module.exports = BlogRouter;