import React from 'react';
import Reflux from '../../../node_modules/reflux/src/index';
import Actions from './../appAction';
import Store from './../appStroe';
import Highcharts from '../../../node_modules/react-highcharts/dist/bundle/highcharts';

var DataList = React.createClass({
    render:function(){
        return <div>
            <h2 className="text-center">
                Dian团队大数据
            </h2>

        </div>
    }
})
module.exports = DataList;