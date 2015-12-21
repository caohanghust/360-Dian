//依赖第三方模块
require('bootstrap/dist/css/bootstrap.css');
//第三方动画库
require('./style/animate.css');

require('qs');
//本地样式文件
require('./style/main.less');

import React from 'react';
import { render } from 'react-dom';

//依赖模块
import Header from './js/header';
import Content from './js/content';

var App = React.createClass({
    getInitialState:function(){
      return {
          introduceShow:true,
          contentType:'starList'
      }
    },
    changeContentType:function(type){
        this.setState({contentType:type});
    },
    handleClick:function(){
        this.setState({introduceShow:false})
    },
    render:function(){
        return <div className="app">
            <Header changeContentType={this.changeContentType}/>
            <div className="app-body">
                <Content contentType={this.state.contentType}/>
            </div>
            {
                this.state.introduceShow
                    ?<div><div className="curtain"></div>
                    <div className="introduce">
                        <div className="panel panel-info">
                            <div className="panel-heading">360评分规则</div>
                            <div className="panel-body">
                                <table className="table-striped table-hover">
                                    <h4 className="text-center">
                                        360考核成绩＝队员考核（80分）+ 队委会考核（20分）
                                    </h4>
                                    <tr><td>队员考核</td></tr>
                                    <tr>
                                        <td>角色</td>
                                        <td>计算方式</td>
                                    </tr>
                                    <tr>
                                        <td>普通队员(M)</td>
                                        <td>其他普通队员对M的总均分记为A <br/>
                                            组长对M的总均分记为B <br/>
                                            队长对M的总均分记为C <i>（印象分）</i> <br/>
                                            则最终的“队员考核”分数T为：T=0.3*A+0.4*B+0.3*C</td>
                                    </tr>
                                    <tr>
                                        <td>组长（N）</td>
                                        <td>其他普通队员对N的总均分记为A<br/>
                                            队长对N的总均分为B  <i>（印象分）</i><br/>
                                            导师对N的总均分为C  <i>（印象分）</i><br/>
                                            则最终的“队员考核”分数T为：T=0.3*A+0.3*B+0.4*C</td>
                                    </tr>
                                    <tr>
                                        <td>队长（P）</td>
                                        <td>
                                            其他普通队员对P的总均分记为A <br/>
                                            导师对P的总均分为B   <i>（印象分）</i> <br/>
                                            则最终的“队员考核”分数T为：T=0.3*A+0.7*B
                                        </td>
                                    </tr>

                                    <tr><td>队委会考核</td></tr>
                                    <tr>
                                        <td>角色</td>
                                        <td>计算方式</td>
                                    </tr>
                                    <tr>
                                        <td>部员（M）</td>
                                        <td>其他部员对M的总均分记为A <br/>
                                            部长对M的总均分记为B <br/>
                                            队长对M的总均分记为C  <i>（印象分）</i> <br/>
                                            则最终的“队员考核”分数T为：T=0.3*A+0.4*B+0.3*C
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>部长（N）</td>
                                        <td>部员和各部长对N的总均分记为A <br/>
                                            队长对N的总均分为B     <i>（印象分）</i> <br/>
                                            导5师对N的总均分为C   <i>（印象分）</i> <br/>
                                            则最终的“队员考核”分数T为：T=0.3*A+0.3*B+0.4*C</td>
                                    </tr>
                                    <tr>
                                        <td>队长（P）</td>
                                        <td>其他部长对P的总均分记为A <i>（印象分）</i><br/>
                                            导师对P的总均分为B        <i>（印象分）</i> <br/>
                                            则最终的“队员考核”分数T为：T=0.3*A+0.7*B
                                        </td>
                                    </tr>
                                </table>
                                <button className="btn btn-default center-block" onClick={this.handleClick}>
                                    我已了解
                                </button>
                            </div>
                        </div>
                    </div></div>
                    :''
            }
        </div>
    }
})

render(<App/>,document.getElementById('app'));