var React = require('react');
var mockdata = {
    XMZ:['曹航','夏天成','陈利飞','朱礼源','陈宽','郉铭哲','田斐菡','曹航','夏天成','陈利飞','朱礼源','陈宽','郉铭哲','田斐菡'],
    DWH:['曹航','陈宽'],
    ZZB:['曹航','夏天成','陈利飞']
}
var Sidebar = React.createClass({
    getInitialState:function(){
      return {
          unfold:null
      }
    },
    foldController:function(type){
      this.setState({unfold:type})
    },
    render:function(){

        return <div className="sidebar">
            <div className="list-group">
                <SidebarItem type="XMZ" typeDescribe="项目组" foldController={this.foldController}
                  unfold={this.state.unfold==='XMZ'?true:false}  />
                <SidebarItem type="DWH" typeDescribe="队委会" foldController={this.foldController}
                  unfold={this.state.unfold==='DWH'?true:false}  />
                <SidebarItem type="ZZB" typeDescribe="种子班" foldController={this.foldController}
                  unfold={this.state.unfold==='ZZB'?true:false} />
            </div>
        </div>
    }
})
var SidebarItem = React.createClass({
    handleClick:function(){
        if(this.props.unfold){
            this.props.foldController(null);
        }
        else{
            this.props.foldController(this.props.type);
        }
    },
    render:function(){

        return (<div className="sidebar-item">
            <a className={"list-group-item title "+this.props.type} onClick={this.handleClick} data-type={this.props.type}>
                {this.props.typeDescribe}
                {
                    !this.props.unfold
                        ?<i className="arrow glyphicon glyphicon-menu-right"></i>
                        :<i className="arrow glyphicon glyphicon-menu-down"></i>
                }
            </a>

                    {
                        !this.props.unfold
                            ? ''
                            :  <div className="list-group name-group">
                                {
                                    mockdata[this.props.type].map(function(item,index){
                                        return <a href="#" className="list-group-item fadeIn animated name">{item}(挪威组)</a>
                                    })
                                }
                               </div>
                    }
        </div>
        )
    }
})


module.exports = Sidebar;