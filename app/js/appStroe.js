import Reflux from 'reflux';
import Actions from './appAction';

var Store = Reflux.createStore({
    listenables:[Actions],
    getInitialState:function(){

    }
})

module.exports = Store;