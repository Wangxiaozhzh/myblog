import {useEffect,useState} from 'react'
import { Comment, Tooltip, List,Form,Button,Input,Icon, Col,Row,message } from 'antd';
import moment from 'moment';
import axios from 'axios';
import servicePath from '../config/apiUrl';
import '../static/style/component/comments.css';
const { TextArea } = Input;

const Comments = (props)=>{
    // 获取当前文章id
    const {articleId} = props;
    const [commentsContent,setCommentsContent]  = useState([])

    useEffect(()=>{
        testAsync()
    },[])

    // 获取文章对应的评论列表
    const getCommentsByArticleId = () =>{
        return new Promise((resolve)=>{
            let id = articleId;
            axios({
                url:servicePath.getAllComments,
                method:'post',
                data:{
                    articleId:id
                }
            }).then(res=>{
                if(res){
                    if(res.data.code==200){
                        let dataProps = res.data.message
                        resolve(dataProps);

                        }                
                    }else if(res.data.code==201){
                        setCommentsContent([]);
                    }
            })
        })
    }

    const testAsync = async ()=>{
        let comments = await getCommentsByArticleId();
        transformData(comments)
    }

    // 设置一个回复评论姓名
    const [replyName,setReplyName] = useState('')
    // 提交按钮的状态
    const [isLoading1,setIsLoading1] = useState(false);
    const [isLoading2,setIsLoading2] = useState(false);
    // 新增评论数据
    const [addContentName1,setAddContentName1] = useState('');
    const [addContentEmail1,setAddContentEmail1] = useState('');
    const [addContent,setAddContent] = useState('');
    // @别人数据
    const [addContentName2,setAddContentName2] = useState('');
    const [addContentEmail2,setAddContentEmail2] = useState('');
    const [replyContent,setReplyContent] = useState('');
    // 设置一个id，用来判断当前的评论打开状态
    const [currentId,setCurrentId] = useState(0);

    // 设置一组颜色数据供用户名使用
    const colorArr = ['#f4222c','#f4222c','#00bcd4','#009688','#009688','#ffeb3b','#673ab7']

    // 将获取的数据转化为指定的格式
    const transformData = (data)=>{
        let arr = [];
        let content;
        data.forEach(item=>{
            if(item.to_name == null){
                content= <span>{item.content}</span>
            }else{
               content = <><a className='toName'>@{item.to_name}</a> {item.content}</>
            }
            arr.push(
                {   id:item.id,
                    actions: [<a onClick={()=>{reply(item.id,item.from_name)}} key="comment-list-reply-to-0">回复<Icon type="message" /></a>],
                    author: (<span className='commentName'>{item.from_name}</span>),
                    avatar: (
                        <span className="comment_name" style={
                            {background:colorArr[Math.floor(Math.random()*7)]}
                        }>{item.from_name.slice(0,1)}</span>
                    ),
                    content: (
                        // `${item.to_name == '' ? item.content : "@"+item.to_name +' '+ item.content}`
                        content),
                    datetime: (
                        <Tooltip
                        title={moment(item.add_time*1000)
                            .format('YYYY-MM-DD HH:mm:ss')}
                        >
                        <span>
                            {moment(item.add_time*1000)
                            .startOf('hour').fromNow()}
                        </span>
                        </Tooltip>
                    )
                }
            )
        })
        setCommentsContent(arr);               
    }
     // 点击回复评论
    const reply = (id,name)=>{
        setReplyName(name);
        setCurrentId(id);
    }
    // 添加评论
    const handleChange=(e)=>{
        setAddContent(e.target.value);
    }
    const submitComment = ()=>{
        postComment(addContentName2,addContent,addContentEmail2,null,setIsLoading1);
    }
    // 回复别人的评论
    const changeReply = (e)=>{
        setReplyContent(e.target.value)
    }
    //提交回复别人评论
    const addReplyContent = ()=>{
        postComment(addContentName1,replyContent,addContentEmail1,replyName,setIsLoading2);
    }
    // 提交新增评论或者是回复评论
    const postComment = (name,content,email,toName,setLoading) =>{
        if(!name || !content || !email){
            message.error('请填写完整的评论内容');
            return
        }
        setLoading(true);
        let postData={
            content:content,
            add_time:(new Date()).getTime()/1000,
            article_id:articleId,
            from_name:name,
            to_name:toName,
            email:email
        }
        axios({
            url:servicePath.addComments,
            method:'post',
            data:postData
        }).then(res=>{
            if(res && res.data.code===200){
                message.success('评论提交成功，正在等待审核...');
                setLoading(false);
                setAddContentName1('');
                setAddContentEmail1('');
                setAddContentName2('');
                setAddContentEmail2('');
            }else{
                message.error('评论失败，请稍后重试');
                setLoading(false);
            }
        }).catch(error=>console.log(error)) 
    }

    return(
        <div>
            <List
                className="comment-list"
                header={`${commentsContent.length ==0 ? '暂无评论': commentsContent.length+"条评论"}`}
                itemLayout="horizontal"
                dataSource={commentsContent}
                renderItem={item => (
                <li>
                    <Comment
                    actions={item.actions}
                    author={item.author}
                    avatar={item.avatar}
                    content={item.content}
                    datetime={item.datetime}
                    />
                     <div className='replyDiv' style={{display: (currentId===item.id) ? "block" : "none"}} >
                        <Form>
                            <Row gutter={10}>
                                <Col><h4 className='replyName'>回复{replyName}</h4></Col>
                                <Col xs={24}>
                                    <Form.Item>
                                        <TextArea rows={4} onChange={changeReply}
                                            placeholder='输入你想回复的内容...'
                                            value={replyContent} />
                                    </Form.Item>
                                </Col>
                                <Col xs={12}>
                                    <Form.Item>
                                        <Input  placeholder='请输入你的称呼' onChange={e=>{setAddContentName1(e.target.value)}} value={addContentName1} />
                                    </Form.Item>
                                </Col>
                                <Col xs={12}>
                                    <Form.Item>
                                        <Input  placeholder='请输入你的邮箱(不公开)' onChange={e=>{setAddContentEmail1(e.target.value)}} value={addContentEmail1} />
                                    </Form.Item>
                                </Col>
                                <Col xs={12}>
                                    <Form.Item>
                                        <Button  onClick={()=>{setCurrentId(0)}}  type="primary">收起</Button>&nbsp;
                                        <Button loading={isLoading2} onClick={addReplyContent} type="primary">回复</Button>
                                    </Form.Item>
                                </Col> 
                            </Row>
                        </Form>
                    </div>
                </li>
                )}
            /> 
           <div className='addComment'>
                <Row gutter={10}>
                    <Col xs={24}> <TextArea rows={4} onChange={handleChange} value={addContent} 
                        placeholder='输入你想评论的内容...'
                    /></Col>
                    <Col xs={12}><Input onChange={e=>{setAddContentName2(e.target.value)}} value={addContentName2} placeholder='请输入你的称呼'  /></Col>
                    <Col xs={12}><Input onChange={e=>{setAddContentEmail2(e.target.value)}} value={addContentEmail2} placeholder='请输入你的邮箱(不公开)' /></Col>
                    <Col xs={10}><Button htmlType="submit" loading={isLoading1} onClick={submitComment} type="primary">添加评论</Button></Col>
                </Row>
            </div>
        </div>
        
    )
}

export default Comments;
