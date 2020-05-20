import React,{useEffect,useState} from 'react';
import {Button} from 'antd';
import Link from 'next/link'
import servicePath from '../config/apiUrl'
import axios from 'axios';

const Billboard = ()=>{
    
    const [notice,setNotice] = useState([{content:'暂无公告'}])

    useEffect(()=>{
        getNotice();
    },[])

    // 获取公告数据
    const getNotice = ()=>{
        axios(servicePath.getAllShowNotice).then(res=>{
            if(res&&res.data.code==200){
                let newData = res.data.message.slice(0,3)
                setNotice(newData)
            }
          }).catch(error=>console.log(error))
    }
    return(
        <div className="box">
            <h3 className="title"><span>|</span>公告</h3>
            {
                notice.map((item,index)=>(
                    <p key={index} className="content">{item.content}</p>
                ))
            }
            <Button type='primary'><Link href='/requirement'><a>提需求/Bug</a></Link></Button>
        </div>
    )
}
export default Billboard;