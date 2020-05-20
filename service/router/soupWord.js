const SoupApi = require('../appApi/soupWord');

const SoupRouter = {
    name:'/soupword',
    routes:[
        {methods:'get',path:'/getSoupWord',realize:SoupApi.getSoupWord}, //获取所有鸡汤get
        {methods:'get',path:'/getOneSoupWord',realize:SoupApi.getOneSoupWord}, //随机获取一条鸡汤get
        {methods:'post',path:'/addSoupWord',realize:SoupApi.addSoupWord}, //新增一条鸡汤post
        {methods:'post',path:'/getSoupWordById',realize:SoupApi.getSoupWordById}, //根据id获取鸡汤详情post
        {methods:'post',path:'/deleteSoupById',realize:SoupApi.deleteSoupById}, //根据id删除对应的鸡汤post
        {methods:'post',path:'/editSoupWord',realize:SoupApi.editSoupWord}, //根据id修改鸡汤内容post
    ]
}

module.exports = SoupRouter;