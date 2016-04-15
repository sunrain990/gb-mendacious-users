/**
 * Created by kevin on 16/3/18.
 */
var rsf = require('../qiniu/rsf');
var async = require('async');
var Mysql = require('../config/db/my-bb');

rsf.listPrefix('avatars', null, null,-1, function(err, ret) {

    var avatars = [];
    for (var i in ret.items) {
        //console.log('http://7xpb9j.com2.z0.glb.qiniucdn.com/'+ret.items[i]['key']);
        avatars.push('http://7xpb9j.com2.z0.glb.qiniucdn.com/'+ret.items[i]['key']);
    }
    console.log(avatars)

    async.forEach(avatars,function(item,callback){
            var sql = "insert into imgs values(null,'"+item+"')";
            console.log('--',sql);
            Mysql.ecp.query(sql,function(err,res){
                if(!err){
                    console.log(res.insertId);
                }else{
                    console.log(err);
                }
            });
    },function(err){
        if(!err){
            console.log('> done2');
        }else{
            console.log('> done1');
        }
    }
    )
});