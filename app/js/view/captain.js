import React from 'react';
import Reflux from '../../../node_modules/reflux/src/index';
import Actions from './../appAction';
import Store from './../appStroe';
import Highcharts from '../../../node_modules/react-highcharts/dist/bundle/highcharts';

var Person = React.createClass({
    render:function(){
        return <div className="person-box">
            <div className="input-group">
                <span className="input-group-addon">曹航</span>
                <input type="text" className="form-control"/>
            </div>
        </div>
    }
})

var Captain = React.createClass({
    render:function(){
        var data = [0,0,0,0,0,0,0,0];
        var config = {
            chart: {
                type: 'column'
            },
            title: {
                text: '挪威组'
            },
            xAxis: {
                categories: ['曹航', '夏天成', '陈利飞', '朱礼源', '陈宽']
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
                name: '时间',
                data: [5, 3, 4, 7, 2]
            }, {
                name: '质量',
                data: [2, 2, 3, 2, 1]
            }, {
                name: '主动性',
                data: [3, 4, 4, 2, 5]
            },{
                name: '责任心',
                data: [5, 3, 4, 7, 2]
            }, {
                name: '影响力',
                data: [2, 2, 3, 2, 1]
            }, {
                name: '文化活动',
                data: [3, 4, 4, 2, 5]
            },{
                name: '技术贡献',
                data: [3, 4, 4, 2, 5]
            }]
        };
        return <div>
            <h2 className="text-center">
                队长印象分
            </h2>
            <div className="captain">
                <div className="container">
                    <div className="col-xs-2">
                        <div className="sidebar">
                            <h3 className="text-center">
                                项目组
                            </h3>
                            <div className="list-group">
                                <a href='#' className="list-group-item ">挪威组</a>
                                <a href='#' className="list-group-item ">华三组</a>
                                <a href='#' className="list-group-item ">迅测组</a>
                                <a href='#' className="list-group-item ">抓包组</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-10">
                        <div className="impression">
                            <h3 className="text-center">挪威组</h3>
                            {
                                data.map(function(){
                                    return <div className='col-xs-3'>
                                        <Person/>
                                    </div>
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

module.exports = Captain;