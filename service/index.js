const Koa = require('koa');

const Routes = require('./router/router');

const MiddleWare = require('./middleware/index');

const app= new Koa();

MiddleWare(app);

app.use(Routes.routes()).use(Routes.allowedMethods());

app.listen(8080,()=>{
    console.log('service is running at port 8080')
})


// const bodyparser = require('koa-bodyparser');
// const cors = require('koa2-cors');

const static = require('koa-static')   //静态资源服务插件
const path = require('path')           //路径管理


// const session = require('koa-session');
// app.use(bodyparser());
// app.use(cors());


// 配置静态资源（前端读取路径为serice:8080/xxx）
const staticPath = './upload'
app.use(static(
    path.join( __dirname, staticPath)
))


// // 配置跨域
// app.use(cors({
//     origin:'http://localhost:3000',
//     credentials:true
// }))


// // 使用session
// app.keys = ['secret'];
// const CONFIG={
//     key: 'koa:sess',   //cookie key (default is koa:sess)
//     maxAge: 1000*60*60,  // cookie的过期时间 
//     overwrite: true,  //是否可以overwrite    (默认default true)
//     httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
//     signed: true,   //签名默认true
//     rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
//     renew: false,  //(boolean) renew session when session is nearly expired,
// }

// app.use(session(CONFIG, app))

const Router = require('koa-router');

// let soupWord = require('./appApi/soupWord.js');
// let client = require('./appApi/client.js');
// let blog = require('./appApi/blog.js');
// let comments = require('./appApi/comments.js');
// let requirement = require('./appApi/requirement.js');
// let notice = require('./appApi/notice.js');
// let user = require('./appApi/user.js');
let upload = require('./appApi/uploadFiled.js');


// // // 加载登录检查
// // app.use(checkLogin);


// // 装载所有子路由
let router = new Router();
// router.use('/soupword',soupWord.routes());
// router.use('/client',client.routes());
// router.use('/blog',blog.routes());
// router.use('/comments',comments.routes());
// router.use('/requirement',requirement.routes());
// router.use('/notice',notice.routes());
// router.use('/user',user.routes());
router.use('/upload',upload.routes());

// // 加载路由中间件
app.use(router.routes());
app.use(router.allowedMethods());


// app.use(async (ctx)=>{
//     console.log(ctx.session.token);
//     ctx.body='<h1>Hello,Koa</h1>'
// })


