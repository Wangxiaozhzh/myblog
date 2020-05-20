import React,{useState,useEffect} from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import{Button,Row,Col,Modal,Spin,Input,message} from 'antd';
import '../static/style/page/soupWord.css';
import servicePath from '../config/apiUrl';
import axios from 'axios';
const { TextArea } = Input;
const SoupWord = (props)=>{
    
    const [content,setContent] = useState(props.message[0].content);
    const [visible,setVisible] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [addWord,setAddWord] = useState('')
    const addSoupWord=()=>{
        // 新增鸡汤
        setVisible(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }

    const handleCancel = ()=>{
        setVisible(false);
    }
    const handleOk = ()=>{
        if(!addWord || addWord === undefined || addSoupWord==''){
            message.error('请输入鸡汤');
            return
        }
        axios({
            url:servicePath.addSoupWord,
            method:'post',
            data:{
                content:addWord
            }
        }).then(res=>{
            if(res){
               if(res.data.code===200){
                   message.success('倒入鸡汤成功')
               }
               if(res.data.code ===2){
                   message.info('鸡汤已经存在');
               }
                setVisible(false);
            }else{
                message.error('倒入鸡汤失败')
            }
        }).catch(error=>console.log(error))
    }

    const getSoupWord = ()=>{
        // 随机获取一碗鸡汤
        setIsLoading(true)
        axios(servicePath.getOneSoupWord).then(responent=>{
            if(responent && responent.data.code === 200){
                setIsLoading(false)
                setContent(responent.data.message[0].content);
            }
        })
    }

    return(
        <div>  
             <Head>
                <title>壮士，多少整点</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Header />
            <Row type="flex" justify="center">
                <Col>
                    <div className="soupWord">
                        <h2 className="soupWord-count">{content}</h2>
                        <div className='btn-warp'>
                            <Spin spinning={isLoading}>
                                <Button type='primary' onClick={addSoupWord}>壮士，满上！</Button>
                                <Button type='danger' onClick={getSoupWord}>壮士，再来一碗！</Button>
                            </Spin>
                        </div>
                    </div>
                </Col>
            </Row>
            <Modal
                cancelText="取消"
                okText="确认"
                title="添加一碗鸡汤"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <TextArea onChange={e=>setAddWord(e.target.value)}/>
            </Modal>
            <Footer />
        </div>
    )
}

SoupWord.getInitialProps = async()=>{
    const promise = new Promise((resolve)=>{
        axios(servicePath.getOneSoupWord).then(res=>{
            if(res)resolve(res.data)
        })
    })
    return await promise
}

export default SoupWord;