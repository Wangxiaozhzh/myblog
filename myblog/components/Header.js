import React ,{useEffect}from 'react'
import Router from 'next/router'
import '../static/style/component/header.css'
import {Row,Col, Menu, Icon,Switch} from 'antd'
import moment from 'moment';
const Header = () => {
    useEffect(()=>{
        // 
    },[])

    // 路由跳转
    const handleClick = (e)=>{
        switch(e.key){
            case 'home':
                Router.push('/index');
                break
            case 'soupWord':
                Router.push('/soupWord');
                break
            case 'blog':
                Router.push('/blog');
                break
            case 'utbreak':
                Router.push('/utbreak');
                break
            case 'requirement':
                Router.push('/requirement');
                break
        }
    }

    const onChange =(checked)=>{
        // console.log(checked);
       if(checked){
            document.body.classList.remove('dark')
       }else{
            document.body.classList.add('dark')
       }

    }
    // const menu = (
    //     <Menu onClick={handleMenuClick}>
    //       <Menu.Item key="1">
    //         <Icon type="user" />
    //             日间模式
    //       </Menu.Item>
    //       <Menu.Item key="2">
    //         <Icon type="user" />
    //             夜间模式
    //       </Menu.Item>
    //     </Menu>
    //   );

    return(
        <div className="header">
            <div className="header-center">
                <Row type="flex" justify="center">
                    <Col xs={0} sm={4} md={4} lg={5} xl={5}>
                        <span className="header-logo">小王同学</span>
                        <span className="header-txt">记录成长与进步</span>
                    </Col>

                    <Col className="memu-div" xs={14} sm={10} md={12} lg={12} xl={12}>
                        <Menu  mode="horizontal" onClick={handleClick} >
                            <Menu.Item key="home">
                                <Icon type="home" />
                                首页
                            </Menu.Item>
                            <Menu.Item key="soupWord">
                                <Icon type="bg-colors" />
                                鸡汤
                            </Menu.Item>
                            <Menu.Item key="blog">
                                <Icon type="book" />
                                博客
                            </Menu.Item>
                            <Menu.Item key="requirement">
                                <Icon type="pushpin" />
                                提需求
                            </Menu.Item>
                            <Menu.Item key="utbreak">
                                <Icon type="line-chart" />
                                新冠疫情
                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col className="date-div"   xs={10} sm={10} md={8} lg={7} xl={7}>
                        <Row>
                            <Col xs={0} sm={14}>
                                <span className="date">{moment(new Date().getTime()).format('ll')}</span>
                            </Col>
                            <Col xs={24} sm={10}>
                                {/* <Dropdown.Button overlay={menu} icon={<Icon type="setting" />}>
                                    设置
                                </Dropdown.Button> */}
                                 <Switch checkedChildren="日间模式" onChange={onChange} unCheckedChildren="夜间模式" defaultChecked />
                            </Col>
                        </Row>
                 
                    </Col>
                </Row>
            </div>
           </div>
    )
  
    }

export default Header