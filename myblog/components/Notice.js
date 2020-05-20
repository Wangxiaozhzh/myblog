import React ,{useEffect,useState} from 'react';
import {Icon} from 'antd'
import '../static/style/component/notice.css'
const Notice = (props)=>{
    // 解构传过来的数据
    const {noticeCont} = props;
    let time = true
    useEffect(() => {
        autoPlay(0);
        return ()=>{time=false}
    }, []);

    let index = 0;
    const move = ()=>{
        const content = document.querySelector('.slider-content');
        const length = document.querySelectorAll('.slider-item').length;
        if(index == length-1){
            index = 0
        }
        index+=1;
        if(content)content.style.top = -index*30+'px';
    }
    const autoPlay = (num)=>{
        num++;
        if(!time)return
        setTimeout(function () {
                move();
                autoPlay(num)
            }, 2000);
    }
    
    return(
        <div className='notice-div'>
            <Icon theme='filled' style={{color:'#5c5cff',fontSize:'1rem'}} type='sound' />
            <div className="container">
                <div className="slider-content">
                    {
                        noticeCont.map((item,index)=>(
                            <div key={index} className="slider-item">{item.content}</div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
export default Notice;