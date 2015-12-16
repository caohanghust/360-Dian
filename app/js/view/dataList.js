import React from 'react';
import Reflux from '../../../node_modules/reflux/src/index';
import Actions from './../appAction';
import Store from './../appStroe';
import Highcharts from '../../../node_modules/react-highcharts/dist/bundle/highcharts';

var DataList = React.createClass({
    mixins:[Reflux.connect(Store,'store')],
    componentDidMount:function(){
        Actions.getDataList();
    },
    render:function(){
        var averages = this.state.store.dataList.map(function(item){
            return item.average
        })
        var myscore = this.state.store.myscore;
        var config = {
            title: {
                text: '你的成绩分布',
                x: -20 //center
            },
            xAxis: {
                categories: ['1', '2', '3', '4', '5', '6','7']
            },
            yAxis: {
                title: {
                    text: '每题得分'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                name: '平均分',
                data: averages
            }, {
                name: '你的得分',
                data: myscore,
            }]
        };
        var content = <div>
            <h2 className="text-center">
                Dian团队大数据
            </h2>
            <div className="datalist">
                <div className="container">
                    <div className="col-xs-6">
                        <div className="col-xs-6">
                            <div className="panel panel-default data-box">
                                <div className="panel-heading">
                                    每周有效工作时间
                                </div>
                                <div className="panel-body">
                                    <p>平均时长：{(this.state.store.dataList[0].average * 2 + 5).toFixed(1)}小时</p>
                                    <p>最多时长：{(this.state.store.dataList[0].score * 2 + 5).toFixed(1)}小时({this.state.store.dataList[0].name})</p>
                                    <p>你的时长：{(myscore[0] *2 +5).toFixed(1) }小时</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-6">
                            <div className="panel panel-default data-box">
                                <div className="panel-heading">
                                    工作时效性和质量(20)
                                </div>
                                <div className="panel-body">
                                    <p>平均得分：{parseFloat(this.state.store.dataList[1].average).toFixed(1)}分</p>
                                    <p>最多得分：{parseFloat(this.state.store.dataList[1].score).toFixed(1)}分({this.state.store.dataList[1].name})</p>
                                    <p>你的得分：{parseFloat(myscore[1]).toFixed(1)}分</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="col-xs-6">
                            <div className="panel panel-default data-box">
                                <div className="panel-heading">
                                    承担额外项目主动性(10)
                                </div>
                                <div className="panel-body">
                                    <p>平均得分：{parseFloat(this.state.store.dataList[2].average).toFixed(1)}分</p>
                                    <p>最多得分：{parseFloat(this.state.store.dataList[2].score).toFixed(1)}分({this.state.store.dataList[2].name})</p>
                                    <p>你的得分：{parseFloat(myscore[2]).toFixed(1)}分</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-6">
                            <div className="panel panel-default data-box">
                                <div className="panel-heading">
                                    工作责任心(10)
                                </div>
                                <div className="panel-body">
                                    <p>平均得分：{parseFloat(this.state.store.dataList[3].average).toFixed(1)}分</p>
                                    <p>最多得分：{parseFloat(this.state.store.dataList[3].score).toFixed(1)}分({this.state.store.dataList[3].name})</p>
                                    <p>你的得分：{parseFloat(myscore[3]).toFixed(1)}分</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xs-6">
                        <div className="col-xs-6">
                            <div className="panel panel-default data-box">
                                <div className="panel-heading">
                                    个人影响力(10)
                                </div>
                                <div className="panel-body">
                                    <p>平均得分：{parseFloat(this.state.store.dataList[4].average).toFixed(1)}分</p>
                                    <p>最多得分：{parseFloat(this.state.store.dataList[4].score).toFixed(1)}分({this.state.store.dataList[4].name})</p>
                                    <p>你的得分：{parseFloat(myscore[4]).toFixed(1)}分</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-6">
                            <div className="panel panel-default data-box">
                                <div className="panel-heading">
                                    参加文化活动积极性(5)
                                </div>
                                <div className="panel-body">
                                    <p>平均得分：{parseFloat(this.state.store.dataList[5].average).toFixed(1)}分</p>
                                    <p>最多得分：{parseFloat(this.state.store.dataList[5].score).toFixed(1)}分({this.state.store.dataList[5].name})</p>
                                    <p>你的得分：{parseFloat(myscore[5]).toFixed(1)}分</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-6">
                            <div className="panel panel-default data-box">
                                <div className="panel-heading">
                                    技术贡献(5)
                                </div>
                                <div className="panel-body">
                                    <p>平均得分：{parseFloat(this.state.store.dataList[6].average).toFixed(1)}分</p>
                                    <p>最多得分：{parseFloat(this.state.store.dataList[6].score).toFixed(1)}分({this.state.store.dataList[6].name})</p>
                                    <p>你的得分：{parseFloat(myscore[6]).toFixed(1)}分</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xs-6">
                        <Highcharts config={config}/>
                    </div>

                </div>
            </div>
        </div>
        return content
    }
})
module.exports = DataList;