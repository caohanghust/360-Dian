//依赖第三方模块
require('bootstrap/dist/css/bootstrap.css');

var React = require('react');
var ReactDom = require('react-dom');
//依赖模块
var Header = require('./js/header');


var App = React.createClass({
    render:function(){
        return <div>
            <Header/>
        </div>
    }
})

ReactDom.render(<App/>,document.getElementById('app'));