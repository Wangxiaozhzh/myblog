import React from 'react';
import {Row,Col} from 'antd'
import '../static/style/component/box.css'
const Box = (props)=>{
    const {title,itemList} = props;
    return(
        <div className="billboard box">
            <h3 className="title"><span>|</span>{title}</h3>
            <Row gutter={10} className="listsWrap">
                {itemList.map((item,index)=>(
                    <Col xs={8} md={6} lg={4} xl={4}  key={index}>
                        <div className="list-item">
                            <a href={item.adress} target="_blank">
                                <img className="box-img" src={item.src}/>
                                <span>{item.title}</span>
                            </a>
                        </div>
                    </Col>
                ))}
             
            </Row>
        </div>
    )
}


export default Box;