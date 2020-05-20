import React,{useState} from 'react';
import {Upload, Icon, message,Button,Form,Input, Modal, Avatar} from 'antd';
import servicePath from '../../Config/apiUrl';
import {updateUserInfo} from '../../Config/httpRouter'
const useInfoForm = (props)=>{

    const [visible,setVisible] = useState(false);
    const [tempAvater,setTempAvater] = useState('');
    const [confirmPas,setConfirmPas] = useState('');
    const [newName,setNewName] = useState('');
    
    const prop = {
        name: 'file',
        // action: 'http://localhost:8080/upload/uploadAvator',
        action: servicePath.uploadAvator,
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            // console.log(info.file.response.filename);
            setTempAvater(info.file.response.filename);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };


    const { getFieldDecorator } = props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 10 },
        sm: { span: 10 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 14,
          offset: 0,
        },
        sm: {
          span: 10,
          offset: 4,
        },
      },
    };

    const changeUserInfo = (e)=>{
      e.preventDefault();
      props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
              setVisible(true);
              setNewName(values.userName);
            }
      })
    }

    const handleOk = ()=>{
      if(!confirmPas){
         message.error('请确认密码');
         return 
      }
      let dataProps = {
        name:newName,
        avatar:tempAvater,
        password:confirmPas
      }
      updateUserInfo(dataProps).then(res=>{
        if(res && res.data.code===200){
            localStorage.setItem('userAvatar',tempAvater);
            localStorage.setItem('userName',newName)
            message.success('修改用户信息成功')
            setVisible(false);

        }
      })
    }
    const handleCancel=()=>{
      setVisible(false);
    }



    return (
        <>     
               <Form {...formItemLayout}>
                    <Form.Item 
                        label="修改用户名">
                        {getFieldDecorator('userName', {
                            rules: [
                            {
                                required: true,
                                message: '请输入用户名',
                            },
                            ],
                        })(<Input  />)}
                    </Form.Item>
                    <Form.Item label="上传头像" >
                            <Upload {...prop}>
                                <Button>
                                <Icon type="upload" /> 点击上传头像
                                </Button>
                            </Upload>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button loading={false} type="primary" onClick={changeUserInfo}>
                            确认
                        </Button>
                    </Form.Item>
              </Form>
              
              <Modal
                title="请输入密码确认"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}  
              >
                <Input.Password  value={confirmPas} onChange={(e)=>{setConfirmPas(e.target.value)}} />
              </Modal>

        
        </>
    )
}
const UserSetting = Form.create({ name: 'useInfo' })(useInfoForm);
export default UserSetting;