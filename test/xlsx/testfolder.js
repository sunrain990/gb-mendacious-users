/**
 * Created by kevin on 16/4/15.
 */
var fs = require('fs');
var async = require('async');
//var Mysql = require('../../config/db/my-pool');
var Mysql = require('../../config/db/myf');
if(typeof require !== 'undefined') XLSX = require('xlsx');
var thumSign = require('./thum&sign');

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

var arr = [];
var bb = 0;

walkSync('test_files',function(filePath,stat){
    console.log(':----'+filePath);
    var workbook = XLSX.readFile(filePath);
    var first_sheet_name = workbook.SheetNames[0];

    var worksheet = workbook.Sheets[first_sheet_name];
    for (z in worksheet) {
        /* all keys that do not begin with "!" correspond to cell addresses */
        if(z[0] === '!') continue;
        if(z.substring(0,1) == 'D'){
            if(!isNaN(JSON.stringify(worksheet[z].v))){
                arr.push(JSON.stringify(worksheet[z].v));
                //console.log(i);
            }
            //console.log(JSON.stringify(worksheet[z].v));
        }
    }
    if(bb == 5){
        console.log(arr.length);
        setThumSign(arr);
    }
    bb++;
});


function walkSync(currentDirPath, callback) {
    var fs = require('fs'),
        path = require('path');
    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory()) {
            walkSync(filePath, callback);
        }
    });
}



function setThumSign(arr){
    async.each(arr,function(item,cb){
        Mysql.ecp.query('SELECT thum FROM ecp.imgs WHERE id>=((select max(id) from ecp.imgs)-(select min(id) from ecp.imgs))*rand()+(select min(id) from ecp.imgs) limit 1',function(err,res1){
            if(!err){
                Mysql.ecp.query('SELECT sign FROM ecp.signs WHERE id>=((select max(id) from ecp.signs)-(select min(id) from ecp.signs))*rand()+(select min(id) from ecp.signs) limit 1',function(err,res2){
                    var img = res1[0].thum;
                    var sign = res2[0].sign;
                    var msg = {
                        smallAvatar:img,
                        mediumAvatar:img,
                        largeAvatar:img,
                    };
                    var updatesql1 = "update ecp.user set "+Filtermsg(msg)+" where id ="+item;
                    Mysql.ecp.query(updatesql1,function(err,res3){
                        if(!err){
                            var msg1 = {
                                about:sign
                            };
                            var updatesql2 = "update ecp.user_profile set "+Filtermsg(msg1)+" where id ="+item;
                            Mysql.ecp.query(updatesql2,function(err,res4){
                                if(!err){
                                    console.log(item,'success!');
                                }else{
                                    console.log(err);
                                }
                            });
                        }else{

                        }
                    });
                });
            }else{
                console.log(err);
            }
        });
    }, function(err) {
        if(!err){
            console.log('> success');
        }else{
            console.log('> done1');
        }
    });
}



//async.each(arr,function(item,cb){
//
//    Mysql.ecp.pool.getConnection(function(err, connection) {
//        // Use the connection
//        if(!err){
//            connection.beginTransaction(function(err){
//                if(err){
//                    throw err;
//                }
//                var ranimg = 'SELECT thum FROM ecp.imgs WHERE id>=((select max(id) from ecp.imgs)-(select min(id) from ecp.imgs))*rand()+(select min(id) from ecp.imgs) limit 1';
//                connection.query(ranimg,function(err,res1){
//                    if(err){
//                        connection.rollback(function(){throw err});
//                    }
//                    var ransign = 'SELECT sign FROM ecp.signs WHERE id>=((select max(id) from ecp.signs)-(select min(id) from ecp.signs))*rand()+(select min(id) from ecp.signs) limit 1';
//                    connection.query(ransign,function(err,res2){
//                        if(err){connection.rollback(function(){throw err});}
//
//                        var img = res1[0].thum;
//                        var sign = res2[0].sign;
//                        var msg = {
//                            smallAvatar:img,
//                            mediumAvatar:img,
//                            largeAvatar:img,
//                        };
//                        var updatesql1 = "update ecp.user set "+Filtermsg(msg)+" where id ="+item;
//
//                        connection.query(updatesql1,function(err,res3){
//                            if(err){connection.rollback(function(){throw err});}
//                            var msg1 = {
//                                about:sign
//                            };
//                            var updatesql2 = "update ecp.user_profile set "+Filtermsg(msg1)+" where id ="+item;
//                            connection.query(updatesql2,function(err,res3){
//                                if(err){connection.rollback(function(){throw err});}
//                                connection.commit(function(err){
//                                    if(err){
//                                        connection.rollback(function(){throw err});
//                                    }
//                                    console.log(res1,'~~~~~~~~~~~',res2);
//                                });
//                            });
//                        });
//                    });
//                });
//
//            });
//        }else{
//            console.log(err);
//        }
//    });
//}, function(err) {
//    if(!err){
//        console.log('> done2');
//    }else{
//        console.log('> done1');
//    }
//});


//async.each();
