var React = require('react');

var Login = React.createClass({
    render:function(){
        return <div>
            <button className="btn btn-default navbar-btn">Login</button>
        </div>
    }
})

var Header = React.createClass({
    render:function(){
        return <nav className="navbar navbar-default">
            <div className="container-fluid">
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