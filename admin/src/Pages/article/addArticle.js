import React,{useState,useEffect} from 'react';
import marked from 'marked';
import '../../Static/Css/addArticle.css';
import {Row,Col,Input,Button,Select,DatePicker,message} from 'antd';
import {getTypeInfo,addArticle,updateArticle,getArticleById} from '../../Config/httpRouter';
import moment from 'moment'
const { Option } = Select;
const { TextArea } = Input;

function AddArticle(props){
    const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle,setArticleTitle] = useState('')   //文章标题
    const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd,setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml,setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate,setShowDate] = useState()   //发布日期
    const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType,setSelectType] = useState("请选择类别") //选择的文章类别

    useEffect(()=>{
        getArticleType()
        // 获取文章Id
        let temId = props.match.params.id;
        if(temId){
            setArticleId(temId);
            findArticleById(temId);
        }
    },[])
    marked.setOptions({
        renderer:marked.Renderer(),
        gfm:true,
        pedantic:false,
        sanitize:false,
        tables:true,
        breaks:false,
        smartLists:true,
        smartypants:false,
    })

    //编写文章内容
    const changeContent = (e)=>{
        setArticleContent(e.target.value);
        let html = marked(e.target.value);
        setMarkdownContent(html);
    }
    
    //编写文章简介
    const changeIntroduce=(e)=>{
        setIntroducemd(e.target.value);
        let html = marked(e.target.value);
        setIntroducehtml(html);
    }

    const getArticleType=()=>{
        getTypeInfo().then((res)=>{
            if(res&&res.data.code===200){
                setTypeInfo(res.data.message);
            }else{
                message.error('获取文章列表失败')
            }
        })
    }

    const selectTypeHandler = (value)=>{
        setSelectType(value);
    }

    // 保存文章
    const saveArticle = ()=>{
        if(!selectedType || selectedType==="请选择类别"){
            message.error("必须选择文章类型")
            return false;
        }else if(!articleTitle){
            message.error("文章名称不能为空")
            return false;
        }else if(!articleContent){
            message.error("文章内容不能为空")
            return false;
        }else if(!introducemd){
            message.error("文章简介不能为空")
            return false;
        }else if(!showDate){
            message.error("发布日期不能为空")
            return false;
        }else{
          let dataProps = {}
          dataProps.type_id = selectedType;
          dataProps.title = articleTitle;
          dataProps.article_content = articleContent;
          dataProps.introduce = introducemd;
          let dataText = showDate.replace('-','/');
          dataProps.addTime  = (new Date(dataText).getTime())/1000;
            if(articleId===0){
                // 新增文章
                dataProps.view_count=0;
                addArticle(dataProps).then(res=>{
                    setArticleId(res.data.insertId)
                    if(res.data.code===200){
                        message.success("添加文章成功")
                    }else{
                        message.error("添加文章失败")
                    }
                    setArticleId(0);
                })
            }else{  
                // 修改文章
                dataProps.id = articleId;
                updateArticle(dataProps).then(res=>{
                    if(res.data.code===200){
                        message.success("更新文章成功");
                    }else{
                        message.error("更新文章失败")
                    }
                })
            }


        }
    };

    //  根据文章Id获取文章详细内容
    const findArticleById=(id)=>{
        let dataProps={id}
        getArticleById(dataProps).then(res=>{
            if(res && res.data.code === 200){
                let articleInfo = res.data.datas.data[0];
                setArticleTitle(articleInfo.title);
                setArticleContent(articleInfo.article_content);
                let html=marked(articleInfo.article_content);
                setMarkdownContent(html);
                setIntroducemd(articleInfo.introduce);
                let temInt = marked(articleInfo.introduce);
                setIntroducehtml(temInt);
                setShowDate(moment(articleInfo.addTime*1000).format("YYYY-MM-DD"));
                setSelectType(articleInfo.typeId);
            }else{
                message.error('获取文章信息失败')
            }
        })
    }




    return(
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={20}>
                            <Input placeholder="博客标题" onChange={(e)=>{setArticleTitle(e.target.value)}}
                             value={articleTitle}
                             size='large' />
                        </Col>
                        <Col span={4}> 
                            &nbsp;
                            <Select value={selectedType} size="large" onChange={selectTypeHandler}>
                                {
                                    typeInfo.map((item,index)=>{
                                        return (<Option key={index} value={item.id}>{item.typeName}</Option>)
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                    <br/>
                    <Row gutter={10}>
                        <Col span={12}>
                            <TextArea 
                                className='markdown-content'
                                rows={25}
                                placeholder="文章内容"
                                onChange={changeContent}
                                value={articleContent}
                            />
                        </Col>
                        <Col span={12}>
                            <div className='show-html'
                                dangerouslySetInnerHTML={{__html:markdownContent}}
                            ></div>
                        </Col>
                    </Row>

                </Col>
                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Button size='large'>暂存文章</Button>&nbsp;
                            <Button type='primary' size='large' onClick={saveArticle}>发布文章</Button>
                            <br/>
                        </Col>
                        <Col span={24}>
                            <br/>
                            <TextArea 
                            rows={4}
                            placeholder='文章简介'
                            value={introducemd}
                            onChange={changeIntroduce}
                            ></TextArea>
                            <br/>
                            <br/>
                            <div className='introduce-html'
                                dangerouslySetInnerHTML={{__html:introducehtml}}
                            ></div>
                        </Col>
                        <Col span={12}>
                            <div className='date-select'>
                                <DatePicker onChange={(date,dateString)=>{setShowDate(dateString)}}
                                    placeholder='发布日期'
                                    size='large'
                                />
                            </div>
                        </Col>
                    </Row>

                </Col>
            </Row>
        </div>
    )
}

export default AddArticle;