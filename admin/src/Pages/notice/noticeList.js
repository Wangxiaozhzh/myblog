import React, { useState,useEffect } from 'react';
import {List,Row,Col,Modal,message,Button} from 'antd';
import '../../Static/Css/ArticleList.css'
import {getAllNotice,deleteNoticeById} from '../../Config/httpRouter'
const {confirm} =Modal;

const NoticeList = (props)=>{
    const [NoticeList,setNoticeList] = useState([]);
    useEffect(()=>{
        allNoticeList()
    },[]);
    // 获取公告列表
    const allNoticeList=()=>{
        getAllNotice().then(res=>{
            if(res && res.data.code===200){
                let noticeInfo = res.data.message;
                noticeInfo.map((item)=>{
                    item.status=item.isShow==1 ? item.isShow = '显示' : item.isShow = '隐藏'
                })
                setNoticeList(noticeInfo);
            }
        })
    }
    // 删除公告
    const delNotice=(id)=>{
        let dataProps = {id}
        confirm({
            title:'确定要删除这篇博客文章吗',
            content:'确认删除后，文章将永远删除，无法恢复！',
            onOk(){
                deleteNoticeById(dataProps).then(res=>{
                    if(res&&res.data.code===200){
                        message.success("评论删除成功");
                        allNoticeList();
                    }else{
                        message.error("评论删除失败");
                        return
                    }
                })
            }
        })
    };
    // 修改公告状态
    const updateNotice=(id)=>{
        props.history.push('/notice/addNotice/'+id);
    };  
 
    return(
        <div>
             <List
                header={
                    <Row className="list-div">
                        <Col span={2}>
                            <b>id</b>
                        </Col>
                        <Col span={14}>
                            <b>内容</b>
                        </Col>
                        <Col span={3}>
                            <b>状态</b>
                        </Col>
                        <Col span={5}>
                            <b>操作</b>
                        </Col>
                    </Row>

                }
                bordered
                pagination={{
                    onChange: page => {
                      console.log(page);
                    },
                    pageSize: 10,
                  }}
                dataSource={NoticeList}
                renderItem={item => (
                    <List.Item>
                        <Row className="list-div">
                            <Col span={2}>
                                <b>{item.id}</b>
                            </Col>
                            <Col span={14}>
                                <b>{item.content}</b>
                            </Col>
                            <Col span={3}>
                                <b>{item.status}</b>
                            </Col>
                            <Col span={5}>
                              <Button type="primary" onClick={()=>{updateNotice(item.id)}}>编辑</Button>&nbsp;
                              <Button type='danger' onClick={()=>{delNotice(item.id)}}>删除</Button>
                            </Col>
                        </Row>

                    </List.Item>
                )}
                />
        </div>
    )
}

export default NoticeList;