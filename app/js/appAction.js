import Reflux from 'reflux/src/index';
var Actions = Reflux.createActions([
    'login',
    'changeMember',
    'submitScore',
    'getDataList',
    'getGroupData',
    'submitImpression',
]);
module.exports = Actions;