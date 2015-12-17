import React from 'react';
import Reflux from 'reflux/src/index';
import Actions from './appAction';
import Store from './appStroe';

import StarList from './view/starList';
import PersonPage from './view/personPage';
import DataList from './view/dataList';
import Captain from './view/captain';
import Mentor from './view/mentor';

var Content = React.createClass({
    render:function(){
        var content = <StarList/>
        switch (this.props.contentType){
            case '360':
                content = <PersonPage/>
                break;
            case 'starList':
                content = <StarList/>
                break;
            case 'dataList':
                content = <DataList/>
                break;
            case 'captain':
                content = <Captain/>
                break;
            case 'mentor':
                content = <Mentor/>
                break;
            default :
                content = <div>404 NOT FOUND</div>;
                break;
        }
        return content
    }
})


module.exports = Content;