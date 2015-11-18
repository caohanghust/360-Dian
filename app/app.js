//依赖第三方模块
require('bootstrap/dist/css/bootstrap.css');
//第三方动画库
require('./style/animate.css');

//本地样式文件
require('./style/main.less');


var React = require('react');
var ReactDom = require('react-dom');
//依赖模块
var Header = require('./js/header');
var Sidebar = require('./js/sidebar');

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

ReactDom.render(<App/>,document.getElementById('app'));