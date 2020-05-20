// 客户端用户
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();
const query = require('../config/mysql');
const Tools = require('../config/tool')


// 客户端用户登录
// router.post('/login',async(ctx)=>{
//     try{
//         let userName = ctx.request.body.name;
//         let password  = ctx.request.body.password;
//         if(!userName){
//             ctx.body={
//                 code:1,
//                 message:"缺少参数:name"
//             }
//             return
//         }
//         if(!password){
//             ctx.body={
//                 code:1,
//                 message:"缺少参数:password"
//             }
//             return
//         }
//         let inserts = [userName,password];
//         let _sql = `select * from client where name=? and password = ?`;
//         const result = await query(_sql,inserts);

//         if(result && result.length>0){
//             let token = Tools.randomString(8,'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
//             ctx.session.token=token;
//             ctx.session.clientUser = userName;
//             ctx.session.clientPassword = password;
//             ctx.body={
//                 code:200,
//                 message:{
//                     token:ctx.session.token,
//                     data:'登录成功'
//                 }
//             }
//         }else{
//             ctx.body={
//                 code:500,
//                 message:'密码或用户名不正确'
//             }
//         }
//     }catch(error){
//         console.log(error);
//         ctx.body={
//             code:500,
//             message:error
//         }
//     }
// })

// 客户端用户注册
// router.post('/register',async(ctx)=>{
//     try {
//         let userName = ctx.request.body.name;
//         let password  = ctx.request.body.password;
//         if(!userName){
//             ctx.body={
//                 code:1,
//                 message:"缺少参数:name"
//             }
//             return
//         }
//         if(!password){
//             ctx.body={
//                 code:1,
//                 message:"缺少参数:password"
//             }
//             return
//         }
//         // 查重
//         let repeat = await checkRepeat(userName);
//         if(repeat && repeat.length>0){
//             ctx.body={
//                 code:2,
//                 message:"用户名已经存在"
//             }
//             return
//         }
//         let inserts = [userName,password];
//         let _sql = `insert into client (name,password) values (?,?)`;
//         let result = await query(_sql,inserts);
//         if(result){
//             let token = Tools.randomString(8,'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
//             ctx.session.token=token;
//             ctx.body={
//                 code:200,
//                 message:{
//                     token,
//                     data:'注册用户成功'
//                 }
//             }
//         }else{
//             ctx.body={
//                 code:500,
//                 message:'注册用户失败'
//             }
//         }
//     } catch (error) {
//         console.log(error);
//         ctx.body={
//             code:500,
//             message:error
//         }
//     }
// })

// 客户端用户注销登录
// router.get('/logout',async(ctx)=>{
//     try {
//         ctx.session.token = '';
//         ctx.body={
//             code:200,
//             message:'注销登录成功'
//         }
        
//     } catch (error) {
//         ctx.body={
//             code:500,
//             message:error
//         }
//     }
// })

// 客户端用户查重
// const checkRepeat = async (userName)=>{
//         let inserts = [userName];
//         let _sql = `select * from client where name = ?`;
//         let result =  await query(_sql,inserts);
//         return result
// }

// 通过客户端id查询name
// router.post('/getClientNameById',async(ctx)=>{
//     try {
//         let id = ctx.request.body.to_uid;
//         if(!id){
//             ctx.body={
//                 code:1,
//                 message:'缺少参数:id'
//             }
//             return
//         }
//         let inserts = [id];
//         let _sql = `select client.name from client where id = ?`;
//         let result = await query(_sql,inserts);
//         if(result){
//             if(result.length){
//                 ctx.body={
//                     code:200,
//                     message:result
//                 }
//                 return
//             }else{
//                 ctx.body={
//                     code:201,
//                     message:'没有当前用户'
//                 }
//             }
//         }
//     } catch (error) {
//         ctx.body={
//             code:500,
//             message:error
//         }
//     }
// })

// 获取client列表
router.get('/getClients',async(ctx)=>{
    try {
        let _sql=`select client.id,client.name from client`;
        let result = await query(_sql);
        if(result){
            ctx.body={
                code:200,
                message:result
            }
            return
        }else{
            ctx.body={
                code:500,
                message:'获取用户名失败'
            }
        }
    } catch (error) {
        ctx.body={
            code:500,
            message:error
        }
    }
})


module.exports = router;