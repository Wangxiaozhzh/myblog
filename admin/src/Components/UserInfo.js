import React, { useEffect,useState } from 'react';
import {Dropdown ,Menu ,Icon ,Modal } from 'antd';
import {withRouter} from 'react-router-dom';
import servicePath from '../Config/apiUrl'
import {userLogout} from '../Config/httpRouter'
const {confirm} = Modal;

const UserInfo = withRouter((props) => {

    const [avatar,setAvatar] = useState('')
    const [userName,setUserName] = useState('用户')

    const handLogout=(e)=>{
        confirm({
            title:"确定要退出登录吗",
            okText:'确定',
            cancelText:'取消',
            onOk(){
                userLogout().then(res=>{
                    if(res&&res.data.code===200){
                        // window.location.href = '/login';
                        localStorage.removeItem('token');
                        localStorage.removeItem('userAvatar');
                        localStorage.removeItem('userName');
                        props.history.push('/login/');
                    }
                })
            }
        })
    }
    const goUserInfo = ()=>{
        // console.log(props)
        props.history.push('/user/userSetting');
    }
    useEffect(()=>{
        let avatar = localStorage.getItem('userAvatar');
        let name = localStorage.getItem('userName');
        if(name){
            setUserName(name);
        }
        setAvatar(avatar);
    },[])
    const menu = (
        <Menu>
            <Menu.Item key="1" onClick={goUserInfo}>
                <Icon type="setting" />
                个人设置
            </Menu.Item>
            <Menu.Item key="2" onClick={handLogout}>
                <Icon type="user" />
                退出登录
            </Menu.Item>
        </Menu>
      );
    return(
        <>
            <Dropdown.Button style={{float:'right'}} overlay={menu} icon={<img style={{width:'20px',height:'20px',verticalAlign:'bottom'}}
             src={servicePath.baseUrl+`${avatar}`}></img>}>
                {userName}
            </Dropdown.Button>
        </>
    )
})




export default UserInfo;