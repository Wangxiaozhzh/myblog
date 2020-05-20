import React, { useState,useEffect } from 'react';
import {List,Row,Col,Modal,message,Button,Select,Form} from 'antd';
import '../../Static/Css/ArticleList.css'
import {getRequirementsInfo,updateRequireStatus} from '../../Config/httpRouter'
import moment from 'moment'
import '../../Static/Css/requirement.css'
const { Option } = Select;
const RequirementList=()=>{
    const [requirementList,setRequirementList] = useState([]);
    const [requirementData,setRequirementData] = useState([]);
    const [visible,setVisible] = useState(false);
    const [modalOption,setModalOption] = useState('');
    const [changeId,setChangeId] = useState('');
    const [changeStatusId,setChangeStatusId] = useState('');

    useEffect(()=>{
        allRequirementList()
    },[]);

    // 获取需求列表
    const allRequirementList=()=>{
        getRequirementsInfo().then(res=>{
            if(res && res.data.code===200){
                let requirementsInfo = res.data.message;
                setRequirementList(requirementsInfo);
                setRequirementData(requirementsInfo);
            }
        })
    }
    // 修改需求状态
    const changeStatus=(id,status,statusId)=>{
        // console.log(id,status,statusId);
        setModalOption(status);
        setChangeId(id);
        setVisible(true)    
    };  
    
    const handleOk = () =>{
        if(!setChangeId || !modalOption){
            message.error('请填写完整信息');
            return
        }
        let dataProps = {
            id:changeId,
            status:changeStatusId
        }
        // console.log(dataProps);
        updateRequireStatus(dataProps).then(res=>{
            if(res&&res.data.code===200){
                message.success('更改需求状态成功');
                allRequirementList();
            }else{
                message.error('更改需求状态失败')
            }
            setVisible(false);
        })
    }

    const handleCancel = () => {
        setVisible(false)
    }
    const handleChange = (value)=>{
        setModalOption(value)
        setChangeStatusId(value)
    }
    // 过滤筛选
    const filterStatus = (value)=>{
        if(value==0){
            setRequirementData(requirementList);
        }else{
            let newArr = requirementList.filter(item=>item.statusId == value);
            setRequirementData(newArr);
        }
    }   

    const formItemLayout = {
        labelCol: {
          xs: { span: 2 },
          sm: { span: 2 },
        },
        wrapperCol: {
          xs: { span: 4 },
          sm: { span: 4 },
        },
      };

    return(
        <div>
            <Form {...formItemLayout}>
                <Form.Item label='选择状态'>
                    <Select defaultValue='0' onChange={filterStatus}>
                        <Option value='0'>全部</Option>
                        <Option value='1'>待采纳</Option>
                        <Option value='2'>已采纳</Option>
                        <Option value='3'>已拒绝</Option>
                    </Select>
                </Form.Item>
            </Form>
             <List
                header={
                    <Row className="list-div">
                        <Col span={1}>
                            <b>序号</b>
                        </Col>
                        <Col span={2}>
                            <b>创建人</b>
                        </Col> 
                        <Col span={2}>
                            <b>创建时间</b>
                        </Col>
                        <Col span={10}>
                            <b>内容</b>
                        </Col>
                        <Col span={2}>
                            <b>需求状态</b>
                        </Col>
                        <Col span={4}>
                            <b>邮箱</b>
                        </Col>
                        <Col span={3}>
                            <b>操作</b>
                        </Col>
                    </Row>

                }
                bordered
                pagination={{
                    pageSize: 10,
                  }}
                dataSource={requirementData}
                renderItem={(item,index) => (
                    <List.Item>
                        <Row className="list-div">
                            <Col span={1}>
                                <b>{index+1}</b>
                            </Col>
                            <Col span={2}>
                                <b>{item.userName}</b>
                            </Col>
                            <Col span={2}>
                                <b>{moment(item.create_date*1000).format("YYYY-MM-DD")}</b>
                            </Col>
                            <Col span={10}>
                                <b>{item.requirement}</b>
                            </Col>
                            <Col span={2}>
                                <b className={'status'+`${item.statusId}`}>{item.status}</b>
                            </Col>
                            <Col span={4}>
                                <b>{item.email}</b>
                            </Col>
                            <Col span={3}>
                              <Button type="primary" onClick={()=>{changeStatus(item.id,item.status,item.statusId)}}>改变状态</Button>&nbsp;
                            </Col>
                        </Row>

                    </List.Item>
                )}
            />

            <Modal
                title="更改需求状态"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                >
                    <Select value={modalOption} style={{ width: '100%' }} onChange={handleChange}>
                        <Option value="1">待采纳</Option>
                        <Option value="2">已采纳</Option>
                        <Option value="3">已拒绝</Option>
                    </Select>
            </Modal>
        </div>
    )
}

export default RequirementList;