import React,{useState,useEffect} from 'react';
import {HashRouter as Router,Link} from "react-router-dom"
import { Layout, Menu, Icon, Row,Col } from 'antd';
import MyBreadcrumb from '../Components/MyBreadcrumb';
import UserInfo from '../Components/UserInfo';
import Contents from '../Components/Content'
import MenuData from '../Data/menuData'
import '../Static/Css/adminindex.css'
import {getUserInfo} from '../Config/httpRouter'

const { Header, Content, Sider ,Footer } = Layout;
const { SubMenu } = Menu;

const AdminIndex = ()=>{

  const [collapsed,setCollapsed] = useState(false);
  const [mainHeight,setMainHeight] = useState(0);

  useEffect(()=>{
    getMainHight();
  },[])
  const getMainHight = ()=>{
      let h = (document.body.clientHeight-64)+'px';
      setMainHeight(h)
  }
  window.addEventListener('resize',()=>{
    getMainHight();
  })
  
  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  };

    return (
        <Router>
            <Layout style={{ minHeight: '100vh' }}>
                <Header >
                    <Row>
                        <Col xs={10}>
                            <div className="logo">
                                <p><em>博客管理系统</em></p>
                            </div>
                        </Col>
                        <Col>
                            <UserInfo></UserInfo>
                        </Col>
                    </Row>
                </Header>
                <Layout>
                    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            {
                                MenuData.map((item)=>{
                                    if(item.children && item.children.length){
                                        return(
                                            <SubMenu
                                                key={item.url}
                                                title={
                                                    <span>
                                                        <Icon type={item.icon} />
                                                        <span>{item.name}</span>
                                                    </span>
                                                }
                                            >
                                                {item.children.map(menu => (
                                                    <Menu.Item key={menu.url}>
                                                        <Link to={`/${menu.url}`}>{menu.name}</Link>
                                                    </Menu.Item>
                                                ))}
                                            </SubMenu>
                                        )
                                    }else{
                                        return(
                                            <Menu.Item key={item.url}>
                                                <Link to={`/${item.url}`}>
                                                    <Icon type={item.icon} />
                                                    <span>{item.name}</span>
                                                </Link>
                                            </Menu.Item>
                                        )
                                    }
                                })

                            }
                        </Menu>
                    </Sider>
                    <Content style={{ margin: '0 16px' }} style={{height:`${mainHeight}`,overflowY:'scroll'}}>
                        <MyBreadcrumb></MyBreadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            <Contents />
                        </div>
                        <Footer>© 2020 小王同学博客管理系统 @antd+react hooks+mysql</Footer>
                    </Content>
                </Layout>
            
            </Layout>
        </Router>
    );

}

export default AdminIndex;