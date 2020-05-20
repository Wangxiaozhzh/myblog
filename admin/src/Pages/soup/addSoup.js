import React,{useEffect,useState} from 'react';
import {Form,Input,Button,message} from 'antd'
import { addSoupWord, editSoupWord, getSoupWordById } from '../../Config/httpRouter'

const {TextArea} = Input
const AddSoupForm = (props)=>{
    const [isLoading,setIsLoading] = useState(false);
    const [currentSoupId,setCurrentSoupId] = useState(0);

    useEffect(()=>{
        let temId = props.match.params.id;
        if(temId){
            findSoupById(temId);
            setCurrentSoupId(temId);
        }
    },[]);

    // 根据id获取鸡汤详情
    const findSoupById  = (id)=>{
        let dataId = {id};
        if(!dataId)return
        getSoupWordById(dataId).then(res=>{
            if(res&&res.data.code){
                console.log(res.data.message[0])
                let formData = {
                    soupword:res.data.message[0].content
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


      const saveSoup = (e)=>{
        e.preventDefault();
        props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            // console.log('Received values of form: ', values);
            setIsLoading(true);
            let dataProps = {content:values.soupword}
            if(currentSoupId!=0){
                dataProps.id=currentSoupId;
                editSoupWord(dataProps).then(res=>{
                    if(res&&res.data.code){
                        message.success('更改鸡汤成功')
                    }else{
                        message.error('更改鸡汤失败')
                    }
                    setIsLoading(false);
                })
            }else{
                addSoupWord(dataProps).then(res=>{
                    if(res&&res.data.code){
                        message.success('新增鸡汤成功')
                    }else{
                        message.error('新增鸡汤失败')
                    }
                    setIsLoading(false);
                })
            }






          }
        });
      }

    return (
        <Form {...formItemLayout}>
            <Form.Item label="新增鸡汤">
            {getFieldDecorator('soupword', {
                rules: [
                {
                    required: true,
                    message: '请输入鸡汤',
                },
                ],
            })(<TextArea />)}
            </Form.Item>
        
            <Form.Item {...tailFormItemLayout}>
            <Button loading={isLoading} type="primary" onClick={saveSoup}>
                确认
            </Button>
            </Form.Item>
      </Form>
    )
}

const WrappedAddSoupForm = Form.create({ name: 'register' })(AddSoupForm);
export default WrappedAddSoupForm;
