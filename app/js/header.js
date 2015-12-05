var React = require('react');

var Login = React.createClass({
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
        return <div className="col-xs-offset-2">
            <button className="btn btn-default navbar-btn" onClick={this.handleClick}>登陆</button>
            {
                this.state.showLogin
                    ?<LoginBox showLoginBox={this.showLoginBox}/>
                    :''
            }
        </div>
    }
})

var LoginBox = React.createClass({
    render:function(){
        return <div>
            <div className="curtain">

            </div>
            <div className="login-box panel panel-info">
                <div className="panel-heading">
                    登陆
                </div>
                <div className="panel-body">
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-addon">账号</div>
                            <input type="text" id="account" className="form-control" placeholder="喻信账号"/>
                            <div className="input-group-addon">
                                曹航
                            </div>
                        </div>
                        <div className="input-group">
                            <div className="input-group-addon">密码</div>
                            <input type="password" id="pw" className="form-control" placeholder="喻信密码"/>
                        </div>
                        <button className='btn btn-default center-block' onClick={this.props.showLoginBox} >
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

var Header = React.createClass({
    render:function(){
        return <nav className="navbar navbar-default">
            <div className="container-fluid container">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">
                        360考核--Dian团队
                    </a>
                </div>
                <div className="navbar-right">
                    <Login/>
                </div>
            </div>
        </nav>
    }
})


module.exports = Header;