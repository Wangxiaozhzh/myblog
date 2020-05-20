import React, { useState,useEffect } from 'react';
import {List,Row,Col,Modal,message,Button} from 'antd';
import '../../Static/Css/ArticleList.css'
import {getSoupWord,deleteSoupById} from '../../Config/httpRouter'
const {confirm} =Modal;

const SoupList = (props) => {

    const [soupList,setSoupList] = useState([]);
    useEffect(()=>{
        allSoupList()
    },[]);

    // 获取评论列表
    const allSoupList=()=>{
        getSoupWord().then(res=>{
            if(res && res.data.code===200){
                let commentsInfo = res.data.message;
                setSoupList(commentsInfo);
            }
        })
    }
    // 删除评论
    const delSoup=(id)=>{
        let dataProps = {id}
        confirm({
            title:'确定要删除这篇博客文章吗',
            content:'确认删除后，文章将永远删除，无法恢复！',
            onOk(){
                deleteSoupById(dataProps).then(res=>{
                    if(res&&res.data.code===200){
                        message.success("评论删除成功");
                        allSoupList();
                    }else{
                        message.error("评论删除失败");
                        return
                    }
                })
            }
        })
    };
    // 修改评论状态
    const editSoup=(id)=>{
        console.log(props);
        props.history.push('/soup/addSoup/'+id);
    };  
 
    return(
        <div>
             <List
                header={
                    <Row className="list-div">
                        <Col span={2}>
                            <b>id</b>
                        </Col>
                        <Col span={16}>
                            <b>内容</b>
                        </Col>
                        <Col span={6}>
                            <b>操作</b>
                        </Col>
                    </Row>

                }
                bordered
                pagination={{
                    showQuickJumper:true,
                    pageSize: 10,
                  }}
                dataSource={soupList}
                renderItem={item => (
                    <List.Item>
                        <Row className="list-div">
                            <Col span={2}>
                                <b>{item.id}</b>
                            </Col>
                            <Col span={16}>
                                <b>{item.content}</b>
                            </Col>
                            <Col span={6}>
                              <Button type="primary" onClick={()=>{editSoup(item.id)}}>编辑</Button>&nbsp;
                              <Button type='danger' onClick={()=>{delSoup(item.id)}}>删除</Button>
                            </Col>
                        </Row>

                    </List.Item>
                )}
                />
        </div>
    )
}

export default SoupList;