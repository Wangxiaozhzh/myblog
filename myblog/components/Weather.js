import React, { useEffect,useState } from 'react';
import {Tabs,Tag,Input,Row,Col} from 'antd';
import axios from 'axios'
const { TabPane } = Tabs;
const { Search } = Input;
import '../static/style/component/weather.css'
const Weather = ()=>{
    
    const callback = (key)=>{
        // console.log(key);
        // console.log(weekWeaStatus[0].day)
    }
    const [todayWeaStatus,setTodayWeaStatus] = useState({})
    const [cityStatus,setCityStatus] = useState({})
    const [weekWeaStatus,setWeekWeaStatus] = useState([])
    let city='';
    useEffect(()=>{
        getWeekWeather(city);
    },[])


    const selectCity=(value)=>{
        if(!value) return
        console.log(value);
        city=value;
        new Promise((resolve)=>{
            resolve(value);
        }).then((data)=>{
            getWeekWeather(data);
        })
    }
    // 获取一周天气
    const getWeekWeather = (city)=>{
        axios({
            url:'https://www.tianqiapi.com/api?version=v1&appid=83158319&appsecret=FkPzNen7&&city='+city,
        }).then(res=>{
            setCityStatus(res.data);
            setTodayWeaStatus(res.data.data[0]);
            setWeekWeaStatus(res.data.data)
        })
    }
    return(
        <div className="box">
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="今日天气" key="1">
                    <div>
                        <Search placeholder='请输入你想查询的城市:如北京、上海' enterButton  onSearch={selectCity} />
                    </div>
                    <Row>
                        <Col xs={7}>当前城市:</Col>
                        <Col xs={17 }><Tag color="magenta">{cityStatus.city}</Tag></Col>
                    </Row>
                    <Row>
                        <Col xs={7}>实况:</Col>
                        <Col xs={17}><Tag color="red">{cityStatus.update_time}</Tag></Col>
                    </Row>
                    <Row>
                        <Col xs={7}>天气情况:</Col>
                        <Col xs={17}><Tag color="volcano">{todayWeaStatus.wea}</Tag></Col>
                    </Row>
                    <Row>
                        <Col xs={7}>实时温度:</Col>
                        <Col xs={17}><Tag color="orange">{todayWeaStatus.tem}</Tag></Col>
                    </Row>
                    <Row>
                        <Col xs={7}>高温:</Col>
                        <Col xs={17}><Tag color="gold">{todayWeaStatus.tem1}</Tag></Col>
                    </Row>
                    <Row>
                        <Col xs={7}>低温:</Col>
                        <Col xs={17}><Tag color="lime">{todayWeaStatus.tem2}</Tag></Col>
                    </Row>
                    <Row>
                        <Col xs={7}>湿度:</Col>
                        <Col xs={17}><Tag color="green">{todayWeaStatus.humidity}%</Tag></Col>
                    </Row>
                    <Row>
                        <Col xs={7}>空气质量:</Col>
                        <Col xs={17}><Tag color="cyan">{todayWeaStatus.air}</Tag></Col>
                    </Row>
                    <Row>
                        <Col xs={7}>空气质量描述:</Col>
                        <Col xs={17}>{todayWeaStatus.air_tips}</Col>
                    </Row>
                    
                </TabPane>
                <TabPane tab="查看本周天气" key="2">
                    <div>
                        <Search placeholder='请输入你想查询的城市:如北京、上海' enterButton  onSearch={selectCity} />
                    </div>
                    <Row className="colorDiv" style={{marginTop:"10px"}}>
                        {weekWeaStatus.map((item,index)=>(
                            <Col xs={12} key={index}>
                                <div className="weekWea">
                                    <div>{item.day}</div>
                                    <div>天气情况:{item.wea}</div>
                                    <div>实时温度:{item.tem}</div>
                                    <div>高温{item.tem1}</div>
                                    <div>低温:{item.tem2}</div>
                                    <div>
                                    {
                                        item.win.map((item,index)=>(
                                            <span key={index}>{item} &nbsp;</span>
                                        ))
                                    }
                                    </div>
                                    <div>风速:
                                        {item.win_speed}
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </TabPane>
            </Tabs>
        </div>
    )
}
export default Weather;