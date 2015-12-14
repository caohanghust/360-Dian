import Reflux from 'reflux/src/index';
import $ from 'jquery';
import Actions from './appAction';
import {question,groupInfo} from './question';

var Store = Reflux.createStore({
    listenables:Actions,
    onLogin:function(username,passwd,loginSuccess){
        $.getJSON('http://check360.sinaapp.com/index.php/main/login?username='+username+'&passwd='+passwd+'&callback=?',function(json){
            if(json.status==0){
                console.log(json);
                this.state.group = json.result.group;
                this.state.username = json.result.username;
                this.state.name = json.result.name;
                this.state.unfold = json.result.group[0].group_name;
                this.trigger(this.state);
                loginSuccess();
            }
        }.bind(this))
    },
    onSubmitScore:function(num,score){
        var from_username = this.state.username;
        var to_username = this.state.nowUser.username;
        var group = this.state.nowGroup;
        $.getJSON('http://check360.sinaapp.com/index.php/main/update_score?callback=?',{
            from_username:from_username,
            to_username:to_username,
            group:group,
            num:num,
            score:score
        },function(json){
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
        this.state.nowQuestion = question[questionType];
        this.trigger(this.state);
    },
    onChangeContent:function(type){
        this.state.contentType = type;
        this.trigger(this.state);
    },
    getInitialState:function(){
        this.state = {
            group:[],
            name:'Dian',
            username:null,
            isGroupPage:false,
            nowQuestion:question.DWH,
            nowGroup:null,
            contentType:'',
            nowUser:{
                name:'Dian',
                score:[-1,-1,-1,-1,-1,-1,-1]
            }
        }
        return this.state;
    }
})

module.exports = Store;