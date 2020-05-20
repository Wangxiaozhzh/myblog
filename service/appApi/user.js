
const qurey = require('../config/mysql');
const Tools = require('../config/tool');

const userApi = {
    // 用户登录post
    userLogin:async(ctx)=>{
        try {
            let {userName,password} = ctx.request.body;
            if(!userName||!password){
                return ctx.body={
                    code:1,
                    message:"缺少参数"
                }
            }
            let inserts = [userName,password];
            let _sql = `select * from user where name = ? and password = ?`;
            let result = await qurey(_sql,inserts);
            if(result && result.length){
                let token = Tools.randomString(8,'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
                ctx.session.token=token;
                ctx.session.adminUser = userName;
                ctx.session.adminPassword = password;
                ctx.body={
                        code:200,
                        message:{
                            token:ctx.session.token,
                            data:{
                                text:'登录成功',
                                name:result[0].name,
                                avatar:result[0].avatar
                            }
                        }
                }
            }else{
               return ctx.body={
                    code:500,
                    message:'登录失败'
                }
            }
        } catch (error) {
            ctx.body={
                code:500,
                message:error
            }
        }
    },
    // 修改用户信息
    updateUserInfo:async(ctx)=>{
        try {
            let {name,avatar,password} = ctx.request.body;
            console.log(name,avatar,password)
            if(!name || !avatar){
                return ctx.body={
                    code:1,
                    message:'缺少参数'
                }
            }
            if(password !== ctx.session.adminPassword){
                ctx.body={
                    code:500,
                    message:'密码出错'
                }
                return
            }
            let inserts = [name,avatar];
            let _sql = `update user set name = ? , avatar = ? where id = 1`;
            let result = await qurey(_sql,inserts);
            if(result){
                ctx.body={
                    code:200,
                    message:'修改用户信息成功'
                }
            }
        } catch (error) {
            ctx.body={
                code:500,
                message:error
            }
        }
    },
    // 注销登录
    userLogout:async(ctx)=>{
        try {
            ctx.session.token = '';
            ctx.body={
                code:200,
                message:'success'
            }
        } catch (error) {
            ctx.body={
                code:500,
                message:error
            }
        }

    },
    // 获取标签get
    getUserTags:async (ctx)=>{
        try {
            let _sql = `select user.tags from user where id = 1`;
            let result = await qurey(_sql);
            if(result){
                ctx.body={
                    code:200,
                    message:result
                }
                return
            }else{
                ctx.body={
                    code:500,
                    message:'获取tags失败'
                }
                return
            }
    
        } catch (error) {
            ctx.body={
                code:200,
                message:error
            }
        }
    },
    // 新增标签post 
    addTag:async(ctx) => {
        try {
            let tags= ctx.request.body.tags;
            if(!tags){
                return ctx.body={
                    code:1,
                    message:'缺少参数:tags'
                }
            }
            let inserts = [tags]
            let _sql = `update user set tags = ? where id = 1`;
            let result = await qurey(_sql,inserts);
            if(result){
                ctx.body={
                    code:200,
                    message:'新增tags成功'
                }
                return
            }else{
                ctx.body={
                    code:500,
                    message:'新增tags失败'
                }
                return
            }
    
        } catch (error) {
            ctx.body={
                code:200,
                message:error
            }
        }
    },
    
    // 获取用户信息get
    getUserInfo:async(ctx)=>{
        try {
            let _sql = `select user.name,user.avatar from user`;
            let result = await qurey(_sql);
            if(result){
                ctx.body={
                    code:200,
                    message:result
                }
                return
            }else{
                ctx.body={
                    code:500,
                    message:'获取用户信息失败'
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

module.exports = userApi