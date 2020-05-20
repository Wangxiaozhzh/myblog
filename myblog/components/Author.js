import {useEffect,useState} from 'react'
import { Avatar,Divider,Tooltip,Tag } from 'antd';
import '../static/style/component/author.css'
import servicePath from '../config/apiUrl'
import axios from 'axios'
const Author = ()=>{

    const [blogNum,setBlogNum] = useState(0);
    const [viewAllCount,setViewAllCount] = useState(0);
    const [tags,setTages] = useState([])
    useEffect(()=>{
        getArticleList();
        getBlogerTags();
    },[])
    // 获取文章列表
    const getArticleList = ()=>{
        axios(servicePath.getArticleList).then(res=>{
            setBlogNum(res.data.data.length);
            let num = 0;
            res.data.data.forEach((item)=>{
                num+=item.view_count
            })
            setViewAllCount(num);
        })
    }
    // 获取博主tags
    const getBlogerTags = ()=>{
        axios(servicePath.getUserTags).then(res=>{
            if(res&&res.data.code==200){
                let tempData = res.data.message[0].tags;
                let arr = tempData.split('&');
                setTages(arr);
            }
        })
    }
    const TagColor = ['magenta','green','geekblue','blue','cyan','red','volcano','orange','gold','lime','purple']

    return(
            <div className="author-div common-box">
              <div><Avatar size='100' src="http://pic2.52pk.com/files/litimg/171016/091051N122501X1.jpg" /></div>
              <div className="author-introduction">
                <div>一个热爱生活，爱做饭的菜鸡前端程序员。</div>
                <div className="author-tag">
                    {
                        tags.map((item,index)=>(
                            <Tag key={index} color={TagColor[Math.floor(Math.random()*11)]}>
                                {item}
                            </Tag>
                        ))
                    }
                    <Tag color="blue">博客总数{blogNum}篇</Tag>
                    <Tag color="cyan">博文累积访问{viewAllCount}次</Tag>
                </div>
                <Divider>社交账号</Divider>
        
                <Tooltip title="QQ : 1776268634">
                    <a className='personInfo'>
                        <Avatar size={28} icon="qq" className="account"></Avatar>
                    </a>
                </Tooltip>

                <Tooltip title="Github : Wangxiaozhzh">
                    <a className='personInfo'>
                        <Avatar size={28} icon="github"  className="account"></Avatar>
                    </a>
                </Tooltip>

                <Tooltip title="Wechart : ydydujdhdh">
                    <a className='personInfo'>
                        <Avatar size={28} icon="wechat" className="account"></Avatar>
                    </a>
                </Tooltip>
              </div>
            </div>
        
    )
}
export default Author;