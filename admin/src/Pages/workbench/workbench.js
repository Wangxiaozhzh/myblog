import React ,{useState,useEffect} from 'react';
import {Row,Col,Card} from 'antd';
import {getArticleList,getSoupWord,getRequirementsInfo,getArticleRankList} from '../../Config/httpRouter';
import '../../Static/Css/workbench.css';
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
import  'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

const Workbench = ()=>{

    const [blogCount,setBlogCount] = useState(0);
    const [viewCount,setViewCount] = useState(0);
    const [soupCount,setSoupCount] = useState(0);

    useEffect(()=>{
        getArticleInfo();
        getSoupInfo();
        getRequirements();
        getBlogRank();
    },[])

    // 获取文章列表
    const getArticleInfo = () =>{
        return new Promise((resolve)=>{
            getArticleList().then(res=>{
                if(res&&res.data.code===200){
                    let blogArticleList = res.data.data;
                    setBlogCount(blogArticleList.length);
                    let count=0;
                    let blogArticle = {}
                    blogArticleList.forEach(item=>{
                        count+=item.view_count;
                        if(blogArticle[item.typeName]){
                            blogArticle[item.typeName]++;
                        }else{
                            blogArticle[item.typeName]=1
                        }
                    });
                    setViewCount(count);
                    resolve(blogArticle)
                }
            })
        }).then(data=>{
            blogTypeChart(data);

        })
       
    }

    // 获取鸡汤信息
    const getSoupInfo = () => {
        getSoupWord().then(res=>{
            if(res&&res.data.code==200){
                setSoupCount(res.data.message.length);
            }
        })
    }
     // 获取需求信息
     const getRequirements = () => {
        return new Promise((resolve)=>{
            getRequirementsInfo().then(res=>{
                if(res&&res.data.code==200){
                    let requirementInfo = res.data.message;
                    let requirements = {};
                    requirementInfo.forEach(item=>{
                        if(requirements[item.status]){
                            requirements[item.status]++;
                        }else{
                            requirements[item.status]=1
                        }
                    })
                    resolve(requirements);
                }
            })
        }).then(data=>{
            requirementChart(data);
        })
    }

    // 获取排行榜数据
    const getBlogRank = ()=>{
        return new Promise((resolve)=>{
            getArticleRankList().then(res=>{
                if(res && res.data.code===200){
                    let blogRank =res.data.message;
                    resolve(blogRank)
                }
            })
        }).then(data=>{
            hotBlogChart(data);
        })
    }

    const requirementChart = (requirementData)=>{
        
        let elDom = document.getElementById('requirement');
        let myChart
        if(elDom){
            myChart = echarts.init(document.getElementById('requirement'));
            window.addEventListener('resize',()=>{
                myChart.resize();
            })
            // 绘制图表
            myChart.setOption({
                title: { text: '' },
                tooltip: {},
                xAxis: {
                    data: Object.keys(requirementData)
                },
                yAxis: {},
                series: [{
                    name: '数量',
                    type: 'bar',
                    barWidth : 100,//柱图宽度
                    data: Object.values(requirementData),
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                //定义柱状图颜色注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                                var colorList = ['#22dc86','#1565c0', '#f44336'];
                                return colorList[params.dataIndex]
                            }
                        }
                    }
                }]
            });
        }
    }


    const blogTypeChart = (blogData)=>{
        let arr = [];
        for(let k in blogData){
            arr.push({
                    name:k,
                    value:blogData[k]
                })
        }
        let elDom = document.getElementById('blogType');
        let myChart;
        if(elDom){
            myChart = echarts.init(elDom);
            window.addEventListener('resize',()=>{
                myChart.resize();
            });
                    // 绘制图表
            myChart.setOption({
                title: {
                    text: '博客文章类型',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: Object.keys(blogData)
                },
                series: [
                    {
                        name: '博客类型',
                        type: 'pie',
                        radius: '80%',
                        center: ['50%', '55%'],
                        data: arr,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            });
        }
    }

    const hotBlogChart = (blogRankData)=>{
        let blogTitleArr = []
        let blogDataeArr = []
        for(let j in blogRankData){
            blogTitleArr.push(blogRankData[j].title);
            blogDataeArr.push(blogRankData[j].view_count)
        }
        let elDom = document.getElementById('hotBlog');
        let myChart;
        if(elDom){
            myChart = echarts.init(elDom);
            window.addEventListener('resize',()=>{
                myChart.resize();
            })
                    // 绘制图表
            myChart.setOption({
                title: {
                    text: '',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['阅读量']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    name: '阅读量',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    name:'博客名称',
                    data: blogTitleArr
                },
                series: [
                    {
                        type: 'bar',
                        data: blogDataeArr,
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    //定义柱状图颜色注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                                    var colorList = ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83', '#ca8622'];
                                    return colorList[params.dataIndex]
                                }
                            }
                        }
                    }
                ]
            });
        }
    }
    return (
        <div>
            {/*数据快照 */}
            <Row>
                <Col xs={24}>
                    <Card title="数据快照" bordered={false} >
                        <div className='dataSnapshot'>
                            <div>
                                <Card title='博客总数'>
                                    <p>{blogCount}</p>
                                </Card>
                            </div>
                            <div>
                                <Card title='博客总访问数'>
                                    <p>{viewCount}</p>
                                </Card>
                            </div>
                            <div>
                                <Card title='鸡汤总数'>
                                    <p>{soupCount}</p>
                                </Card>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* 需求统计 */}

            <Row>
                <Col xs={24}>
                    <Card title="需求状态显示" bordered={false} >
                        <div id='requirement' style={{ width: '100%', height: 500 }}></div>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col xs={24}>
                    <Card title="博客统计" bordered={false} >
                        <div id='blogType' style={{ width: '100%', height: 500 }}></div>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col xs={24}>
                    <Card title="热门博文阅读量统计" bordered={false} >
                        <div id='hotBlog' style={{ width: '100%', height: 600 }}></div>
                    </Card>
                </Col>
            </Row>



        </div>
    )
}
export default Workbench;