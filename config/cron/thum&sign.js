/**
 * Created by kevin on 16/3/20.
 */
var Mysql = require('../db/my-pool');
//var queues = require('mysql-queues');
var async = require('async');
var arr = [12338];

function Filtermsg(msg){
    var tmpstr="";
    for(var i in msg){
        if(msg[i] == undefined){
            continue;
        }else if(i == 'id'){
            continue;
        }else if(i.indexOf('time')>-1){
            msg[i] = moment(msg[i]).format('YYYY-MM-DD HH:mm:ss');
        }else if(i.indexOf('$$')>-1){
            continue;
        }
        console.log(i,msg[i]);
        tmpstr += " `"+i+"`="+"'"+msg[i]+"'"+" ,"
    }
    //去and
    var remtmpstr = tmpstr.slice(0,-1);
    return remtmpstr;
}

async.each(arr,function(item,cb){

    Mysql.ecp.pool.getConnection(function(err, connection) {
        // Use the connection
        if(!err){
            connection.beginTransaction(function(err){
                if(err){
                    throw err;
                }
                var ranimg = 'SELECT thum FROM ecp.imgs WHERE id>=((select max(id) from ecp.imgs)-(select min(id) from ecp.imgs))*rand()+(select min(id) from ecp.imgs) limit 1';
                connection.query(ranimg,function(err,res1){
                    if(err){
                        connection.rollback(function(){throw err});
                    }
                    var ransign = 'SELECT sign FROM ecp.signs WHERE id>=((select max(id) from ecp.signs)-(select min(id) from ecp.signs))*rand()+(select min(id) from ecp.signs) limit 1';
                    connection.query(ransign,function(err,res2){
                        if(err){connection.rollback(function(){throw err});}

                        var img = res1[0].thum;
                        var sign = res2[0].sign;
                        var msg = {
                            smallAvatar:img,
                            mediumAvatar:img,
                            largeAvatar:img,
                        };
                        var updatesql1 = "update ecp.user set "+Filtermsg(msg)+" where id ="+item;

                        connection.query(updatesql1,function(err,res3){
                            if(err){connection.rollback(function(){throw err});}
                            var msg1 = {
                                about:sign
                            };
                            var updatesql2 = "update ecp.user_profile set "+Filtermsg(msg1)+" where id ="+item;
                            connection.query(updatesql2,function(err,res3){
                                if(err){connection.rollback(function(){throw err});}
                                connection.commit(function(err){
                                    if(err){
                                        connection.rollback(function(){throw err});
                                    }
                                    console.log(res1,'~~~~~~~~~~~',res2);
                                });
                            });
                        });
                    });
                });

            });
        }else{
            console.log(err);
        }
    });
}, function(err) {
    if(!err){
        console.log('> done2');
    }else{
        console.log('> done1');
    }
});





//async.series([function(s1){
//
//    var ranimg = 'SELECT thum FROM ecp.imgs WHERE id>=((select max(id) from ecp.imgs)-(select min(id) from ecp.imgs))*rand()+(select min(id) from ecp.imgs) limit 1';
//
//}, function () {
//
//}]);