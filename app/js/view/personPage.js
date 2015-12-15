import React from 'react';
import Reflux from '../../../node_modules/reflux/src/index';
import Actions from './../appAction';
import Store from './../appStroe';
import Sidebar from './sidebar';

var personPage = React.createClass({
    mixins:[Reflux.connect(Store,'store')],
    render:function(){
        return <div>
            <div className="left-box">
                <Sidebar/>
            </div>
            <div className="right-box">
                <div className="container">
                    <div className="row">
                        <h2 className="text-center">
                    <span className="group-title">
                        {this.state.store.nowGroup
                            ?this.state.store.nowGroup+'组'
                            :''
                        }
                    </span>
                    <span className="name-title">
                        {this.state.store.nowUser.name}
                    </span>
                        </h2>
                    </div>
                    <div className="col-xs-3 q-box">
                        <QuestionBox height='half' index={0} key='q-0' />
                        <QuestionBox height='half' index={3} key='q-3' />
                    </div>
                    <div className="col-xs-3 q-box">
                        <QuestionBox height='half' index={1} key='q-1' />
                        <QuestionBox height='half' index={4} key='q-4' />
                    </div>
                    <div className="col-xs-3 q-box">
                        <QuestionBox height='half' index={2} key='q-2' />
                        <QuestionBox height='half' index={5} key='q-5' />
                    </div>
                    <div className="col-xs-3 q-box">
                        <QuestionBox height='full' index={6} key='q-6' />
                    </div>
                </div>
            </div>
        </div>
    }
})
var QuestionBox = React.createClass({
    mixins:[Reflux.connect(Store,'store')],
    optionChange:function(e){
        var num = e.target.getAttribute('data-num');
        var score = e.target.getAttribute('data-value');
        Actions.submitScore(num,score);
    },
    //q为题目 a为答案
    render:function(){
        var question = this.state.store.nowQuestion[this.props.index];
        var answer = this.state.store.nowUser.score[this.props.index];
        var questionContent = question?(<div className={this.props.height+'-height'}>
            <p className="q-title">{question.questionIndex+'.'+question.title}</p>
            <div className="input-group">
                {
                    question.options.map(function(item,index){
                        return <div className='row option' key={question.questionIndex+'-'+item.optionIndex}>
                            <div className="col-xs-1">
                                <input type="radio" name={question.questionIndex+''}
                                       data-num={question.questionIndex} data-value={item.score}
                                       checked={answer==item.score?true:false} onChange={this.optionChange}/>
                            </div>
                            <div className="col-xs-9">
                                {item.content}
                            </div>
                            <div className="col-xs-1">
                                {item.score}
                            </div>
                        </div>
                    }.bind(this))
                }
            </div>
        </div>)
            : <div></div>
        return questionContent
    }
})

module.exports = personPage