import React ,{useEffect,useState}from 'react';
import {List,Row,Col,Button,Modal,Input,message} from 'antd'
import {getTypeInfo,updateTypeInfo,deleteTypeInfo,addTypeInfo} from '../../Config/httpRouter'
import '../../Static/Css/ArticleList.css'
const {confirm} = Modal

const ArticleType = ()=>{
    const [articleType,setArticleType] = useState([]);
    const [visible,setVisible] = useState(false);
    const [currentId,setCurrentId] = useState(0);
    const [currentArticleType,setCurrentArticleType] = useState('');
    const [modalTitle,setModalTitle] = useState();
    useEffect(()=>{
        allArticleType()
    },[])

    const clickEditBtn = (e) =>{
        setModalTitle('修改文章类型');
        setVisible(true);
        setCurrentId(e.id);
        setCurrentArticleType(e.typeName);
    }
    // 删除文章类型
    const clickDelBtn = (id) =>{
        let dataId = {id}
        confirm({
            title:'确认删除此文章类型吗',
            onOk(){
                if(!id)return
                deleteTypeInfo(dataId).then(res=>{
                    if(res && res.data.code === 200){
                        message.success('删除文章类型成功');
                        allArticleType();
                    }
                })
            }
        })
    }

    const clickAddBtn = () => {
        setModalTitle('新增文章类型');
        setVisible(true);
    }

    // 修改文章类型和保存文章类型
    const handleOk = ()=>{
        setVisible(false);
        if(!currentArticleType){
            message.error('请输入完整的信息')
            return 
        }
        let dataProps = {
            typeName:currentArticleType
        }
        if(currentId!=0){
            dataProps.id = currentId;
            updateTypeInfo(dataProps).then(res=>{
                if(res){
                    setCurrentArticleType('');
                    if(res.data.code===2){
                        message.error('文章类型名已经存在,请重新输入');
                        return
                    }else if(res.data.code === 200){
                        message.success('修改文章类型成功');
                        allArticleType();
                        return
                    }
                }
            })
        }else{
            addTypeInfo(dataProps).then(res=>{
                 if(res){
                    setCurrentArticleType('');
                    if(res.data.code===2){
                        message.error('文章类型名已经存在,请重新输入');
                        return
                    }else if(res.data.code === 200){
                        message.success('新增文章类型成功');
                        allArticleType();
                        return
                    }
                }
            })
        }
    }

    // 获取文章类型
    const allArticleType = () => {
        getTypeInfo().then(res=>{
            if(res && res.data.code===200){
                setArticleType(res.data.message)
            }
        })
    }

    const handleCancel = () => {
        setVisible(false);
        setCurrentArticleType('');
    }

    return (
        <div>
            <Row>
                <Col><Button onClick={clickAddBtn} type="primary">+ 添加文章类型</Button><p></p></Col>
            </Row>
            <List 
                header={
                    <Row className="list-div">
                        <Col span={7}>
                            <b>id</b>
                        </Col>
                        <Col span={7}>
                            <b>类别</b>
                        </Col>
                        <Col span={10}>
                            <b>操作</b>
                        </Col>
                    </Row>

                }
                pagination={{
                    onChange: page => {
                      console.log(page);
                    },
                    pageSize: 10,
                  }}
                bordered
                dataSource={articleType}
                renderItem={item => (
                    <List.Item>
                        <Row className="list-div">
                            <Col span={7}>
                                {item.id}
                            </Col>
                            <Col span={7}>
                             {item.typeName}
                            </Col>
                            <Col span={10}>
                              <Button type="primary" onClick={()=>{clickEditBtn(item)}}>编辑</Button>&nbsp;
                              <Button type='danger' onClick={()=>{clickDelBtn(item.id)}}>删除</Button>
                            </Col>
                        </Row>

                    </List.Item>
                )}
                />
                <Modal
                    title={modalTitle}
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    >
                    <p>
                        <Input
                            value={currentArticleType}
                            onChange={(e)=>{setCurrentArticleType(e.target.value)}}
                            placeholder='请输入文章类型'
                        />
                    </p>
                </Modal>

        </div>
    )
}
export default ArticleType;