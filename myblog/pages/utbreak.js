import React,{useEffect,useState}  from 'react';
import Head from 'next/head';
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Tabs,Row,Col ,Card,List,Select,Collapse} from 'antd';
import axios from  'axios';
import '../static/style/page/utbreak.css'
const { Option } = Select;
const { Panel } = Collapse;
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

// 官网已经不提供下载了，但是在依赖中都能找到
import 'echarts/map/js/china';
import 'echarts/map/js/world';
// 引入中引文对照的地图
import nameMap from '../config/wordMap'

const { TabPane } = Tabs;

const Utbreak = (data) => {

    // const [currentProvice,setCurrentPorvice] = useState(data[0].province);
    // const [chinaTotal,setChinaTotal] = useState(data[1].data.chinaTotal);
    // const [provinceList,setProvinceList] = useState(data[1].data.areaTree[2].children);
    // const [currentProviceData,setCurrentProviceData]  = useState({
    //     today: {confirm: '', suspect: '', heal: '', dead: ''},
    //     total: {confirm: '', suspect: '', heal: '', dead: ''}
    // })
    // const [allProvice,setAllProvice] = useState([]);
    // const [chinaDayList,setChinaList] = useState(data[1].data.chinaDayList);
    // const [otherCountry,setOtherCountry] = useState(data[1].data.areaTree)

    // // 循环遍历各省数据得到当前省数据
    // const getProviceData = (provice) =>{
    //     let arr = [];
    //     provinceList.forEach((item)=>{
    //         arr.push(item.name)
    //         if(provice.indexOf(item.name)>-1){
    //             setCurrentProviceData(item)
    //         }
    //     });
    //     setAllProvice(arr);
    // }
    // // 获取海外数据
    // const getOtherCountry = ()=>{
    //     let arr = []
    //     otherCountry.forEach(item=>{
    //         if(item.name!="中国"){
    //             arr.push(item)
    //         }
    //     })
    //     return arr
    // }
    
    // useEffect(()=>{
    //     new Promise((resolve)=>{
    //         getProviceData(currentProvice);
    //         resolve(true)
    //     }).then(()=>{
    //         chart1();   
    //         chart2();
    //         chart3();             
    //     })
    // },[])

    // const callback = ()=>{
    //     // 
    // }
    // // 选择省市
    // const handleChange = (value)=>{
    //     setCurrentPorvice(value);
    //     getProviceData(value);

    // }
    // // 中国疫情累积图
    // const chart1 = ()=>{
    //     let arr = [];
    //     provinceList.forEach((item)=>{
    //         arr.push({
    //                 name:item.name,
    //                 value:item.total.confirm
    //             })
    //     });
    //     let myChart1 = echarts.init(document.getElementById('ChinaNow'));
    //     // 绘制图表
    //     myChart1.setOption({
    //         tooltip: {
    //             triggerOn: "click",
    //             formatter: function(e, t, n) {
    //                 return .5 == e.value ? e.name + "：有疑似病例" : e.seriesName + "<br />" + e.name + "：" + e.value
    //             }
    //         },
    //         visualMap: {
    //             min: 0,
    //             max: 10000,
    //             left: 26,
    //             bottom: 40,
    //             showLabel: !0,
    //             text: ["高", "低"],
    //             pieces: [{
    //                 gt: 10000,
    //                 label: "> 10000 人",
    //                 color: "#7f1100"
    //             }, {
    //                 gte: 1000,
    //                 lte: 9999,
    //                 label: "1000 - 9999 人",
    //                 color: "#bd1316"
    //             }, {
    //                 gte: 500,
    //                 lt: 999,
    //                 label: "500 - 999 人",
    //                 color: "#e64b45"
    //             }, 
    //             {
    //                 gte: 100,
    //                 lt: 499,
    //                 label: "100 - 499 人",
    //                 color: "#ff8c71"
    //             },
    //             {
    //                 gte: 10,
    //                 lt: 99,
    //                 label: "10 - 99 人",
    //                 color: "#fdd2a0"
    //             },{
    //                 gt: 0,
    //                 lt: 9,
    //                 label: "0 - 9 人",
    //                 color: "#ffd768"
    //             }, {
    //                 value: 0,
    //                 color: "#ffffff"
    //             }],
    //             show: !0
    //         },
    //         geo: {
    //             map: "china",
    //             roam: !1,
    //             scaleLimit: {
    //                 min: 1,
    //                 max: 2
    //             },
    //             zoom: 1.23,
    //             top: 120,
    //             label: {
    //                 normal: {
    //                     show: !0,
    //                     fontSize: "14",
    //                     color: "rgba(0,0,0,0.7)"
    //                 }
    //             },
    //             itemStyle: {
    //                 normal: {
    //                     //shadowBlur: 50,
    //                     //shadowColor: 'rgba(0, 0, 0, 0.2)',
    //                     borderColor: "rgba(0, 0, 0, 0.2)"
    //                 },
    //                 emphasis: {
    //                     areaColor: "#f2d5ad",
    //                     shadowOffsetX: 0,
    //                     shadowOffsetY: 0,
    //                     borderWidth: 0
    //                 }
    //             }
    //         },
    //         series: [{
    //             name: "累积确诊病例",
    //             type: "map",
    //             geoIndex: 0,
    //             data:arr
    //         }]
    //     });
    // }
    // // 世界疫情图
    // const chart2 = ()=>{
    //     let arr = [];
    //     otherCountry.forEach((item)=>{
    //         for(let key in nameMap){
    //             if(nameMap[key]==item.name){
    //                 arr.push({
    //                     name:key,
    //                     value:item.total.confirm
    //                 })
    //             }
    //         }
    //     })
    //     let myChart2 = echarts.init(document.getElementById('WorldNow'));
    //     // 绘制图表
    //     myChart2.setOption({
    //         tooltip: {
    //             triggerOn: "click",
    //             formatter: function(e, t, n) {
    //                 return .5 == e.value ? e.name + "：有疑似病例" : e.seriesName + "<br />" + e.name + "：" + e.value
    //             }
    //         },
    //         visualMap: {
    //             min: 0,
    //             max: 1000,
    //             left: 26,
    //             bottom: 40,
    //             showLabel: !0,
    //             text: ["高", "低"],
    //             pieces: [{
    //                 gt: 10000,
    //                 label: "> 10000 人",
    //                 color: "#7f1100"
    //             }, {
    //                 gte: 1000,
    //                 lte: 9999,
    //                 label: "1000 - 9999 人",
    //                 color: "#bd1316"
    //             }, {
    //                 gte: 500,
    //                 lt: 999,
    //                 label: "500 - 999 人",
    //                 color: "#e64b45"
    //             }, 
    //             {
    //                 gte: 100,
    //                 lt: 499,
    //                 label: "100 - 499 人",
    //                 color: "#ff8c71"
    //             },
    //             {
    //                 gte: 10,
    //                 lt: 99,
    //                 label: "10 - 99 人",
    //                 color: "#fdd2a0"
    //             },{
    //                 gt: 0,
    //                 lt: 9,
    //                 label: "0 - 9 人",
    //                 color: "#ffd768"
    //             }, {
    //                 value: 0,
    //                 color: "#ffffff"
    //             }],
    //             show: !0
    //         },
    //         geo: {
    //             map: "world",
    //             roam: !1,
    //             scaleLimit: {
    //                 min: 1,
    //                 max: 2
    //             },
    //             zoom: 1.23,
    //             top: 120,
    //             label: {
    //                 normal: {
    //                     show: 0,
    //                     fontSize: "14",
    //                     color: "rgba(0,0,0,0.7)"
    //                 }
    //             },
    //             itemStyle: {
    //                 normal: {
    //                     //shadowBlur: 50,
    //                     //shadowColor: 'rgba(0, 0, 0, 0.2)',
    //                     borderColor: "rgba(0, 0, 0, 0.2)"
    //                 },
    //                 emphasis: {
    //                     areaColor: "#f2d5ad",
    //                     shadowOffsetX: 0,
    //                     shadowOffsetY: 0,
    //                     borderWidth: 0
    //                 }
    //             }
    //         },
    //         series: [{
    //             name: "累积确诊病例",
    //             type: "map",
    //             geoIndex: 0,
    //             data: arr
    //         }]
    //     });
    // }

    // // 中国新增趋势图
    // const chart3  = ()=>{

    //     let dateArr = [];
    //     let confirmArr = []; 
    //     let healArr = [];
    //     let suspectArr = [];
    //     let deadArr = [];
    //     chinaDayList.forEach((item)=>{
    //         dateArr.push(item.date);
    //         confirmArr.push(item.today.confirm);
    //         healArr.push(item.today.heal);
    //         suspectArr.push(item.today.suspect);
    //         deadArr.push(item.today.dead);
    //     })

    //     let myChart3 = echarts.init(document.getElementById('ChinaTrend'));
    //     myChart3.setOption({
    //         title: {
    //             text: ''
    //         },
    //         tooltip: {
    //             trigger: 'axis'
    //         },
    //         legend: {
    //             data: ['确诊', '治愈', '疑似', '死亡']
    //         },
    //         grid: {
    //             left: '3%',
    //             right: '4%',
    //             bottom: '3%',
    //             containLabel: true
    //         },
    //         toolbox: {
    //             feature: {
    //                 saveAsImage: {}
    //             }
    //         },
    //         xAxis: {
    //             type: 'category',
    //             boundaryGap: false,
    //             data: dateArr
    //         },
    //         yAxis: {
    //             type: 'value'
    //         },
    //         series: [
    //             {
    //                 name: '确诊',
    //                 type: 'line',
    //                 stack: '总量',
    //                 data: confirmArr
    //             },
    //             {
    //                 name: '治愈',
    //                 type: 'line',
    //                 stack: '总量',
    //                 data: healArr
    //             },
    //             {
    //                 name: '疑似',
    //                 type: 'line',
    //                 stack: '总量',
    //                 data: suspectArr
    //             },
    //             {
    //                 name: '死亡',
    //                 type: 'line',
    //                 stack: '总量',
    //                 data: deadArr
    //             }
    //         ]
    //     })
        
        
    // }
    // return (
    //     <div className="utbreak">
    //         <Head>
    //             <title>新冠疫情</title>
    //             <link rel='icon' href='/favicon.ico' />
    //         </Head>
    //         <Header />
    //         <div className="main-div">
    //             <div className="card-container">
    //                 <Tabs defaultActiveKey="1" onChange={callback}>
    //                     <TabPane tab="全国疫情数据(含港澳台)" key="1">
    //                         <Row>
    //                             <Col xs={8}>
    //                                 <div className='cover'>
    //                                     <div className="cover_input">
    //                                         <h4>境外输入</h4>
    //                                         <div className="number">{chinaTotal.total.input}</div>
    //                                         <p className="added" style={{display:'block'}}>较昨日<span>+{chinaTotal.today.input}</span></p>
    //                                     </div>                     
    //                                     <div className="cover_confirm">
    //                                         <h4>累计确诊</h4>
    //                                         <div className="number">{chinaTotal.total.confirm}</div>
    //                                         <p className="added" style={{display:'block'}}>较昨日<span>+{chinaTotal.today.confirm}</span></p>
    //                                     </div> 
    //                                 </div>
    //                             </Col>
    //                             <Col xs={8}>
    //                                 <div className='cover'>
    //                                     <div className="cover_nosymptom">
    //                                         <h4>无症状感染者</h4>
    //                                         <div className="number">{chinaTotal.extData.noSymptom}</div>
    //                                         <p className="added" style={{display:'block'}}>较昨日<span>+{chinaTotal.extData.incrNoSymptom}</span></p>
    //                                     </div>                    
    //                                     <div className="cover_dead">
    //                                         <h4>累计死亡</h4>
    //                                         <div className="number">{chinaTotal.total.dead}</div>
    //                                         <p className="added" style={{display:'block'}}>较昨日<span>+{chinaTotal.today.dead}</span></p></div>
    //                                     </div>
    //                             </Col>
    //                             <Col xs={8}>
    //                                 <div className='cover'>
    //                                     <div className="cover_today_confirm">
    //                                         <h4>现有确诊</h4>
    //                                         <div className="number">{chinaTotal.total.confirm-chinaTotal.total.dead-chinaTotal.total.heal}</div>
    //                                         <p className="added" style={{display:'block'}}>较昨日<span>{chinaTotal.today.storeConfirm}</span></p>
    //                                     </div>                    
    //                                     <div className="cover_heal">
    //                                         <h4>累计治愈</h4>
    //                                         <div className="number">{chinaTotal.total.heal}</div>
    //                                         <p className="added" style={{display:'block'}}>较昨日<span>+{chinaTotal.today.heal}</span></p>
    //                                     </div> 
    //                                 </div>
    //                             </Col>
    //                         </Row>
    //                     </TabPane>

    //                     <TabPane tab={`${currentProvice}疫情数据`} key="2">
    //                         <Row>
    //                             <Col xs={8}>
    //                                 <div className='cover'>
    //                                     <div className="cover_province_confirm">
    //                                         <h4>累计确诊</h4>
    //                                         <div className="number">{currentProviceData.total.confirm}</div>
    //                                         <p className="added" style={{display:'block'}}>较昨日<span>+{currentProviceData.today.confirm}</span></p>
    //                                     </div>
    //                                 </div>
    //                             </Col>
    //                             <Col xs={8}>
    //                                 <div className='cover'>
    //                                     <div className="cover_province_dead">
    //                                         <h4>累计死亡</h4>
    //                                         <div className="number">{currentProviceData.total.dead}</div>
    //                                         <p className="added" style={{display:'block'}}>较昨日<span>+{currentProviceData.today.dead}</span></p>
    //                                     </div>
    //                                 </div>
    //                             </Col>
    //                             <Col xs={8}>
    //                                 <div className='cover'>
    //                                     <div className="cover_province_heal">
    //                                         <h4>累计治愈</h4>
    //                                         <div className="number">{currentProviceData.total.heal}</div>
    //                                         <p className="added" style={{display:'block'}}>较昨日<span>+{currentProviceData.today.heal}</span></p>
    //                                     </div>
    //                                 </div>
    //                             </Col>
    //                             <Col>
    //                                 <div style={{textAlign:'center',margin:'20px'}}>
    //                                     <Select defaultValue={currentProviceData.name} style={{ width: 200 }} onChange={handleChange}>
    //                                         {allProvice.map((item,index)=>(
    //                                             <Option key={index} value={item}>{item}</Option>
    //                                         ))}
    //                                     </Select>
    //                                 </div>
    //                             </Col>
    //                         </Row>
    //                     </TabPane>
    //                 </Tabs>
                
    //                 <Row>
    //                     <Col xs={24}>
    //                          <div>
    //                             <Card title='中国疫情图'> 
    //                                 <div style={{height:'1000px',width:'100%'}} id='ChinaNow'></div>
    //                             </Card>
    //                         </div>
    //                     </Col>
    //                     <Col xs={24}>
    //                         <div>
    //                             <Card title='全国疫情新增趋势'> 
    //                                 <div style={{height:'600px',width:'100%'}} id='ChinaTrend'></div>
    //                             </Card>
    //                         </div>
    //                     </Col>
    //                     <Col xs={24}>
    //                         <div>
    //                             <Card title='中国病例'> 
    //                                 <div style={{width:'100%'}} id='provinceNum'>
    //                                     <Row className="provinceNumTitle">
    //                                         <Col span={8}>
    //                                             <b>地区</b>
    //                                         </Col>
    //                                         <Col span={4}>
    //                                             <b>新增确诊</b>
    //                                         </Col>
    //                                         <Col span={4}>
    //                                             <b>确诊</b>
    //                                         </Col>
    //                                         <Col span={4}>
    //                                             <b>死亡</b>
    //                                         </Col>
                    
    //                                         <Col span={4}>
    //                                             <b>治愈</b>
    //                                         </Col>
    //                                     </Row>
                                        
    //                                     <Collapse onChange={callback}>
    //                                         {
    //                                             provinceList.map((item,index)=>(
    //                                                 <Panel 
    //                                                     key={index} 
    //                                                     header={
    //                                                         <Row className="list-div">
    //                                                             <Col span={8}>
    //                                                                 <b>{item.name}</b>
    //                                                             </Col>
    //                                                             <Col span={4}>
    //                                                                 <b>{item.today.confirm}</b>
    //                                                             </Col>
    //                                                             <Col span={4}>
    //                                                                 <b>{item.total.confirm}</b>
    //                                                             </Col>
    //                                                             <Col span={4}>
    //                                                                 <b>{item.total.dead}</b>
    //                                                             </Col>
    //                                                             <Col span={4}>
    //                                                                 <b>{item.total.heal}</b>
    //                                                             </Col>
    //                                                         </Row>
    //                                                 }>
    //                                                     <List 
    //                                                         dataSource={item.children}
    //                                                         renderItem={e => (
    //                                                             <List.Item>
    //                                                                 <Row className="list-div" style={{width:'100%'}}>
    //                                                                     <Col span={8}>{e.name}</Col>
    //                                                                     <Col span={4}>{e.today.confirm}</Col>
    //                                                                     <Col span={4}>{e.total.confirm}</Col>
    //                                                                     <Col span={4}>{e.total.dead}</Col>
    //                                                                     <Col span={4}>{e.total.dead}</Col>
    //                                                                 </Row>
    //                                                             </List.Item>
    //                                                         )}
    //                                                     />
    //                                                 </Panel>
    //                                             ))
    //                                         }
    //                                     </Collapse>
    //                                 </div>
    //                             </Card>
    //                         </div>
    //                     </Col>
    //                 </Row>
    //                 <Row>
    //                     <Col xs={24}>
    //                         <div>
    //                             <Card title='世界疫情图'> 
    //                                 <div style={{height:'1000px',width:'100%'}} id='WorldNow'></div>
    //                             </Card>
    //                         </div>
    //                     </Col>
    //                     <Col xs={24}>
    //                         <div>
    //                             <Card title='海外病例'> 
    //                                 <div style={{width:'100%'}} id='wordStutas'>
    //                                     <List
    //                                         header={
    //                                             <Row className="list-div">
    //                                                 <Col span={8}>
    //                                                     <b>地区</b>
    //                                                 </Col>
    //                                                 <Col span={4}>
    //                                                     <b>新增确诊</b>
    //                                                 </Col>
    //                                                 <Col span={4}>
    //                                                     <b>确诊</b>
    //                                                 </Col>
    //                                                 <Col span={4}>
    //                                                     <b>死亡</b>
    //                                                 </Col>
                            
    //                                                 <Col span={4}>
    //                                                     <b>治愈</b>
    //                                                 </Col>
    //                                             </Row>
    //                                         }
    //                                         bordered
    //                                         dataSource={getOtherCountry()}
    //                                         renderItem={item => (
    //                                             <List.Item>
    //                                                 <Row className="list-div" style={{width:'100%'}}>
    //                                                     <Col span={8}>{item.name}</Col>
    //                                                     <Col span={4}>{item.today.confirm}</Col>
    //                                                     <Col span={4}>{item.total.confirm}</Col>
    //                                                     <Col span={4}>{item.total.dead}</Col>
    //                                                     <Col span={4}>{item.total.dead}</Col>
    //                                                 </Row>
    //                                             </List.Item>
    //                                         )}
    //                                         />
    //                                 </div>
    //                             </Card>
    //                         </div>
    //                     </Col>
    //                 </Row>
    //             </div>
    //         </div>
    //         <p style={{textAlign:'center'}}>以上数据来源于网易163接口</p>
    //        <Footer />
    //     </div>
    // )

    return(
        <div className="utbreak">
             <Head>
                 <title>关注新冠疫情</title>
                 <link rel='icon' href='/favicon.ico' />
             </Head>
            <Header />
            <div className="main-div">
                <iframe src="https://news.qq.com/zt2020/page/feiyan.htm" style={{height:'1920px',width:'100%'}}></iframe>
            </div>
            <div style={{textAlign:'center'}}>
                <h4>以上数据及效果图均来源于腾讯新闻</h4>
            </div>
            <Footer />
        </div>
    )
}

// Utbreak.getInitialProps = async () => {
//     const promise1 = new Promise((resolve)=>{
//         axios('https://restapi.amap.com/v3/ip?key=5d4f44cc1c21f6ce7c0e609375f383bb').then(res=>{
//             // console.log(res);
            
//             resolve(res.data)
//         })
//     })

//     // 获取疫情数据
//     const promise2 = new Promise((resolve)=>{
//         axios('https://c.m.163.com/ug/api/wuhan/app/data/list-total').then(res=>{
//             console.log(res);
//             resolve(res.data);
//         })
//     })
//     const allData = Promise.all([promise1,promise2])
//     return await allData
// }

export default Utbreak;