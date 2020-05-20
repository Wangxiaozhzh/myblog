// 管理所有的url地址
const isDev = true;
const serviceUrl = 'http://122.51.128.63:8080/'
const baseUrl = isDev ? 'http://localhost:8080/' :serviceUrl
const servicePath = {
    baseUrl:baseUrl,
    userLogin:baseUrl + 'user/userLogin',//用户登录
    updateUserInfo:baseUrl + 'user/updateUserInfo',//修改用户信息
    userLogout:baseUrl + 'user/userLogout',//注销登录
    getArticleList:baseUrl+'blog/getArticleList',//获取文章列表
    deleteArticleById:baseUrl+'blog/deleteArticleById',//根据文章id删除文章
    getArticleById:baseUrl+'blog/getArticleById',//根据文章id获取文章详细内容
    addArticle:baseUrl+'blog/addArticle',//新增文章
    updateArticle:baseUrl+'blog/updateArticle',//根据id修改文章内容
    getArticleRankList:baseUrl+'blog/getArticleRankList',//根据阅读量排行
    getTypeInfo:baseUrl+'blog/getTypeInfo',//获取文章类型
    updateTypeInfo:baseUrl+'blog/updateTypeInfo', //根据id更新文章类型
    deleteTypeInfo:baseUrl+'blog/deleteTypeInfo',//根据id删除文章类型
    addTypeInfo:baseUrl+'blog/addTypeInfo',//新增文章类型
    getCommentsList:baseUrl+'comments/getCommentsList',//获取评论列表
    updateCommentStatus:baseUrl +'comments/updateCommentStatus',//修改评论状态 
    deleteCommentById:baseUrl+'comments/deleteCommentById',//删除评论
    getSoupWord:baseUrl+'soupword/getSoupWord',//获取所有鸡汤
    addSoupWord:baseUrl+'soupword/addSoupWord',//新增鸡汤
    deleteSoupById:baseUrl+'soupword/deleteSoupById',//根据id删除鸡汤
    editSoupWord:baseUrl+'soupword/editSoupWord',//根据id修改鸡汤
    getSoupWordById:baseUrl+'soupword/getSoupWordById',//根据id获取鸡汤详情
    getAllNotice:baseUrl+'notice/getAllNotice',//获取所有公告
    updateNoticeById:baseUrl+'notice/updateNoticeById',//修改公告
    deleteNoticeById:baseUrl+'notice/deleteNoticeById',//删除公告
    addNotice:baseUrl+'notice/addNotice',//新增公告
    getNoticeById:baseUrl+'notice/getNoticeById',//根据id获取公告
    getUserInfo:baseUrl+'user/getUserInfo',//获取用户信息
    getUserTags:baseUrl+'user/getUserTags',//获取用户tags
    addTag:baseUrl+'user/addTag',//新增用户tags
    getRequirementsInfo:baseUrl+'requirement/getRequirementsInfo',//获取所有需求
    updateRequireStatus:baseUrl+'requirement/updateRequireStatus',//更改需求状态
    uploadAvator:baseUrl+'upload/uploadAvator',//上传用户头像

}

export default servicePath;