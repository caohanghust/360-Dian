import React from 'react';
import Reflux from '../../../node_modules/reflux/src/index';
import Actions from './../appAction';
import Store from './../appStroe';
import Highcharts from '../../../node_modules/react-highcharts/dist/bundle/highcharts';

var Person = React.createClass({
    getInitialState:function(){
        return {
            completed:this.props.data.impression_score!=0?true:false,
        }
    },
    handleChange:function(e){
        var value = e.target.value;
        if(value.length!=0){
            this.setState({completed:true})
        }
        else{
            value = '0';
        }
        Actions.submitImpression(this.props.data.username,value);
    },
    render:function(){
        var success = (this.state.completed?'has-success':'');
        return <div className={"person-box form-group "+success}>
            <div className="input-group">
                <span className="input-group-addon">{this.props.data.name}</span>
                <input type="text"
                       className="form-control success"
                       placeholder={this.props.data.impression_score}
                       onBlur={this.handleChange} />
            </div>
        </div>
    }
})
var Mentor = React.createClass({
    mixins:[Reflux.connect(Store,'store')],
    handleClick:function(e){
        var group_name = e.target.getAttribute('data-group');
        Actions.getGroupData(group_name);
    },
    render:function(){
        var impression = this.state.store.impression;
        var describes = ['时间','质量','主动性','责任心','影响力','文化活动','技术贡献'];
        if(impression.group_name.match('seed')){
            describes = ['课堂','课设','班级工作','责任心','影响力','文化活动','班级荣誉'];
        }
        var nameList = [];
        var scores = {
            q0:[],
            q1:[],
            q2:[],
            q3:[],
            q4:[],
            q5:[],
            q6:[]
        };
        impression.members.map(function(item){
            nameList.push(item.name);
            scores.q0.push(item.score[0]);
            scores.q1.push(item.score[1]);
            scores.q2.push(item.score[2]);
            scores.q3.push(item.score[3]);
            scores.q4.push(item.score[4]);
            scores.q5.push(item.score[5]);
            scores.q6.push(item.score[6]);
        })
        var config = {
            chart: {
                type: 'column'
            },
            title: {
                text: impression.group_name.match('seed')?'360种子班详细得分':'360项目组详细得分'
            },
            xAxis: {
                categories: nameList,
            },
            yAxis: {
                min: 0,
                title: {
                    text: '360项目组考核'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: 'gray'
                    }
                }
            },
            legend: {
                align: 'right',
                x: -70,
                verticalAlign: 'top',
                y: 20,
                floating: true,
                backgroundColor: 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                formatter: function() {
                    return '<b>'+ this.x +'</b><br/>'+
                        this.series.name +': '+ this.y +'<br/>'+
                        'Total: '+ this.point.stackTotal;
                }
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: 'white'
                    }
                }
            },
            series: [{
                name: describes[0],
                data: scores.q0,
            }, {
                name: describes[1],
                data: scores.q1,
            }, {
                name: describes[2],
                data: scores.q2,
            },{
                name: describes[3],
                data: scores.q3,
            }, {
                name: describes[4],
                data: scores.q4,
            }, {
                name: describes[5],
                data: scores.q5,
            },{
                name: describes[6],
                data: scores.q6,
            }]
        };
        return <div className='bounce animated'>
            <h2 className="text-center">
                导师专区
            </h2>
            <div className="captain">
                <div className="container">
                    <div className="col-xs-2">
                        <div className="sidebar">
                            <h3 className="text-center">
                                项目组
                            </h3>
                            <div className="list-group">
                                <a href='#' className="list-group-item " data-group='tzfx' onClick={this.handleClick}>特征分析组</a>
                                <a href='#' className="list-group-item " data-group='smartsan' onClick={this.handleClick}>smartSan组</a>
                                <a href='#' className="list-group-item " data-group='norway' onClick={this.handleClick}>挪威组</a>
                                <a href='#' className="list-group-item " data-group='uflt' onClick={this.handleClick}>uflt组</a>
                                <a href='#' className="list-group-item " data-group='winmac' onClick={this.handleClick}>winmac组</a>
                                <a href='#' className="list-group-item " data-group='xc' onClick={this.handleClick}>迅测组</a>
                                <a href='#' className="list-group-item " data-group='mobile' onClick={this.handleClick}>移动组</a>
                                <a href='#' className="list-group-item " data-group='yrxd' onClick={this.handleClick}>悦然心动组</a>
                                <a href='#' className="list-group-item " data-group='svti' onClick={this.handleClick}>svti组</a>

                                <a href='#' className="list-group-item " data-group='tech' onClick={this.handleClick}>技术部</a>
                                <a href='#' className="list-group-item " data-group='public' onClick={this.handleClick}>外联部</a>
                                <a href='#' className="list-group-item " data-group='admin' onClick={this.handleClick}>行政部</a>

                                <a href='#' className="list-group-item " data-group='finance' onClick={this.handleClick}>财务组</a>

                                <a href='#' className="list-group-item " data-group='seed12' onClick={this.handleClick}>12级种子班</a>
                                <a href='#' className="list-group-item " data-group='seed13' onClick={this.handleClick}>13级种子班</a>

                            </div>
                        </div>
                    </div>
                    <div className="col-xs-10">
                        <div className="impression">
                            <h3 className="text-center">{impression.group_name}组</h3>
                            <h5 className="text-center">请导师根据印象给各组组长打分（百分制）</h5>
                            {
                                impression.members.map(function(item){
                                    if(item.identity == 0){
                                        return <div className='col-xs-3'>
                                            <Person key={item.username} data={item}/>
                                        </div>
                                    }
                                })
                            }
                        </div>
                        <div className="group-chart">
                            <Highcharts config={config} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
})

module.exports = Mentor;