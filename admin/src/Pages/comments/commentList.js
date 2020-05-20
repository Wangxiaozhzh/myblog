import React, { useState,useEffect } from 'react';
import {List,Row,Col,Modal,message,Button,Form,Select} from 'antd';
import '../../Static/Css/ArticleList.css'
import {getCommentsList,updateCommentStatus,deleteCommentById} from '../../Config/httpRouter'
import moment from 'moment'
const {confirm} =Modal;
const {Option} = Select;

const CommentList = () => {

    const [commentList,setCommentList] = useState([]);
    const [showData,setShowData] = useState([]);
    const [articleTitle,setArticleTitle] = useState([])
    const [isShow,setIsShow] = useState('0')
    const [isArticle,setIsArticle] = useState('0')
    useEffect(()=>{
        allCommentList()
    },[]);

    // 获取评论列表
    const allCommentList=()=>{
        getCommentsList().then(res=>{
            if(res && res.data.code===200){
                let commentsInfo = res.data.message;
                let articeArray = [];
                commentsInfo.map((item)=>{
                    if(articeArray.indexOf(item.title)==-1){
                        articeArray.push(item.title);
                    }
                    item.isShow=item.status == 1 ? '显示' : '隐藏'
                })
                setCommentList(commentsInfo);
                setShowData(commentsInfo);
                setArticleTitle(articeArray);
            }
        })
    }
    // 删除评论
    const delComment=(id)=>{
        let dataProps = {id}
        confirm({
            title:'确定要删除这篇博客文章吗',
            content:'确认删除后，文章将永远删除，无法恢复！',
            onOk(){
                deleteCommentById(dataProps).then(res=>{
                    if(res&&res.data.code===200){
                        message.success("评论删除成功");
                        allCommentList();
                    }else{
                        message.error("评论删除失败");
                        return
                    }
                })
            }
        })
    };
    // 修改评论状态
    const changeStatus=(id,status)=>{
        if(!id || !status)return
        let changeStatus = status == 1 ? 2 : 1
        let dataProps = {id,status:changeStatus}
        updateCommentStatus(dataProps).then(res=>{
            if(res && res.data.code==200){
                message.success('更改状态成功')
                allCommentList();
            }else{
                message.error("更改状态失败")
            }
        })
    };  

    // 更改文章选项
    const changeType = (value)=>{
        setIsArticle(value);
        if(value==0){
            if(isShow==0){
                setShowData(commentList);            
            }else{
                let newArr = commentList.filter(item=>item.isShow==isShow);
                setShowData(newArr);
            }
        }else{
            if(isShow==0){
                let newArr = commentList.filter(item=>item.title==value);
                setShowData(newArr);
            }else{
                let newArr = commentList.filter(item=>item.title==value&&item.isShow==isShow);
                setShowData(newArr);
            }
        }
    }
    // 更改显示状态选项
    const changeShow = (value)=>{
        setIsShow(value);
        if(isArticle==0){
            if(value==0){
                setShowData(commentList)
            }else{
                let newArr = commentList.filter(item=>item.isShow==value);
                setShowData(newArr);
            }
        }else if(isArticle!=0){
            if(value==0){
                let newArr = commentList.filter(item=>item.title==isArticle);
                setShowData(newArr);
            }else{
                let newArr = commentList.filter(item=>item.title==isArticle&&item.isShow==value);
                setShowData(newArr);
            }
        }

    }

    return(
        <div>
            <Form >
                <Row gutter={10}>
                    <Col xs={2}><p style={{height:'40px',lineHeight:'40px',textAlign:'right'}}>选择所属文章:</p></Col>
                    <Col xs={4}>
                        <Form.Item>
                            <Select defaultValue='0' onChange={changeType}>
                                <Option value='0'>全部</Option>
                                {
                                    articleTitle.map((item,index)=>(
                                        <Option key={index} value={item}>{item}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={3}>
                        <Form.Item >
                            <Select defaultValue='0' onChange={changeShow}>
                                <Option value='0'>全部</Option>
                                <Option value='显示'>显示</Option>
                                <Option value='隐藏'>隐藏</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
             <List
                header={
                    <Row className="list-div">
                        <Col span={1}>
                            <b>id</b>
                        </Col>
                        <Col span={2}>
                            <b>所属文章</b>
                        </Col>
                        <Col span={2}>
                            <b>发布时间</b>
                        </Col>
                        <Col span={6}>
                            <b>内容</b>
                        </Col>
                        <Col span={2}>
                            <b>状态</b>
                        </Col>
                        <Col span={2}>
                            <b>评论人</b>
                        </Col>
                        <Col span={2}>
                            <b>被@人</b>
                        </Col>
                        <Col span={3}>
                            <b>邮箱</b>
                        </Col>
                        <Col span={4}>
                            <b>操作</b>
                        </Col>
                    </Row>

                }
                bordered
                pagination={{
                    showQuickJumper:true,
                    pageSize: 10,
                  }}
                dataSource={showData}
                renderItem={item => (
                    <List.Item>
                        <Row className="list-div">
                            <Col span={1}>
                                <b>{item.id}</b>
                            </Col>
                            <Col span={2}>
                                <b>{item.title}</b>
                            </Col>
                            <Col span={2}>
                                <b>{moment(item.add_time*1000).format("YYYY-MM-DD")}</b>
                            </Col>
                            <Col span={6}>
                                <b>{item.content}</b>
                            </Col>
                            <Col span={2}>
                                <b>{item.isShow}</b>
                            </Col>
                            <Col span={2}>
                                <b>{item.from_name}</b>
                            </Col>
                            <Col span={2}>
                                <b>{item.to_name}</b>
                            </Col>
                            <Col span={3}>
                                <b>{item.email}</b>
                            </Col>
                            <Col span={4}>
                              <Button type="primary" onClick={()=>{changeStatus(item.id,item.status)}}>改变状态</Button>&nbsp;
                              <Button type='danger' onClick={()=>{delComment(item.id)}}>删除</Button>
                            </Col>
                        </Row>

                    </List.Item>
                )}
                />
        </div>
    )
}

export default CommentList;