const isDev = true;
const serviceUrl = 'xxx'

const baseUrl = isDev ? 'http://localhost:8080/':serviceUrl;
const servicePath = {
    getArticleList : baseUrl+'blog/getArticleList', //获取文章列表
    getArticleById : baseUrl+'blog/getArticleById/',//根据id获取文章详情
    getTypeInfo : baseUrl+'blog/getTypeInfo',//获得文章类别
    addViewCount : baseUrl+'blog/addViewCount',//新增浏览次数
    getOneSoupWord : baseUrl+'soupword/getOneSoupWord',//随机获取一条鸡汤
    addSoupWord : baseUrl+'soupword/addSoupWord',//新增一条鸡汤
    getArticleRankList : baseUrl+'blog/getArticleRankList',//通过浏览次数查询出排行
    addRequirement : baseUrl+'requirement/addRequirement',//新增需求
    getRequirements : baseUrl+'requirement/getRequirements',//获取需求列表
    getAllComments : baseUrl+'comments/getAllComments',//根据文章id获取对应的评论列表
    addComments : baseUrl+'comments/addComments',//新增评论
    getAllShowNotice : baseUrl+'notice/getAllShowNotice',//前端获取所有公告
    getUserTags : baseUrl+'user/getUserTags',//获取博主所有Tags
    
}

export default servicePath;
