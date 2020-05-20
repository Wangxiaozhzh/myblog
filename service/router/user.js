const UserApi = require('../appApi/user');

const UserRouter = {
    name:'/user',
    routes:[
        {methods:'post',path:'/userLogin',realize:UserApi.userLogin}, //用户登录
        {methods:'get',path:'/userLogout',realize:UserApi.userLogout}, //用户登录
        {methods:'post',path:'/updateUserInfo',realize:UserApi.updateUserInfo}, //用户修改姓名
        {methods:'get',path:'/getUserTags',realize:UserApi.getUserTags}, //获取标签
        {methods:'post',path:'/addTag',realize:UserApi.addTag}, //新增标签
        {methods:'get',path:'/getUserInfo',realize:UserApi.getUserInfo}, //获取用户信息get
    ]
}

module.exports = UserRouter;