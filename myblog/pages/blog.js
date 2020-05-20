import React,{useState,useEffect} from 'react';
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {Icon,Menu,List,Row,Col} from 'antd'
import Notice from '../components/Notice'
import Recommended from '../components/Recommended'
import Author from '../components/Author'
import servicePath from '../config/apiUrl'
import axios from 'axios';
import moment from 'moment'
import '../static/style/page/blog.css'
import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';


const Blog = (list)=>{
    // 配置marked
    const renderer = new marked.Renderer();
    marked.setOptions({
      renderer: renderer,
      gfm: true,
      pedantic: false,
      sanitize: false,
      tables: true,
      breaks: false,
      smartLists: true,
      smartypants: false,
      sanitize:false,
      xhtml: false,
      highlight: function (code) {
              return hljs.highlightAuto(code).value;
      }
    }); 
    const [myList]=useState(list[0].data)
    const [typeInfo] = useState(list[1].message);
    const [articleList,setArticleList] = useState([]);
    const [noticeCont] = useState(list[2].message);

    useEffect(() => {
        setArticleList(myList);
    }, []);
    const handleClick = (value)=>{
        let arr = [];
        if(value.key=='all'){
            setArticleList(myList);
        }else{
            myList.forEach((item)=>{
                if(value.key==item.typeName){
                    arr.push(item)
                }
            })
            setArticleList(arr);
        }
    }

    return(
        <div>
            <Head>
                <title>记录点什么</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Header></Header>
            <div className='main-div'>
                <div className='notice'>
                    <Notice noticeCont={noticeCont}/>
                </div>
                <div className="blog-type">
                    <Menu  mode="horizontal" onClick={handleClick} >
                            <Menu.Item key='all'>
                                   所有博客
                            </Menu.Item>
                        {
                            typeInfo.map((item)=>(
                                <Menu.Item key={item.typeName}>
                                    {item.typeName}
                                </Menu.Item>
                            ))
                        }
                    </Menu>
                </div>
                
                <div className='blog-count'>
                    <Row type="flex" justify="center">
                        <Col xs={24} sm={24} md={16} lg={18} xl={17}>
                            <div className='blog-list'>
                              <List header={<div>文章列表</div>}
                                itemLayout="vertical"
                                dataSource={articleList}
                                renderItem={item=>(
                                    <List.Item>
                                        <div className='list-title'>
                                        <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                                        <a>{item.title}</a>
                                        </Link>
                                        </div>
                                        <div className='list-icon'>
                                        <span><Icon type="calender" />{moment(item.addTime*1000).format("YYYY/MM/DD")}</span>
                                        <span><Icon type="folder" /> {item.typeName}</span>
                                        <span><Icon type="fire" /> {item.view_count}</span>
                                        </div>
                                        <div className="list-context"
                                        dangerouslySetInnerHTML={{__html:marked(item.introduce)}}>
                                        </div>
                                    </List.Item>
                                )}
                                /> 
                            </div>
                            
                        </Col>
                        <Col xs={0} sm={0} md={8} lg={6} xl={7}>
                            <div style={{marginTop:'1.5rem'}}></div>
                            <Author />
                            <Recommended/>    
                        </Col>
                    </Row>
                </div>
            </div>
            <Footer />
        </div>
    )
}

    Blog.getInitialProps = async ()=>{
        // 获取文章列表
        const promise1  = new Promise((resolve)=>{
            axios(servicePath.getArticleList).then((res)=>{
                if(res)resolve(res.data)
            }) 
        })
        // 获取文章类型
        const promise2  = new Promise((resolve)=>{
            axios(servicePath.getTypeInfo).then((res)=>{
                if(res)resolve(res.data)
            }) 
        })

        // 获取公告信息
        const promise3 = new Promise((resolve)=>{
            axios(servicePath.getAllShowNotice).then((res)=>{
                if(res) resolve(res.data)
            })
        })

        const allData = Promise.all([promise1,promise2,promise3])
        
        return await allData;
    }

export default Blog;