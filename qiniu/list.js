/**
 * Created by kevin on 15/12/20.
 */
//var qiniu = require('../');
var rsf = require('./rsf');

rsf.listPrefix('avatars', null, null, 105, function(err, ret) {
    console.log(ret);
    for (var i in ret.items) {
        console.log('http://7xpb9j.com2.z0.glb.qiniucdn.com/'+ret.items[i]['key']);
    }
});