const Router = require('koa-router');

const User = require('./user')
const Blog = require('./blog')
const Comments = require('./comment')
const Requirement = require('./requirement')
const Soup = require('./soupWord')
const Notice = require('./notice')

const Routes = new Router();

User.routes.forEach(e=>{
    Routes[e.methods](User.name+e.path,e.realize);
})

Blog.routes.forEach(e=>{
    Routes[e.methods](Blog.name+e.path,e.realize);
})

Comments.routes.forEach(e=>{
    Routes[e.methods](Comments.name+e.path,e.realize);
})

Requirement.routes.forEach(e=>{
    Routes[e.methods](Requirement.name+e.path,e.realize);
})

Soup.routes.forEach(e=>{
    Routes[e.methods](Soup.name+e.path,e.realize);
})

Notice.routes.forEach(e=>{
    Routes[e.methods](Notice.name+e.path,e.realize);
})


module.exports = Routes;