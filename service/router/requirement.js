const RequirementApi = require('../appApi/requirement');

const RequirementRouter = {
    name:'/requirement',
    routes:[
        {methods:'post',path:'/addRequirement',realize:RequirementApi.addRequirement}, //提需求post
        {methods:'get',path:'/getRequirements',realize:RequirementApi.getRequirements}, //前台获取所有需求get
        {methods:'get',path:'/getRequirementsInfo',realize:RequirementApi.getRequirementsInfo}, //后台获取所有需求get
        {methods:'post',path:'/updateRequireStatus',realize:RequirementApi.updateRequireStatus}, //更改需求状态post
    ]
}

module.exports = RequirementRouter;