// 登录页面
import React, { useState } from 'react';
import { Spin, Card, Input, Icon, Button, Form, message ,Checkbox} from 'antd';
import '../../Static/Css/login.css';
// import Axios from 'axios'
import {userLogin} from '../../Config/httpRouter'
function Login(prop){
    const [isLoading,setIsLoading] = useState(false);

    // 登录表单组件
    const loginForm  = (props)=>{
        const { getFieldDecorator } = props.form;
        const handleSubmit = ()=>{
            props.form.validateFields((err, values) => {
                if (!err) {
                    setIsLoading(true);
                    let propsData={
                        userName:values.username,
                        password:values.password
                    }
                    userLogin(propsData).then(res=>{
                        if(res.data.code===200){
                              // 请求成功后，把后端返回的token保存在localstorage中
                                localStorage.setItem('token',res.data.message.token);
                                localStorage.setItem('userAvatar',res.data.message.data.avatar);
                                localStorage.setItem('userName',res.data.message.data.name);
                                setIsLoading(false);  
                                prop.history.push('/');
                        }else{
                                message.error('账号或密码错误');
                                setIsLoading(false);
                        }
                    })
                }
            });
        }

        return (
            <Form  className="login-form">
                <Form.Item>
                {getFieldDecorator('username', {
                    rules: [{ required: true, message: '请输入用户名!' }],
                })(
                    <Input 
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                    />,
                )}
                </Form.Item>
                <Form.Item>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入密码!' }],
                })(
                    <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                    />,
                )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>记住密码</Checkbox>)}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" loading={isLoading} className="login-form-button" onClick={handleSubmit}>
                        登录{isLoading}
                    </Button>
                </Form.Item>
            </Form>
        )
    }
    const WrappedLoginForm = Form.create({ name: 'normal_login' })(loginForm);

    return(
        <>
            <div className='blog-title'>
                <p className='blogName'>博客后台管理系统</p>
            </div>
            <div className="loginWrap">
                <div className='login-div'>
                    <Spin tip="loading..." spinning={false}>
                        <Card title="用户登录" bordered={true} style={{width:400}}>
                            <WrappedLoginForm/>
                        </Card>
                    </Spin>
                </div>
            </div>
        </>
    )
}


export default Login;