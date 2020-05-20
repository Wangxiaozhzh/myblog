import React,{useState,useEffect} from 'react';
import {Icon} from 'antd'
import Link from 'next/link'
import '../static/style/component/box.css'
import axios from 'axios'
import servicePath from '../config/apiUrl'
const Recommended = ()=>{
   const[isRotate,SetIsRotate] = useState(false);
   const [articlList,setArticlList] = useState([])
   const changeNews = ()=>{
        SetIsRotate(true);  
        getArticleRankList().then(()=>{
            SetIsRotate(false);  
        })
    }
    useEffect(()=>{
        getArticleRankList();
    },[])

//    获取文章排行
   const getArticleRankList = ()=>{
        return new Promise((resolve)=>{
            axios(servicePath.getArticleRankList).then(res=>{
                if(res&&res.data.code===200){
                    setArticlList(res.data.message);
                    resolve(true)
                }
             }).catch(error=>console.log(error))
        })
   }

    return (
        <div className="box Recommended">
            <div>
                <h3 className="title"><span>|</span>推荐阅读</h3>
                <a onClick={changeNews} className='loadMore'> <Icon type="sync" spin={isRotate} /> 换一批</a>
            </div>
            <div className='newsList'>
                <ul>
                    {articlList.map((item,index)=>(
                         <li key={index}>
                            <span className='rank'>{index+1}</span>
                            <p className='newsTitle'>
                                <Link href={{pathname:'/detailed',query:{id:item.id}}}><a>{item.title}</a></Link>
                            </p>
                            <p>{item.view_count}</p>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    )   
}

export default Recommended;