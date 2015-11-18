var React = require('react');
var mockdata = {
    XMZ:['曹航','夏天成','陈利飞','朱礼源','陈宽','郉铭哲','田斐菡'],
    DWH:['曹航','陈宽'],
    ZZB:['曹航','夏天成','陈利飞']
}
var Sidebar = React.createClass({
    render:function(){
        return <div className="sidebar">
            <div className="list-group">
                <SidebarItem type="XMZ" typeDescribe="项目组"/>
                <SidebarItem type="DWH" typeDescribe="队委会"/>
                <SidebarItem type="ZZB" typeDescribe="种子班"/>
            </div>
        </div>
    }
})
var SidebarItem = React.createClass({
    getInitialState:function(){
      return {
          fold:false
      }
    },
    handleClick:function(){
        this.setState({fold:this.state.fold?false:true})
    },
    render:function(){

        return (<div>
            <a className="list-group-item" onClick={this.handleClick} data-type={this.props.type}>
                {this.props.typeDescribe}
                {
                    !this.state.fold
                        ?<i className="arrow glyphicon glyphicon-menu-right"></i>
                        :<i className="arrow glyphicon glyphicon-menu-down"></i>
                }
            </a>

                    {
                        !this.state.fold
                            ? ''
                            :  <div className="list-group">
                                {
                                    mockdata[this.props.type].map(function(item,index){
                                        return <a href="#" className="list-group-item fadeIn animated">{item}</a>
                                    })
                                }
                               </div>
                    }
        </div>
        )
    }
})


module.exports = Sidebar;