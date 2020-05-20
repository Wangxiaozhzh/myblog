const NoticeApi = require('../appApi/notice');

const NoticeRouter = {
    name:'/notice',
    routes:[
        {methods:'get',path:'/getAllShowNotice',realize:NoticeApi.getAllShowNotice}, //前端获取所有公告get
        {methods:'get',path:'/getAllNotice',realize:NoticeApi.getAllNotice}, //管理端获取所有公告get
        {methods:'post',path:'/addNotice',realize:NoticeApi.addNotice}, //新增公告post
        {methods:'post',path:'/updateNoticeById',realize:NoticeApi.updateNoticeById}, //修改公告post
        {methods:'post',path:'/deleteNoticeById',realize:NoticeApi.deleteNoticeById}, //删除公告post
        {methods:'post',path:'/getNoticeById',realize:NoticeApi.getNoticeById}, //根据id获取公告详情post
    ]
}

module.exports = NoticeRouter;