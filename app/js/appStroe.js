import Reflux from 'reflux/src/index';
import $ from 'jquery';
import Actions from './appAction';
import {question,groupInfo} from './question';
import md5 from 'md5';

var Store = Reflux.createStore({
    listenables:Actions,
    state:{
        group:[],
        name:'Dian',
        username:null,
        type:0,
        wait:false,
        isGroupPage:false,
        dataList:[{num:'1',average:'0',username:'dian',score:'0'},
            {num:'2',average:'0',username:'dian',score:'0'},
            {num:'3',average:'0',username:'dian',score:'0'},
            {num:'4',average:'0',username:'dian',score:'0'},
            {num:'5',average:'0',username:'dian',score:'0'},
            {num:'6',average:'0',username:'dian',score:'0'},
            {num:'7',average:'0',username:'dian',score:'0'}],
        starList:[{username:'dian',name:'dian',dwh_score:20,xmz_score:80},
            {username:'dian',name:'dian',dwh_score:20,xmz_score:80},
            {username:'dian',name:'dian',dwh_score:20,xmz_score:80},
            {username:'dian',name:'dian',dwh_score:20,xmz_score:80},
            {username:'dian',name:'dian',dwh_score:20,xmz_score:80},],
        myscore:[0,0,0,0,0,0,0],
        impression:{group_name:'dian',members:[]},
        nowQuestion:question.DWH,
        nowGroup:null,
        nowUser:{
            name:'Dian',
            score:[-1,-1,-1,-1,-1,-1,-1]
        }
    },
    onLogin:function(username,passwd,loginSuccess){
        this.state.wait = true;
        this.trigger(this.state);
        var args = 'username='+username+'&passwd='+passwd;
        var code = getCode(args);
        args += '&code='+code;
        $.getJSON('http://check360.sinaapp.com/index.php/main/login?'+args+'&callback=?',function(json){
            if(json.status==0){
                this.state.type = json.type;
                this.state.group = json.result.group;
                this.state.username = json.result.username;
                this.state.name = json.result.name;
                this.state.unfold = json.result.group[0].group_name;
                this.trigger(this.state);
                loginSuccess();
            }else{
                alert('密码错误');
                this.state.wait = false;
                this.trigger(this.state);
            }
        }.bind(this))
    },
    onSubmitScore:function(num,score){
        var from_username = this.state.username;
        var to_username = this.state.nowUser.username;
        var group = this.state.nowGroup;

        var args = 'from_username='+from_username+'&to_username='+to_username+'&group='+group+'&num='+num+'&score='+score;
        var code = getCode(args);
        args += '&code='+code;

        $.getJSON('http://check360.sinaapp.com/index.php/main/update_score?'+args+'&callback=?',function(json){
            if(json.status==0){
                this.state.nowUser.score[parseInt(num)-1]=score;
                this.trigger(this.state);
            }
        }.bind(this))
    },
    onChangeMember:function(user,group){
        this.state.nowUser = user;
        this.state.nowGroup = group;
        var questionType = null;
        if(groupInfo.XMZ.indexOf(group)!=-1){
            questionType = 'XMZ';
        }
        if(groupInfo.DWH.indexOf(group)!=-1){
            questionType = 'DWH';
        }
        if(groupInfo.ZZB.indexOf(group)!=-1){
            questionType = 'ZZB';
        }
        this.state.nowQuestion = question[questionType];
        this.trigger(this.state);
    },
    onGetDataList:function(){
        var args = 'username='+this.state.username;
        var code = getCode(args);
        args += '&code='+code;

       $.getJSON('http://check360.sinaapp.com/index.php/main/get_data_rank?'+args+'&callback=?',function(json){
           if(json.status==0){
               this.state.dataList = json.result;
               this.state.myscore = json.myscore;
               this.trigger(this.state);
           }
       }.bind(this))
    },
    onGetGroupData:function(group_name){
        var args = 'group_name='+group_name+'&username='+this.state.username;
        var code = getCode(args);
        args += '&code='+code;
        $.getJSON('http://check360.sinaapp.com/index.php/main/get_group_data?'+args+'&callback=?',function(json){
            if(json.status==0){
                var members = json.result.members.map(function(item){
                    for(var i = 0; i<7;i++){
                        item.score[i] = Math.round(item.score[i]);
                    }
                    return item;
                })
                this.state.impression = {
                    group_name:json.result.group_name,
                    members:members
                }
                this.trigger(this.state);
            }
        }.bind(this))
    },
    onSubmitImpression:function(to_username,impression_score){
        var args = 'from_username='+this.state.username+'&to_username='+to_username+'&score='+impression_score;
        var code = getCode(args);
        args += '&code='+code;
        $.getJSON('http://check360.sinaapp.com/index.php/main/update_impression_score?'+args+'&callback=?',function(json){
            if(json.status!=0){
                alert('提交失败');
            }
        })
    },
    onGetStarList:function(){
        $.getJSON('http://check360.sinaapp.com/index.php/main/get_stars?callback=?',function(json){
            if(json.status==0){
                this.state.starList = json.result;
                this.trigger(this.state);
            }
        }.bind(this))
    },
    getInitialState:function(){
        return this.state;
    }
})

function getCode(args){
    var key = 'dian';
    var code = md5(args+key).substr(0,5);
    return code;
}

module.exports = Store;