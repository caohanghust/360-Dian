import React from 'react';
import question from './question';
var Content = React.createClass({
    render:function(){
        return <div className="container">
            <div className="col-xs-3 q-box">
                <QuestionBox height='half' q={question.XMZ[0]}/>
                <QuestionBox height='half' q={question.XMZ[3]}/>
            </div>
            <div className="col-xs-3 q-box">
                <QuestionBox height='half' q={question.XMZ[1]}/>
                <QuestionBox height='half' q={question.XMZ[4]}/>
            </div>
            <div className="col-xs-3 q-box">
                <QuestionBox height='half' q={question.XMZ[2]}/>
                <QuestionBox height='half' q={question.XMZ[5]}/>
            </div>
            <div className="col-xs-3 q-box">
                <QuestionBox height='full' q={question.XMZ[6]}/>
            </div>
        </div>
    }
})
var QuestionBox = React.createClass({
    render:function(){

        return <div className={this.props.height+'-height'}>
            <p className="q-title">{this.props.q.questionIndex+'.'+this.props.q.title}</p>
            <div className="input-group">
                {
                    this.props.q.options.map(function(item){
                        return <div className='row option'>
                            <div className="col-xs-1">
                                <input type="radio" name={this.props.q.questionIndex+''} value={item.optionIndex}/>
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
        </div>
    }
})

module.exports = Content;