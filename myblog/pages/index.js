import React from 'react'
import Head from 'next/head'
import { Select,Input,Row ,Col} from 'antd';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../static/style/page/index.css';
import Billboard from '../components/Billboard';
import Box from '../components/Box';
import Recommended from '../components/Recommended';
import Author from '../components/Author';
import Weather from '../components/Weather';
import indexData from '../data/indexData';
const { Option } = Select;
const { Search } = Input;
const Home = () => {  

  // 引入首页的数据
  const {SearchData,technicalCommunity,framework,UIFramework,classFramework,CssData,Icon,Design} = indexData;
  let str ='https://www.baidu.com/s?wd=';
  const handleChange = (value)=>{
    switch (value) {
      case "baidu":
        str = 'https://www.baidu.com/s?wd=';
        break;
      case "google":
        str = 'https://www.google.com/search?q=';
        break;
      case "github":
        str = 'https://github.com/search?q=';
        break;
      case "oschina":
        str = 'https://www.oschina.net/search?scope=all&q=';
        break;
      case "juejin":
        str = 'https://juejin.im/search?query=';
        break;
      case "csdn":  
        str = 'https://so.csdn.net/so/search/s.do?q=';
        break;
      case "zhihu":
        str = 'https://www.zhihu.com/search?q=';
        break;
      default:
        str = 'https://www.baidu.com/s?wd=';
    }
  }
  const onSearch = (value)=>{
    window.open(str+value,"_blank");
  }

  return(
      <div>
        <Head>
          <title>壮士，找点什么</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Header />
        <div className="searchDiv">
            <div className="select-div">
                <Select defaultValue="baidu" size='large'  onChange={handleChange}>
                  <Option value="baidu"><img className="optionImg" src='../static/images/baidu-logo.png'  alt='baidu' /></Option>
                  <Option value="google"><img className="optionImg" src='../static/images/google-logo.png'  alt='google' /></Option>
                  <Option value="github"><img className="optionImg" src='../static/images/github-logo.png'  alt='github' /></Option>
                  <Option value="oschina"><img className="optionImg" src='../static/images/oschina-logo.png'  alt='oschina' /></Option>
                  <Option value="juejin"><img className="optionImg" src='../static/images/juejin-logo.png'  alt='juejin' /></Option>
                  <Option value="csdn"><img className="optionImg" src='../static/images/csdn-logo.png'  alt='csdn' /></Option>
                  <Option value="zhihu"><img className="optionImg" src='../static/images/zhihu-logo.png'  alt='zhihu' /></Option>
                </Select>
            </div>
            <div className="search-div">
              <Search
                placeholder="输入你想要搜索的内容"
                enterButton="Search"
                size="large"
                onSearch={(value)=>{onSearch(value)}}
              />
            </div>
            
        </div>
        <div className="main-div">
            <Row className="tool-div">
                  {
                    SearchData.map((item,index)=>(
                      <Col key={index} xs={8} sm={6} md={4}>
                        <a href={item.adress} target='_blank' className="linkItem"> 
                          <img src={item.src} />&nbsp;&nbsp;&nbsp;
                          <span>{item.title}</span>
                        </a>
                      </Col>
                    ))
                  }
              </Row>
              <Row className="cont-div" type='flex' justify='center'>
                <Col xs={0} sm={0} md={7}>
                  <div style={{marginRight:'1rem'}}>
                    <Billboard/>
                    <Author />
                    <Recommended />
                    <Weather />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={17}>
                  <Box title='技术社区' itemList = {technicalCommunity}/>
                  <Box title='框架' itemList = {framework}/>
                  <Box title='UI框架' itemList = {UIFramework}/>
                  <Box title='类库' itemList = {classFramework}/>
                  <Box title='CSS' itemList = {CssData}/>
                  <Box title='小图标' itemList = {Icon}/>
                  <Box title='设计' itemList = {Design}/>
                </Col>
              </Row>
        </div>
        <Footer />
      </div>
  )
}

export default Home
