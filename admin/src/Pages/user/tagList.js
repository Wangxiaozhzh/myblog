import React, { useState,useEffect } from 'react';
import {List,Row,Col,Button} from 'antd';
import '../../Static/Css/ArticleList.css'
import {getUserTags} from '../../Config/httpRouter'

const TagList = (props)=>{
    const [tagList,setTagList] = useState([]);
    useEffect(()=>{
        allTagList()
    },[]);
    // 获取标签列表
    const allTagList=()=>{
        getUserTags().then(res=>{
            if(res && res.data.code===200){
                let Tags = res.data.message[0].tags;
                let tag = Tags.split('&')
                setTagList(tag);
            }
        })
    }
    // 修改标签状态
    const updateNotice=()=>{
        props.history.push('/user/addTag');
    };  
 
    return(
        <div>
             <List
                header={
                    <Row className="list-div">
                        <Col span={5}>
                            <b>序号</b>
                        </Col>
                        <Col span={14}>
                            <b>标签</b>
                        </Col>
                        <Col span={5}>
                            <b>操作</b>
                        </Col>
                    </Row>

                }
                bordered
                pagination={{
                    pageSize: 10,
                  }}
                dataSource={tagList}
                renderItem={(item,index) => (
                    <List.Item>
                        <Row className="list-div">
                            <Col span={5}>
                                <b>{index+1}</b>
                            </Col>
                            <Col span={14}>
                                <b>{item}</b>
                            </Col>
                            <Col span={5}>
                              <Button type="primary" onClick={()=>{updateNotice(item.id)}}>编辑</Button>&nbsp;
                            </Col>
                        </Row>

                    </List.Item>
                )}
                />
        </div>
    )
}

export default TagList;