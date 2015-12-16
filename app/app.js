//依赖第三方模块
require('bootstrap/dist/css/bootstrap.css');
//第三方动画库
require('./style/animate.css');

require('qs');
//本地样式文件
require('./style/main.less');

import React from 'react';
import { render } from 'react-dom';
//import { Router , Route , Link} from 'react-router';

//依赖模块
import Header from './js/header';
import Content from './js/content';

var App = React.createClass({
    getInitialState:function(){
      return {
          contentType:'captain'
      }
    },
    changeContentType:function(type){
        this.setState({contentType:type});
    },
    render:function(){
        return <div className="app">
            <Header changeContentType={this.changeContentType}/>
            <div className="app-body">
                <Content contentType={this.state.contentType}/>
            </div>
        </div>
    }
})

render(<App/>,document.getElementById('app'));