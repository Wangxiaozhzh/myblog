// 过滤白名单
const whiltList = [
    '/upload/uploadAvator',
    '/user/userLogin',
    '/blog/getArticleList',
    '/blog/getArticleById/',
    '/blog/getTypeInfo',
    '/blog/addViewCount',
    '/soupword/getOneSoupWord',
    '/soupword/addSoupWord',
    '/blog/getArticleRankList',
    '/requirement/addRequirement',
    '/requirement/getRequirements',
    '/comments/getAllComments',
    '/comments/addComments',
    '/notice/getAllShowNotice',
    '/user/getUserTags'
]
const checkLogin =async (ctx,next)=>{
    // 正则匹配是否是请求图片
    let reg = /\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/;
    if(whiltList.includes(ctx.url) || reg.test(ctx.url)){
        await next()
    }else{
        if(!ctx.session.token || !ctx.header.token || (ctx.session.token !== ctx.header.token)){
            ctx.body={
                code:555,
                message:"登录过期"
            }
            return
        }else{
            await next()
        }
    }
}

module.exports = checkLogin