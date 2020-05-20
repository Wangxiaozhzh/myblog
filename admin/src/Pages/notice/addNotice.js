import React,{useEffect,useState} from 'react';
import {Form,Input,Button,Select,message} from 'antd'
import { addNotice, updateNoticeById, getNoticeById } from '../../Config/httpRouter'

const {TextArea} = Input
const { Option } = Select;

const AddNotcieForm = (props)=>{
    const [isLoading,setIsLoading] = useState(false);
    const [currentNoticeId,setCurrentNoticeId] = useState(0);

    useEffect(()=>{
        let temId = props.match.params.id;
        if(temId){
            findNoticeById(temId);
            setCurrentNoticeId(temId);
        }
    },[]);

    // 根据id获取公告详情
    const findNoticeById  = (id)=>{
        let dataId = {id};
        if(!dataId)return
        getNoticeById(dataId).then(res=>{
            if(res&&res.data.code){
                let isShow = res.data.message[0].isShow == 1 ? '显示' : "隐藏"
                let formData = {
                    notice:res.data.message[0].content,
                    status:isShow
                }
                 // 初始化表单中的数据
                 props.form.setFieldsValue(formData);
            }
        })
    }

    const { getFieldDecorator } = props.form;
    const formItemLayout = {
        labelCol: {
          xs: { span: 4 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 16 },
          sm: { span: 16 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 4,
          },
        },
      };


      const saveNotice = (e)=>{
        e.preventDefault();
        props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            setIsLoading(true);
            // console.log('Received values of form: ', values);
            let status
            if(isNaN(values.status)){
                status = values.status=='隐藏'? 2 : 1
            }else{
                status = values.status
            }
            let dataProps = {content:values.notice}
            if(currentNoticeId!=0){
                dataProps.id=currentNoticeId;
                dataProps.isShow = status;
                updateNoticeById(dataProps).then(res=>{
                    if(res&&res.data.code){
                        message.success('更改公告成功')
                    }else{
                        message.error('更改公告失败')
                    }
                    setIsLoading(false);
                })
            }else{
                addNotice(dataProps).then(res=>{
                    if(res&&res.data.code){
                        message.success('新增公告成功')
                    }else{
                        message.error('新增公告失败')
                    }
                    setIsLoading(false);
                })
            }
          }
        });
      }

    return (
        <Form {...formItemLayout}>
            <Form.Item 
                label="新增公告">
                {getFieldDecorator('notice', {
                    rules: [
                    {
                        required: true,
                        message: '请输入鸡汤',
                    },
                    ],
                })(<TextArea />)}
            </Form.Item>
            <Form.Item 
                label="公告状态" >
                {
                    getFieldDecorator('status',{
                        rules:[
                            {
                                required: true,
                                message: '请选择公告状态',
                            }
                        ]
                    })(<Select>
                        <Option value="1">显示</Option>
                        <Option value="2">隐藏</Option>
                    </Select>)
                }
                
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button loading={isLoading} type="primary" onClick={saveNotice}>
                    确认
                </Button>
            </Form.Item>
      </Form>
    )
}

const WrappedAddNotcieForm = Form.create({ name: 'AddNotcie' })(AddNotcieForm);
export default WrappedAddNotcieForm;
