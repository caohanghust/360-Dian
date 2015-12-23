import React from 'react';
import Reflux from '../../../node_modules/reflux/src/index';
import Actions from './../appAction';
import Store from './../appStroe';
import Highcharts from '../../../node_modules/react-highcharts/dist/bundle/highcharts';

var StarList = React.createClass({
    mixins:[Reflux.connect(Store,'store')],
    componentDidMount:function(){
        Actions.getStarList();
    },
    render:function(){
        var nameList = [];
        var xmz_scores = [];
        var dwh_scores = [];

        this.state.store.starList.map(function(item){
            nameList.push(item.name);
            xmz_scores.push(item.xmz_score);
            dwh_scores.push(item.dwh_score);
        })
        var config = {
            chart: {
                type: 'column'
            },
            title: {
                text: '2015Dian团队360考核'
            },
            xAxis: {
                categories: nameList
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
                data: xmz_scores,
            }, {
                name: '队委会',
                data: dwh_scores,
            }]
        };
        return <div className="stat-list rubberBand animated">
            <h2 className="text-center">
                明星榜
            </h2>
            <div className="chart-box">
                <Highcharts config={config}/>
            </div>
        </div>
    }
})

module.exports = StarList;