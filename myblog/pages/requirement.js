import React,{useState}  from 'react';
import Head from 'next/head';
import Header from '../components/Header'
import Footer from '../components/Footer'
import {Input,Button,List,Badge,message,Row,Col} from 'antd';
const {TextArea} = Input 
import '../static/style/page/requirement.css'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import moment from 'moment'

const Requirement = (data)=>{
    
    const [requirementList,setRequirementList] = useState(data.message);
    const [addContent,setAddContent] = useState('');
    const [userName,setUserName] = useState('');
    const [email,setEmail] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    const postRequirement = () =>{
        // console.log(addContent,userName,email);
        if(!addContent || addContent == ''|| !userName || !email){
            message.error('请填写完整信息');
            return
        }
        setIsLoading(true);
        axios({
            url:servicePath.addRequirement,
            method:'post',
            data:{
                requirement:addContent,
                create_date:((new Date()).getTime())/1000,
                userName:userName,
                email:email
            }
        }).then(res=>{
            if(res&&res.data.code==200){
                message.success('提交需求成功');
                setAddContent('');
                getAllRequirement();
            }else{
                message.error('提交需求失败')
            }
            setIsLoading(false) 
        })
    }
    const changeTextarea = (e)=>{
        setAddContent(e.target.value)
    }
    const getAllRequirement = () => {
        axios(servicePath.getRequirements).then(res=>{
            if(res&&res.data.code==200){
                setRequirementList(res.data.message)
            }
        })
    }

    return (
        <>
            <Head>
                <title>你有什么不爽</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Header />
            <div className="main-div">
                <div className="require-div">
                    <Row gutter={15}>
                        <Col xs={24}>
                            <TextArea autoSize='true'style={{minHeight:'5rem'}} placeholder='请提出你宝贵的建议......' value={addContent} onChange={e=>{changeTextarea(e)}}  />
                        </Col>
                        <Col xs={8}><Input value={userName} onChange={e=>{setUserName(e.target.value)}} placeholder='请输入你的昵称' /></Col>
                        <Col xs={8}><Input value={email} onChange={e=>setEmail(e.target.value)} placeholder='请输入你的邮箱(不公开)' /></Col>
                        <Col xs={8}>
                            <Button type='primary' value onClick={postRequirement} loading={isLoading}>提交</Button>
                        </Col>
                    </Row>
                </div>
                <div className="requirements">
                    <List 
                        bordered
                        dataSource={requirementList}
                        renderItem ={
                            item=>(
                                <List.Item>
                                    <Badge className={`status${item.statusId}`} count={item.status}>
                                        <p>{item.requirement}</p>
                                        <div className='requirement-title'>
                                            <span>来自:{item.userName}</span>
                                            <span className="requirement-date">发布于:{moment(item.create_date*1000).format('YYYY/MM/DD')}</span>
                                        </div>
                                    </Badge>
                                </List.Item>
                            )
                        }
                    />
                </div>
                <Footer />
            </div>
        </>
    )
}
Requirement.getInitialProps = async ()=>{
    const promise = new Promise((resolve)=>{
        axios(servicePath.getRequirements).then(res=>{
            if(res&&res.data.code==200){
                // console.log(res.data);
                resolve(res.data)
            }
        })
    })
    return await promise;
}
export default Requirement;