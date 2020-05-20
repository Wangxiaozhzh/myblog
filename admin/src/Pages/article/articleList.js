import React, { useState,useEffect } from 'react';
import {List,Row,Col,Modal,message,Button,Form,Input,Select} from 'antd';
import '../../Static/Css/ArticleList.css'
import {getArticleList,deleteArticleById,getTypeInfo} from '../../Config/httpRouter'
import moment from 'moment'
const {confirm} =Modal;
const {Option} = Select;
const { Search } = Input;


function ArticleList(props){

    const [articleList,setArticleList] = useState([]);
    const [articleDatas,setArticleDatas] = useState([]);
    const [articleType,setArticleType] = useState([]);
    const [currentType,setCurrentType] = useState('0')

    useEffect(()=>{
        getList();
        allArticleType();
    },[]);
    

    // 获取文章列表
    const getList=()=>{
      getArticleList().then(res=>{
            if(res && res.data.code===200){
                setArticleList(res.data.data);
                setArticleDatas(res.data.data);
            }
        })
    }
      // 获取文章类型
    const allArticleType = () => {
        getTypeInfo().then(res=>{
            if(res && res.data.code===200){
                setArticleType(res.data.message)
            }
        })
    }
    // 删除文章
    const delArticle=(id)=>{
        let dataProps = {id}
        confirm({
            title:'确定要删除这篇博客文章吗',
            content:'确认删除后，文章将永远删除，无法恢复！',
            onOk(){
                deleteArticleById(dataProps).then(res=>{
                    if(res&&res.data.code===200){
                        message.success("文章删除成功");
                        getList();
                    }else{
                        message.error("文章删除失败");
                        return
                    }
                })
            }
        })
    };
    // 修改文章的跳转方法
    const updateArticle=(id)=>{
        props.history.push('/article/addArticle/'+id);
    };
    

    const changeType = (value)=>{
       setCurrentType(value);
    }
    const onSearch = (value)=>{
        if(value==''){
            if(currentType==0){
                setArticleList(articleDatas)
            }else{
                let newArr = articleDatas.filter(item=>item.typeName==currentType);
                setArticleList(newArr);
            }
        }else{
            if(currentType==0){
                let newArr = [];
                articleDatas.forEach(item=>{
                    if(item.title.indexOf(value)>-1){
                        newArr.push(item)
                    }
                })
                setArticleList(newArr);
            }else{
                let newArr = [];
                articleDatas.forEach(item=>{
                    if(item.title.indexOf(value)>-1&&item.typeName==currentType){
                        newArr.push(item)
                    }
                })
                setArticleList(newArr);
            }



        }
    }
    return(
        <div>
            <Form >
                <Row gutter={10}>
                    <Col xs={2}><p style={{height:'40px',lineHeight:'40px',textAlign:'right'}}>选择文章类型:</p></Col>
                    <Col xs={4}>
                        <Form.Item>
                            <Select defaultValue='0' onChange={changeType}>
                                <Option value='0'>全部</Option>
                                {
                                    articleType.map((item,index)=>(
                                        <Option key={index} value={item.typeName}>{item.typeName}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={3}>
                        <Form.Item >
                        <Search
                            placeholder="输入文章标题"
                            onSearch={value => onSearch(value)}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>

             <List
                header={
                    <Row className="list-div">
                        <Col span={8}>
                            <b>标题</b>
                        </Col>
                        <Col span={4}>
                            <b>类别</b>
                        </Col>
                        <Col span={4}>
                            <b>发布时间</b>
                        </Col>
                        <Col span={4}>
                            <b>浏览量</b>
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
                dataSource={articleList}
                renderItem={item => (
                    <List.Item>
                        <Row className="list-div">
                            <Col span={8}>
                                {item.title}
                            </Col>
                            <Col span={4}>
                             {item.typeName}
                            </Col>
                            <Col span={4}>
                                {moment(item.addTime*1000).format("YYYY-MM-DD")}
                            </Col>
                            <Col span={4}>
                              {item.view_count}
                            </Col>

                            <Col span={4}>
                              <Button type="primary" onClick={()=>{updateArticle(item.id)}}>编辑</Button>&nbsp;
                              <Button type='danger' onClick={()=>{delArticle(item.id)}}>删除</Button>
                            </Col>
                        </Row>

                    </List.Item>
                )}
                />
        </div>
    )
}

export default ArticleList;