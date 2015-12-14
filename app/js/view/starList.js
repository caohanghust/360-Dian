import React from 'react';
import Reflux from '../../../node_modules/reflux/src/index';
import Actions from './../appAction';
import Store from './../appStroe';
import Highcharts from '../../../node_modules/react-highcharts/dist/bundle/highcharts';

var StarList = React.createClass({
    render:function(){
        var config = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Stacked column chart'
            },
            xAxis: {
                categories: ['曹航', '夏天成', '陈利飞', '朱礼源', '陈宽']
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total fruit consumption'
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
                name: '项目组',
                data: [5, 3, 4, 7, 2]
            }, {
                name: '队委会',
                data: [2, 2, 3, 2, 1]
            }, {
                name: '队长导师印象分',
                data: [3, 4, 4, 2, 5]
            }]
        };
        return <div className="stat-list">
            <h2 className="text-center">
                Dian团队明星榜
            </h2>
            <div className="chart-box">
                <Highcharts config={config}/>
            </div>
        </div>
    }
})

module.exports = StarList;