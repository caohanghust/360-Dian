import React from 'react';
import Actions from './appAction';
import Reflux from 'reflux/src/index';
import Store from './appStroe';

var Login = React.createClass({
    mixins:[Reflux.connect(Store,'store')],
    getInitialState:function(){
      return {
          showLogin:false
      }
    },
    showLoginBox:function(){
        this.setState({showLogin:this.state.showLogin?false:true});
    },
    handleClick:function(){
        this.showLoginBox();
    },
    render:function(){
        return <div>
            <button className="btn btn-default navbar-btn" onClick={this.handleClick}>
                {this.state.store.username!=null?decodeURI(this.state.store.name):'登陆'}
            </button>
            {
                this.state.showLogin
                    ?<LoginBox showLoginBox={this.showLoginBox}/>
                    :''
            }
        </div>
    }
})

var LoginBox = React.createClass({
    handleClick:function(){
        var username = this.refs.username.value;
        var passwd = this.refs.passwd.value;
        Actions.login(username,passwd,this.props.showLoginBox);
    },
    render:function(){
        return <div>
            <div className="curtain">

            </div>
            <div className="login-box panel panel-info zoomIn animated">
                <div className="panel-heading">
                    登陆
                </div>
                <div className="panel-body">
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-addon">账号</div>
                            <input type="text" ref='username' className="form-control" placeholder="喻信账号"/>
                            <div className="input-group-addon">
                                Dian
                            </div>
                        </div>
                        <div className="input-group">
                            <div className="input-group-addon">密码</div>
                            <input type="password" ref='passwd' className="form-control" placeholder="喻信密码"/>
                        </div>
                        <button className='btn btn-default center-block' onClick={this.handleClick} >
                            登陆
                        </button>
                    </div>
                </div>
                <div className="panel-footer">
                    请用喻信账号密码登陆
                </div>
            </div>
        </div>
    }
})

var ToolButton = React.createClass({
    mixins:[Reflux.connect(Store,'store')],
    handleClick:function(e) {
        var contentType = e.target.getAttribute('data-type');
        //控制权限
        switch (contentType){
            case 'captain':
                if(this.state.store.type==1){
                    this.props.changeContentType(contentType)
                }else{
                    alert('您无此权限');
                }
                break;
            case 'mentor':
                if(this.state.store.type==2){
                    this.props.changeContentType(contentType)
                }else{
                    alert('您无此权限');
                }
                break;
            default :
                this.props.changeContentType(contentType)
        }
    },
    render:function(){
        return <button className="btn btn-default navbar-btn" data-type={this.props.contentType} onClick={this.handleClick} >
            {this.props.title}
        </button>
    }
})

var Header = React.createClass({
    render:function(){
        return <nav className="navbar navbar-default">
            <div className="container-fluid container">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">
                        360考核--Dian团队
                    </a>
                </div>
                <div className="tool-box">
                    <Login />
                    <ToolButton contentType={'mentor'} title={'导师专区'} changeContentType={this.props.changeContentType}/>
                    <ToolButton contentType={'captain'} title={'队长专区'} changeContentType={this.props.changeContentType}/>
                    <ToolButton contentType={'starList'} title={'明星榜'} changeContentType={this.props.changeContentType}/>
                    <ToolButton contentType={'dataList'} title={'数据榜'} changeContentType={this.props.changeContentType}/>
                    <ToolButton contentType={'360'} title={'360'} changeContentType={this.props.changeContentType}/>
                </div>
            </div>
        </nav>
    }
})


module.exports = Header;