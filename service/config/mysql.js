const mysql = require('mysql');
const Config = require('./index');

// 数据库连接
const con = Config.mysql;

const pool = mysql.createPool(con);

// 使用连接池
const query = (_sql,sqlParams,params) => { 
    sql = mysql.format(_sql,sqlParams)
    return new Promise((resolve,reject)=>{
        pool.query(sql,params,(err,result) => {
            if(err) reject(err)
            resolve(result)
        })
    })
}


module.exports = query;