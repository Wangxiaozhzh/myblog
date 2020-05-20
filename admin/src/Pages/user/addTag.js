import React,{useEffect,useState}  from 'react';
import { Form, Input, Icon, Button ,message} from 'antd';
import { getUserTags, addTag } from '../../Config/httpRouter'
import '../../Static/Css/addTag.css'

let initIndex = 0
const AddTagForm  = (props)=> {
        const [isLoading,setIsLoading] = useState(false);
        const [tagList,setTagList] = useState([]);
        useEffect(()=>{
            allTagList()
        },[]);
        // 获取标签列表
        const allTagList=()=>{
            const { form } = props;
            getUserTags().then(res=>{
                if(res && res.data.code===200){
                    let Tags = res.data.message[0].tags;
                    let tag = Tags.split('&')
                    setTagList(tag)
                    
                    // 初始化表单中的数据
                    let formData = {}
                    tag.forEach(item=>{
                        formData[item]=item
                    })
                    form.setFieldsValue(formData);
                }
            })
        }

        const remove = index => {
            console.log(index);
            let tempArray = JSON.parse(JSON.stringify(tagList));
            tempArray.splice(index,1);
            setTagList(tempArray);
        };

        const add = () => { 
            initIndex++;
            console.log(initIndex);
            let tempArray = JSON.parse(JSON.stringify(tagList));
            tempArray.push(initIndex);
            setTagList(tempArray);
        };  

        const handleSubmit = e => {
            e.preventDefault();
            props.form.validateFields((err, values) => {
                if (!err) {
                    setIsLoading(true)
                    // console.log('Received values of form: ', values);
                    let tagsArray = Object.values(values)
                    let tagStr = tagsArray.join('&')
                    let dataProps = {tags:tagStr}
                    addTag(dataProps).then(res=>{
                        if(res && res.data.code==200){
                            message.success('修改标签成功');
                        }else{
                            message.error('修改标签失败');
                        }
                        setIsLoading(false)
                    })
                    
                }
            });
        };

        const { getFieldDecorator } = props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
                },
                wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
                },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
                },
        };
       
        return (
            <Form>
                {
                    tagList.map((item,index)=>(
                        <Form.Item key={index}
                                label={'标签'+`${index+1}`}
                             {...formItemLayout}>
                                   {getFieldDecorator(`${item}`, {
                                        rules: [
                                        {
                                            required: true,
                                            message: '请输入你想添加的标签',
                                        },
                                        ],
                                    })(<Input 
                                        suffix={<Icon type="minus-circle-o"  className="dynamic-delete-button" onClick={()=>{remove(index)}} />} 
                                        style={{ width: '60%', marginRight: 8 }} />)}
                        </Form.Item> 
                    ))
                 
                }
                <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={add} style={{ width: '60%' }}>
                        <Icon type="plus" /> 新增标签
                    </Button>
                </Form.Item>
                <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button type="primary" loading={isLoading} onClick={handleSubmit}>保存</Button>
                </Form.Item>
            </Form>
        );
}

const WrappedAddTagForm = Form.create({ name: 'addTag' })(AddTagForm);
export default WrappedAddTagForm