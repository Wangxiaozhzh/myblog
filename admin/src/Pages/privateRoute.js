import React, { useEffect } from 'react';
import {Route,Redirect} from 'react-router-dom';
import {message} from 'antd'
function PrivateRoute({component:Component,...props}){
    // 解构赋值把props中的component 赋值给 Component
     // 获取localstorage中是否存在token
    const login = localStorage.getItem('token');
    // let login = true;
    useEffect(()=>{
        if(!login){
            message.info('请登录后进行访问');
        }
    },[])

    return(
        <Route {...props} render={(p) => {
            if(login){
                // 如果登录了，则跳转到相应页面
                return <Component/>
            }else{
                // 如果没有跳转，则重定向到login页面
                return<Redirect to={{
                    pathname:'/login/',
                    state:{
                        from:p.location.pathname
                    }
                }} />
            }
        }} />
    )
}
export default PrivateRoute;