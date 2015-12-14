import React from 'react';
import Reflux from 'reflux/src/index';
import Actions from './appAction';
import Store from './appStroe';

import StarList from './view/starList';
import PersonPage from './view/personPage';
import DataList from './view/dataList';

var Content = React.createClass({
    mixins:[Reflux.connect(Store,'store')],
    shouldComponentUpdate:function(nextProps, nextState){
        console.log('new %o , old %o',this.state.store,nextState.store);
        return true;
    },
    render:function(){
        var content = <StarList/>
        switch (this.state.store.contentType){
            case '360':
                content = <PersonPage/>
                break;
            case 'starList':
                content = <StarList/>
                break;
            case 'dataList':
                content = <DataList/>
                break;
            default :
                content = <div>404 NOT FOUND</div>;
                break;
        }
        return content
    }
})


module.exports = Content;