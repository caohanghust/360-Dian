import React from 'react';
import Reflux from '../../../node_modules/reflux/src/index';
import Actions from './../appAction';
import Store from './../appStroe';

var Sidebar = React.createClass({
    mixins:[Reflux.connect(Store,'store')],
    getInitialState:function(){
        return {
            unfold:null,
            captain_impression:false
        }
    },
    foldController:function(group){
        this.setState({unfold:this.state.unfold===group?null:group});
    },
    submitCaptainImpression:function(){
        var impression_score = parseInt(this.refs.impression.value);
        if(impression_score){
            if(impression_score<=0||impression_score>100){
                alert('分值有误，请重新输入');
            }else{
                Actions.submitImpression('qingcheng',impression_score);
                this.setState({captain_impression:false});
            }
        }else{
            alert('分值有误，请重新输入');
        }
    },
    showCaptainBox:function(){
       this.setState({captain_impression:true});
    },
    closeCaptainBox:function(){
        this.setState({captain_impression:false});
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
                <a className="list-group-item title item4" onClick={this.showCaptainBox}>
                    队长印象分
                </a>
            </div>
            {
                this.state.captain_impression
                    ?<div>
                     <div className="curtain">
                     </div>
                     <div className='captain_impression'>
                        <div className="panel panel-info">
                            <div className="panel-heading">
                                您对本届队长的印象分是多少？
                                <i className="glyphicon glyphicon-remove" onClick={this.closeCaptainBox}></i>
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-xs-7">
                                        <img src="./img/captain.png" alt="江涛"/>
                                    </div>
                                    <div className="col-xs-5">
                                        <h3>本届队长</h3>
                                        <p>姓名：江涛</p>
                                        <p>喻信ID：qingchen</p>
                                        <p>项目组：svti</p>
                                        <p>2011年加入团队</p>
                                        <p>2010级种子班成员</p>
                                        <p>2014级研究生</p>
                                        <div className="form-group impression_box">
                                            <label for="impression">你对本届队长的印象分为：</label>
                                            <div className="input-group">
                                                <input type="text" id='impression' ref='impression' className='form-control' placeholder='满分100'/>
                                            </div>
                                            <button className="btn btn-default" onClick={this.submitCaptainImpression}>
                                                提交
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                     </div>
                </div>
                    :''
            }
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
                                if(group_name=='tech'||group_name=='public'||group_name=='admin'){
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