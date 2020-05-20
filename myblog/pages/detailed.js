import React ,{useEffect}from 'react';
import Head from 'next/head'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import {Row,Icon,Col,Breadcrumb,Affix,Anchor} from 'antd'
import Comments from '../components/Comments'
import '../static/style/page/detailed.css'
import 'markdown-navbar/dist/navbar.css'
import axios from 'axios'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import Tocify from '../components/tocify.tsx'
import servicePath from '../config/apiUrl'
import moment from 'moment'
const { Link } = Anchor;

const Detailed = (props)=>{

    // 配置菜单目录
    const tocify = new Tocify();
    const renderer = new marked.Renderer();
    renderer.heading = function(text, level, raw) {
      const anchor = tocify.add(text, level);
      return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
    };
    

    // 配置marked
    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code) {
                return hljs.highlightAuto(code).value;
        }
      }); 
    
      let html = marked(props.article_content) 

    useEffect(()=>{
        addCount();
    },[])

    // 新增浏览次数
    const addCount = ()=>{
        axios({
            url:servicePath.addViewCount,
            data:{
                id:props.id,
                count:props.view_count+1
            },
            method:'post'
        }).then(res=>{
            // console.log("新增浏览次数成功");
        }).catch(err=>console.log(err))
    }


    return(
        <div>
            <Head>
                <title>详情</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Header></Header>
            <div>
                <Row className='comm-main' type='flex' justify='center'>
                    <Col className='comm-left' xs={24} sm={24} md={16} lg={17} xl={16}>
                        <div className='bread-div'>
                            <Row>
                                <Col xs={20}>
                                    <Breadcrumb>
                                        <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                                        <Breadcrumb.Item><a href="/blog">{props.typeName}</a></Breadcrumb.Item>
                                        <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
                                    </Breadcrumb>
                                </Col>
                                <Col xs={4} className="goComents">
                                    <Anchor affix={false} showInkInFixed={false}>
                                        <Link href="#comments" bounds={0} title="查看评论" ></Link>
                                    </Anchor>
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <div className="detailed-title">
                            {props.title}
                            </div>
                            <div className="list-icon center">
                            <span><Icon type="calendar" /> {moment(props.addTime*1000).format("YYYY/MM/DD")}</span>
                            <span><Icon type="folder" /> {props.typeName}</span>
                            <span><Icon type="fire" /> {props.view_count}</span>
                            </div>
                            <div className='detailed-content'
                            dangerouslySetInnerHTML={{__html:html}}
                            >
                            </div>
                        </div>
                    </Col>
                    <Col className='comm-right' xs={0} sm={0} md={5} lg={5} xl={6}>
                        <div>
                            <Author />
                            <Affix offsetTop={5}>
                                <div className='detailed-nav comm-box'>
                                <div className='nav-title'>文章目录</div>
                                    <div className="toc-list">
                                        {tocify && tocify.render()}
                                    </div>
                                </div>
                            </Affix>
                        </div>
                    </Col>
                </Row>  
            </div>
            <div id="comments">
                <Comments  className='comments-div' articleId = {props.id}/>        
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}


Detailed.getInitialProps = async (context)=>{
    console.log(context.query.id);
    let id =context.query.id
    const promise = new Promise((resolve)=>{
        let dataProps = {id}
        axios({
            url:servicePath.getArticleById,
            method:'post',
            data:dataProps
        }).then(res=>{
            // console.log(res.data.datas.data[0])
            resolve(res.data.datas.data[0])
        })
    })
    return await promise
}


export default Detailed