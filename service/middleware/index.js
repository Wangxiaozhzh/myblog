const json = require('koa-json');
const bodyParse = require('koa-bodyparser');
const cors = require('koa2-cors');
const loginCheck = require('./checkLogin.js');
const session = require('koa-session');

// const static = require('koa-static')   //静态资源服务插件
// const path = require('path')           //路径管理

// 初始化中间件
const initMid = (app) => {
    
    // josn格式化
    app.use(json());

    // 跨域设置
    app.use(cors({
        // origin:['http://localhost:3000'],
        origin: function(ctx) { //设置允许来自指定域名请求
            const whiteList = ['http://localhost:3001']; //可跨域白名单
            if(ctx.header.referer){
                let url = ctx.header.referer.substring(0,21);
                // console.log(ctx.header.referer);
                // console.log(url);
                if(whiteList.includes(url)){
                    return url //注意，这里域名末尾不能带/，否则不成功，所以在之前我把/通过substr干掉了
                }
            }
            return 'http://localhost:3000' //默认允许本地请求3000端口可跨域
        },
        credentials:true,
    }));

    // 转换接收的参数，post用ctx.request.body接收，get用ctx.query接收
    app.use(bodyParse());

    // 配置静态资源（前端读取路径为serice:8080/xxx）
    // const staticPath = './upload'
    // app.use(static(
    //     path.join( __dirname, staticPath)
    // ))


    // 使用session
    app.keys = ['some secret hurr'];
    const CONFIG = {
        key: 'koa:sess',   //cookie key (default is koa:sess)
        maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
        overwrite: true,  //是否可以overwrite    (默认default true)
        httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
        signed: true,   //签名默认true
        rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
        renew: false,  //(boolean) renew session when session is nearly expired,
    };
    app.use(session(CONFIG, app));


    // 登录检测
    app.use(loginCheck);

}

module.exports = initMid;