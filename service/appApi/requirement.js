const query = require('../config/mysql')

const requirementApi = {
    // 提需求post
    addRequirement:async(ctx)=>{
        try {
            let {requirement,create_date,userName,email} =ctx.request.body;
            if(!requirement || !create_date || !userName || !email){
                ctx.body={
                    code:1,
                    message:'缺少参数'
                }
                return
            }
            let inserts= [requirement,create_date,userName,email];
            let _sql = `insert into requirement (requirement,create_date,userName,email) values (?,?,?,?)`;
            let result  = await query(_sql,inserts);
            if(result){
                ctx.body={
                    code:200,
                    message:"新增需求成功"
                }
            }else{
                ctx.body={
                    code:500,
                    message:'新增需求失败'
                }
            }
        } catch (error) {
            ctx.body={
                code:500,
                message:error
            }
        }
    },
    // 前台获取所有需求get
    getRequirements:async(ctx)=>{
        try {
            let _sql = `select requirement.requirement as requirement,requirement.status as statusId,requirement.create_date as create_date,requirement.userName as userName,status.status as status from requirement left join status on requirement.status=status.id order by requirement.create_date desc`;
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
                    message:'获取需求列表失败'
                }
                return
            }
            
        } catch (error) {
            ctx.body={
                code:500,
                message:error
            }
        }
    },
    // 后台获取所有需求get
    getRequirementsInfo:async(ctx)=>{
        try {
            let _sql = `select requirement.id as id, requirement.requirement as requirement,requirement.status as statusId,requirement.email as email,requirement.create_date as create_date,requirement.userName as userName,status.status as status from requirement left join status on requirement.status=status.id order by requirement.create_date desc`;
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
                    message:'获取需求列表失败'
                }
                return
            }
            
        } catch (error) {
            ctx.body={
                code:500,
                message:error
            }
        }
    },
    // 更改需求状态post
    updateRequireStatus:async(ctx)=>{
        try {
            let {id,status} = ctx.request.body;
            if(!id && !status){
                ctx.body = {
                    code:1,
                    message:'缺少参数'
                }
                return
            }
            let inserts = [status,id];
            let _sql = `update requirement set status = ? where id = ?`;
            let result = await query(_sql,inserts);
            if(result){
                ctx.body={
                    code:200,
                    message:'更改状态成功'
                }
                return
            }else{
                ctx.body={
                    code:500,
                    message:'更改状态失败'
                }
                return
            }
        } catch (error) {
            ctx.body={
                code:500,
                message:error
            }
        }
    }
}


module.exports = requirementApi