//依赖第三方模块
require('bootstrap/dist/css/bootstrap.css');
//第三方动画库
require('./style/animate.css');

require('qs');
//本地样式文件
require('./style/main.less');

import React from 'react';
import { render } from 'react-dom';
import { Router , Route , Link} from 'react-router';

//依赖模块
import Header from './js/header';
import Sidebar from './js/sidebar';

var App = React.createClass({
    render:function(){
        return <div className="app">
            <Header/>
            <div className="app-body">
                <div className="left-box">
                    <Sidebar/>
                </div>
                <div className="right-box">
                    This is right box
                </div>
            </div>
        </div>
    }
})

var NoMatch = React.createClass({
    render:function(){
        return <div>404 NOT FOUND</div>
    }
})

render((
    <Router>
        <Route path="/">
            <Route path="index" component={App}/>
            <Route path="*" component={NoMatch}/>
        </Route>
    </Router>
), document.getElementById('app'))