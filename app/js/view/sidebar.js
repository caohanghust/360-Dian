import React from 'react';
import Reflux from '../../../node_modules/reflux/src/index';
import Actions from './../appAction';
import Store from './../appStroe';

var Sidebar = React.createClass({
    mixins:[Reflux.connect(Store,'store')],
    getInitialState:function(){
        return {
            unfold:null
        }
    },
    foldController:function(group){
        this.setState({unfold:this.state.unfold===group?null:group});
    },
    render:function(){
        return <div className="sidebar">
            <div className="list-group">
                {
                    this.state.store.group.map(function(item,index){
                        return <SidebarItem group={item}
                                            key={item.group_name}
                                            unfold={item.group_name===this.state.unfold}
                                            foldController={this.foldController}
                                            index={index}/>
                    }.bind(this))
                }
            </div>
        </div>
    }
})
var SidebarItem = React.createClass({
    handleClickGroup:function(){
        this.props.foldController(this.props.group.group_name);
    },
    changeMember:function(e){
        var index = e.target.getAttribute('data-index');
        var user = this.props.group.members[parseInt(index)];
        Actions.changeMember(user,this.props.group.group_name);
    },
    render:function(){
        return (<div className="sidebar-item">
            <a className={"list-group-item title item"+this.props.index} onClick={this.handleClickGroup} >
                {this.props.group.group_name}
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
                            this.props.group.members.map(function(item,index){
                                var group_name = this.props.group.group_name;
                                var completed = false;
                                if(group_name=='tech'){
                                    var counter = 0 ;
                                    for(var i=0;i<5;i++){
                                        if(item.score[i]!=-1){
                                            counter++
                                        }
                                    }
                                    if(counter==5){
                                        completed=true;
                                    }
                                }else{
                                    var counter = 0 ;
                                    for(var i=0;i<7;i++){
                                        if(item.score[i]!=-1){
                                            counter++
                                        }
                                    }
                                    if(counter==7){
                                        completed=true;
                                    }
                                }
                                return <a href="#"
                                          className={"list-group-item fadeIn animated name "}
                                          onClick={this.changeMember}
                                          onMouseEnter={this.changeMember}
                                          key={item.username}
                                          data-index={index}>
                                    {item.name}
                                    {
                                        completed
                                            ?<i className="arrow glyphicon glyphicon-ok"></i>
                                            :''
                                    }
                                </a>
                            }.bind(this))
                        }
                    </div>
                }
        </div>
        )
    }
})


module.exports = Sidebar;